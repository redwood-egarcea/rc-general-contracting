#!/usr/bin/env python3
"""Archive public site evidence. Raw evidence is deliberately excluded from Git."""
from collections import deque
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import subprocess
import tempfile
from urllib.parse import urljoin, urlsplit, urldefrag
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.royalcitygeneralcontractinginc.ca/'
HOSTS = {urlsplit(BASE).netloc, urlsplit(BASE).netloc.removeprefix('www.')}
ARCHIVE = ROOT / 'old-site'


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.meta = []
        self.links = []
        self.assets = []
        self.headings = []
        self.structured = []
        self.forms = []
        self.text = []
        self.image_alt = []
        self.body = False
        self.stack = []
        self.active_heading = None
        self.script = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'body': self.body = True
        if tag in ('script', 'style', 'svg', 'title'): self.stack.append(tag)
        if tag == 'script': self.script = {'attrs': a, 'text': ''}
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self.active_heading = {'tag': tag, 'text': ''}
        if tag == 'meta': self.meta.append(a)
        if tag == 'a': self.links.append(a)
        if tag == 'link':
            self.links.append(a)
            if any(x in (a.get('rel') or '').split() for x in ['stylesheet', 'icon', 'apple-touch-icon', 'preload', 'modulepreload']):
                if a.get('href'): self.assets.append((a['href'], tag, a))
        if tag in ('script', 'img', 'source', 'video', 'audio', 'iframe', 'embed'):
            for key in ('src', 'poster'):
                if a.get(key): self.assets.append((a[key], tag, a))
            if a.get('srcset'):
                for src in a['srcset'].split(','):
                    self.assets.append((src.strip().split()[0], tag, a))
        if tag == 'img': self.image_alt.append({'src': a.get('src'), 'alt': a.get('alt')})
        if tag == 'meta' and a.get('property', a.get('name')) in ('og:image', 'twitter:image'):
            self.assets.append((a['content'], 'social-image', a))
        if tag == 'a' and re.search(r'\.(pdf|mp4|webm|mov|woff2?|ttf|otf)(\?|$)', a.get('href', ''), re.I):
            self.assets.append((a['href'], 'download', a))
        if tag == 'form': self.forms.append({'attrs': a, 'fields': []})
        if tag in ('input', 'select', 'textarea', 'button') and self.forms:
            self.forms[-1]['fields'].append({'tag': tag, **a})
        if self.body and tag in ('section', 'article', 'div', 'p', 'br', 'li', 'footer', 'header', 'h1', 'h2', 'h3'):
            self.text.append('\n')

    def handle_data(self, data):
        if self.stack and self.stack[-1] == 'title': self.title += data
        if self.script is not None: self.script['text'] += data
        if self.active_heading is not None: self.active_heading['text'] += data
        if self.body and not self.stack: self.text.append(data)

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'svg', 'title') and self.stack:
            self.stack.pop()
        if tag == 'script' and self.script is not None:
            self.structured.append(self.script)
            self.script = None
        if self.active_heading and tag == self.active_heading['tag']:
            self.headings.append(self.active_heading)
            self.active_heading = None
        if self.body and tag in ('p', 'div', 'section', 'article', 'h1', 'h2', 'h3', 'li', 'footer', 'header'):
            self.text.append('\n')
        if tag == 'body': self.body = False

    def copy(self):
        return '\n\n'.join(x.strip() for x in ''.join(self.text).splitlines() if x.strip())


