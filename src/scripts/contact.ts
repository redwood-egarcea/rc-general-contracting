import messages from '../content/messages.json' with { type: 'json' };

interface WidgetOptions {
  sitekey: string;
  action: 'contact' | 'reveal';
  theme: 'auto';
  size: 'flexible' | 'compact';
  execution: 'render' | 'execute';
  appearance?: 'always' | 'interaction-only';
  retry: 'never';
  'refresh-expired': 'manual';
  'response-field': false;
  callback: (token: string) => void;
  'error-callback': () => void;
  'expired-callback': () => void;
  'timeout-callback': () => void;
  'unsupported-callback'?: () => void;
}
interface Turnstile {
  render: (
    container: HTMLElement,
    options: WidgetOptions,
  ) => string | undefined;
  reset: (id: string) => void;
  execute: (id: string) => void;
  remove: (id: string) => void;
}
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let loading: Promise<Turnstile> | undefined;
function loadTurnstile() {
  if (loading) return loading;
  loading = new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement('script');
    let settled = false;
    const fail = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      script.remove();
      loading = undefined;
      reject(new Error(messages.tokenUnavailable));
    };
    const timeout = window.setTimeout(fail, 15_000);
    const ready = () => {
      if (!window.turnstile) {
        fail();
        return;
      }
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(window.turnstile);
    };
    if (window.turnstile) {
      ready();
      return;
    }
    script.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.addEventListener('load', ready, { once: true });
    script.addEventListener('error', fail, { once: true });
    document.head.appendChild(script);
  });
  return loading;
}

interface ApiResult {
  ok: boolean;
  message?: string;
  fields?: Partial<Record<'name' | 'email' | 'message', string>>;
  email?: string;
  phone?: string;
}
async function post(
  path: string,
  body: Record<string, string>,
): Promise<ApiResult> {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.headers.get('Content-Type')?.includes('application/json'))
    throw new Error('Unexpected response');
  const result: ApiResult = await response.json();
  if (typeof result.ok !== 'boolean') throw new Error('Unexpected response');
  return { ...result, ok: response.ok && result.ok };
}

function announce(
  status: HTMLElement,
  message: string,
  error = false,
  focus = false,
) {
  status.textContent = message;
  status.dataset.state = error ? 'error' : 'ready';
  if (focus) status.focus();
}

function initializeForm(form: HTMLFormElement) {
  const fields = form.querySelector<HTMLFieldSetElement>('[data-form-fields]')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const container = form.querySelector<HTMLElement>('[data-form-widget]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const retry = form.querySelector<HTMLButtonElement>('[data-retry]')!;
  const submitLabel = submit.textContent;
  fields.disabled = false;
  let token = '';
  let widget: string | undefined;
  let api: Turnstile | undefined;
  let sending = false;
  let returnFocusToSubmit = false;

  const failed = (message: string) => {
    token = '';
    retry.hidden = false;
    announce(status, message, true);
    if (returnFocusToSubmit && document.activeElement === status) retry.focus();
  };
  const start = async () => {
    token = '';
    returnFocusToSubmit = document.activeElement === retry;
    announce(status, messages.loading, false, returnFocusToSubmit);
    retry.hidden = true;
    try {
      api = await loadTurnstile();
      if (widget) {
        api.reset(widget);
        return;
      }
      widget = api.render(container, {
        sitekey: container.dataset.sitekey || '',
        action: 'contact',
        theme: 'auto',
        size: container.clientWidth < 300 ? 'compact' : 'flexible',
        execution: 'render',
        retry: 'never',
        'refresh-expired': 'manual',
        'response-field': false,
        callback: (value) => {
          token = value;
          retry.hidden = true;
          if (!sending) announce(status, messages.verified);
          if (returnFocusToSubmit && document.activeElement === status)
            submit.focus();
          returnFocusToSubmit = false;
        },
        'error-callback': () => failed(messages.tokenInvalid),
        'expired-callback': () => failed(messages.tokenExpired),
        'timeout-callback': () => failed(messages.tokenExpired),
      });
      if (!widget) throw new Error('No widget');
    } catch {
      failed(messages.tokenUnavailable);
    }
  };
  retry.addEventListener('click', () => {
    void start();
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (sending) return;
    if (!form.reportValidity()) return;
    if (!token) {
      announce(status, messages.tokenMissing, true, true);
      retry.hidden = false;
      return;
    }
    const data = new FormData(form);
    for (const name of ['name', 'email', 'message']) {
      form.querySelector(`#${name}`)?.removeAttribute('aria-invalid');
      form.querySelector(`#${name}-error`)!.textContent = '';
    }
    const send = async () => {
      sending = true;
      submit.disabled = true;
      retry.disabled = true;
      submit.textContent = messages.sending;
      form.setAttribute('aria-busy', 'true');
      announce(status, messages.sending);
      const consumedToken = token;
      token = '';
      try {
        const result = await post('/api/submit', {
          name: String(data.get('name') || ''),
          email: String(data.get('email') || ''),
          message: String(data.get('message') || ''),
          website: String(data.get('website') || ''),
          token: consumedToken,
        });
        if (result.ok) {
          form.reset();
          announce(status, result.message || messages.delivered, false, true);
        } else {
          for (const name of ['name', 'email', 'message'] as const) {
            const error = result.fields?.[name];
            if (typeof error === 'string') {
              form
                .querySelector(`#${name}`)
                ?.setAttribute('aria-invalid', 'true');
              form.querySelector(`#${name}-error`)!.textContent = error;
            }
          }
          announce(
            status,
            result.message || messages.deliveryFailed,
            true,
            true,
          );
        }
      } catch {
        announce(status, messages.network, true, true);
      } finally {
        sending = false;
        submit.disabled = false;
        retry.disabled = false;
        retry.hidden = false;
        submit.textContent = submitLabel;
        form.removeAttribute('aria-busy');
        if (widget && api) {
          api.remove(widget);
          widget = undefined;
        }
      }
    };
    void send();
  });
  // Start the Managed widget when the form is reached, keeping the first view light.
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void start();
      }
    },
    { rootMargin: '160px' },
  );
  observer.observe(container);
}