def fetch(url, folder):
    name = re.sub(r'[^a-zA-Z0-9._-]', '-', urlsplit(url).path.rsplit('/', 1)[-1]) or 'index.html'
    dest = folder / (sha256(url.encode()).hexdigest()[:12] + '-' + name)
    folder.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile() as h:
        proc = subprocess.run(['curl', '-sS', '-L', '--max-time', '40', '--max-redirs', '6', '-D', h.name, '-o', str(dest), '-w', '%{json}', url], capture_output=True, text=True)
        headers = Path(h.name).read_text(errors='replace')
    headers = '\n'.join(x for x in headers.splitlines() if not x.lower().startswith('set-cookie:'))
    try:
        detail = json.loads(proc.stdout)
    except json.JSONDecodeError:
        detail = {}
    record = {'url': url, 'status': detail.get('http_code'), 'final_url': detail.get('url_effective'), 'redirects': detail.get('num_redirects'), 'content_type': detail.get('content_type'), 'bytes': dest.stat().st_size if dest.exists() else 0, 'local_path': str(dest.relative_to(ROOT)), 'headers': headers, 'error': proc.stderr.strip() or None}
    if dest.exists(): record['sha256'] = sha256(dest.read_bytes()).hexdigest()
    return record


def text_of(record):
    return (ROOT / record['local_path']).read_text(errors='replace')


def main():
    records = []
    pages = []
    asset_uses = {}
    robots = fetch(urljoin(BASE, 'robots.txt'), ARCHIVE / 'responses')
    sitemap = fetch(urljoin(BASE, 'sitemap.xml'), ARCHIVE / 'responses')
    records += [robots, sitemap]
    urls = [BASE]
    sitemap_queue = deque([sitemap])
    sitemap_seen = set()
    while sitemap_queue:
        entry = sitemap_queue.popleft()
        if entry['url'] in sitemap_seen: continue
        sitemap_seen.add(entry['url'])
        try:
            xml = ET.fromstring(text_of(entry))
            for node in xml.findall('.//{*}loc'):
                if xml.tag.endswith('sitemapindex'):
                    sub = fetch(node.text, ARCHIVE / 'responses')
                    records.append(sub)
                    sitemap_queue.append(sub)
                else: urls.append(node.text)
        except ET.ParseError: pass

    queue = deque(dict.fromkeys(urls))
    seen = set()
    while queue:
        url = queue.popleft()
        if url in seen: continue
        seen.add(url)
        record = fetch(url, ARCHIVE / 'html')
        records.append(record)
        if record['status'] != 200 or 'html' not in (record['content_type'] or ''): continue
        page = Page(text_of(record))
        rendered_path = ARCHIVE / 'html/home-rendered.html'
        rendered = Page(rendered_path.read_text()) if url == BASE and rendered_path.exists() else page
        copy = rendered.copy()
        slug = 'home' if urlsplit(url).path == '/' else urlsplit(url).path.strip('/').replace('/', '--')
        md = f'# Source: {url}\n\nCaptured {datetime.now(timezone.utc).isoformat()}. Copy below is unchanged; only block separators are added. Raw response and rendered HTML are retained locally.\n\n## Page title\n\n{page.title}\n\n## Body copy\n\n{copy}\n\n## Image alt text\n\n'
        md += '\n'.join(f"- `{a['src']}`: {a['alt']}" for a in rendered.image_alt)
        md += '\n\n## Metadata (original values)\n\n```json\n' + json.dumps(page.meta, ensure_ascii=False, indent=2) + '\n```\n'
        (ROOT / 'docs/source-copy' / f'{slug}.md').write_text(md)
        data = {'url': url, 'title': page.title, 'meta': page.meta, 'headings': page.headings, 'word_count': len(copy.split()), 'links': page.links, 'forms': rendered.forms, 'scripts': rendered.structured, 'source_copy': f'docs/source-copy/{slug}.md'}
        pages.append(data)
        for link in page.links:
            target = urldefrag(urljoin(url, link.get('href') or ''))[0]
            parts = urlsplit(target)
            if parts.netloc in HOSTS and parts.scheme in ('http', 'https') and 'rel' not in link and not parts.path.startswith('/cdn-cgi/') and not re.search(r'\.[a-z0-9]{2,5}$', parts.path):
                queue.append(target)
        for src, kind, attrs in page.assets + rendered.assets:
            target = urljoin(url, src)
            if target.startswith(('https://', 'http://')):
                use = {'page': url, 'kind': kind, 'attrs': attrs}
                if use not in asset_uses.setdefault(target, []): asset_uses[target].append(use)

    observed_path = ARCHIVE / 'browser-assets.json'
    if observed_path.exists():
        observed = json.loads(observed_path.read_text())
        for a in observed['assets']:
            if a['kind'] in ('image', 'font', 'stylesheet', 'script', 'video') or a['url'].endswith('/airo-media.json'):
                asset_uses.setdefault(a['url'], []).append({'page': BASE, 'kind': 'browser-' + a['kind']})
        (ARCHIVE / 'inline-svg-inventory.json').write_text(json.dumps(observed['inlineSvgs'], indent=2))
    downloaded = {}
    inactive_references = set()
    for depth in range(5):
        pending = [u for u in asset_uses if u not in downloaded]
        if not pending: break
        with ThreadPoolExecutor(max_workers=4) as pool:
            result = list(pool.map(lambda u: fetch(u, ARCHIVE / 'assets'), pending))
        for record in result:
            downloaded[record['url']] = record
            kind = record['content_type'] or ''
            if record['status'] != 200 or not any(x in kind for x in ('css', 'javascript', 'json')): continue
            data = text_of(record)
            refs = []
            if 'css' in kind:
                refs += re.findall(r'url\([\"\x27]?([^\)\"\x27]+)', data)
                refs += re.findall(r'@import\s+[\"\x27]([^\"\x27]+)', data)
            elif 'javascript' in kind:
                refs += re.findall(r'[\"\x27]((?:/assets/|/airo-assets/)[^\"\x27\s<>]+)[\"\x27]', data)
                refs += re.findall(r'(?:from|import\()\s*[\"\x27](\./[^\"\x27]+)', data)
                refs += re.findall(r'[\"\x27](https://[^\"\x27\s]+\.(?:js|css|woff2?|ttf|png|jpg|svg)(?:\?[^\"\x27\s]*)?)[\"\x27]', data)
            elif 'json' in kind:
                refs += re.findall(r'\"((?:https://|/assets/|/airo-assets/uploads/)[^\"\s]+)\"', data)
            for ref in refs:
                target = urljoin(record['url'], ref)
                if not target.startswith(('https://', 'http://')): continue
                if target.endswith(('/airo-assets/images/', '/airo-assets/videos/')) or urlsplit(target).netloc in ('img1.dev-wsimg.com', 'img1.test-wsimg.com'):
                    inactive_references.add(target)
                    continue
                use = {'page': record['url'], 'kind': 'stylesheet-reference' if 'css' in kind else 'script-reference'}
                if use not in asset_uses.setdefault(target, []): asset_uses[target].append(use)
    assets = [{**rec, 'uses': asset_uses[url]} for url, rec in downloaded.items()]
    for url in ['https://' + urlsplit(BASE).netloc.removeprefix('www.') + '/', BASE.replace('https:', 'http:'), 'http://' + urlsplit(BASE).netloc.removeprefix('www.') + '/', urljoin(BASE, 'audit-missing-page-20260923')]:
        records.append(fetch(url, ARCHIVE / 'responses'))
    inventory = {'captured_at': datetime.now(timezone.utc).isoformat(), 'base': BASE, 'pages': pages, 'assets': assets, 'responses': records, 'inactive_code_references': sorted(inactive_references), 'unfetched_assets': [u for u in asset_uses if u not in downloaded]}
    (ARCHIVE / 'inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2))
    print(json.dumps({'pages': len(pages), 'assets': len(assets), 'asset_failures': [{'url': a['url'], 'status': a['status']} for a in assets if a['status'] != 200], 'unfetched_assets': inventory['unfetched_assets'], 'responses': [{'url': r['url'], 'status': r['status'], 'redirects': r['redirects'], 'final_url': r['final_url']} for r in records]}, indent=2))


if __name__ == '__main__':
    main()