function initializeReveal(root: HTMLElement) {
  const intro = root.querySelector<HTMLElement>('[data-reveal-intro]')!;
  const retry = root.querySelector<HTMLButtonElement>('[data-reveal-retry]')!;
  const details = root.querySelector<HTMLElement>('[data-contact-details]')!;
  const container = root.querySelector<HTMLElement>('[data-reveal-widget]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  let pending = false;
  const start = async (passive: boolean) => {
    if (pending || !details.hidden) return;
    pending = true;
    let phase: 'checking' | 'sending' | 'done' = 'checking';
    let api: Turnstile | undefined;
    let widget: string | undefined;
    const returnFocus = !passive && document.activeElement === retry;
    retry.hidden = true;
    root.setAttribute('aria-busy', 'true');
    container.dataset.passive = String(passive);
    container.hidden = false;
    announce(status, messages.verifying, false, returnFocus);

    const release = () => {
      phase = 'done';
      pending = false;
      clearTimeout(timeout);
      root.removeAttribute('aria-busy');
      if (widget && api) api.remove(widget);
      container.hidden = true;
    };
    const fail = (message: string) => {
      if (phase === 'done') return;
      release();
      retry.hidden = false;
      announce(status, message, true);
      if (returnFocus && document.activeElement === status) retry.focus();
    };
    const widgetFailed = (message: string) => {
      if (phase === 'checking') fail(message);
    };
    // A stalled widget must not leave visitors waiting indefinitely.
    const timeout = window.setTimeout(
      () => widgetFailed(messages.tokenUnavailable),
      30_000,
    );
    const reveal = async (token: string) => {
      // One token is consumed once to return both details. Ignore late callbacks.
      if (phase !== 'checking') return;
      phase = 'sending';
      clearTimeout(timeout);
      try {
        const result = await post('/api/contact', { token });
        if (
          !result.ok ||
          typeof result.email !== 'string' ||
          !result.email ||
          typeof result.phone !== 'string' ||
          !result.phone
        ) {
          fail(result.message || messages.unavailable);
          return;
        }
        const email = document.createElement('a');
        email.className = 'revealed-contact';
        email.textContent = result.email;
        email.href = `mailto:${encodeURIComponent(result.email).replace('%40', '@')}`;
        const phone = document.createElement('a');
        phone.className = 'revealed-contact';
        phone.textContent = result.phone;
        phone.href = `tel:${result.phone.replace(/[^+\d]/g, '')}`;
        details.replaceChildren(email, phone);
        details.hidden = false;
        intro.hidden = true;
        status.classList.add('visually-hidden');
        release();
        announce(status, messages.revealed);
        if (returnFocus && document.activeElement === status) email.focus();
      } catch {
        fail(messages.revealNetwork);
      }
    };
    try {
      api = await loadTurnstile();
      if (phase !== 'checking') return;
      widget = api.render(container, {
        sitekey: container.dataset.sitekey || '',
        action: 'reveal',
        theme: 'auto',
        size: container.clientWidth < 300 ? 'compact' : 'flexible',
        execution: 'execute',
        appearance: passive ? 'interaction-only' : 'always',
        retry: 'never',
        'refresh-expired': 'manual',
        'response-field': false,
        callback: (token) => {
          void reveal(token);
        },
        'error-callback': () => widgetFailed(messages.tokenInvalid),
        'expired-callback': () => widgetFailed(messages.tokenExpired),
        'timeout-callback': () => widgetFailed(messages.tokenExpired),
        'unsupported-callback': () => widgetFailed(messages.tokenUnavailable),
      });
      if (!widget) throw new Error('No widget');
      api.execute(widget);
    } catch {
      widgetFailed(messages.tokenUnavailable);
    }
  };
  retry.addEventListener('click', () => {
    void start(false);
  });
  void start(true);
}

export function initContactFlows() {
  document
    .querySelectorAll<HTMLFormElement>('[data-contact-form]')
    .forEach(initializeForm);
  document
    .querySelectorAll<HTMLElement>('[data-contact-reveal]')
    .forEach(initializeReveal);
}
