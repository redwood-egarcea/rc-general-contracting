import messages from '../content/messages.json';

interface WidgetOptions {
  sitekey: string;
  action: 'contact' | 'reveal';
  theme: 'auto';
  size: 'flexible' | 'compact';
  execution: 'render' | 'execute';
  retry: 'never';
  'refresh-expired': 'manual';
  'response-field': false;
  callback: (token: string) => void;
  'error-callback': () => void;
  'expired-callback': () => void;
  'timeout-callback': () => void;
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
  kind?: 'email' | 'phone';
  value?: string;
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
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-reveal]'),
  );
  const container = root.querySelector<HTMLElement>('[data-reveal-widget]')!;
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  let pending = false;
  let api: Turnstile | undefined;
  let widget: string | undefined;
  const release = () => {
    pending = false;
    buttons.forEach((button) => {
      button.disabled = false;
    });
    root.removeAttribute('aria-busy');
    if (widget && api) {
      api.remove(widget);
      widget = undefined;
    }
    container.hidden = true;
  };
  buttons.forEach((button) => {
    button.disabled = false;
    button.addEventListener('click', () => {
      if (pending) return;
      const kind = button.dataset.reveal;
      if (kind !== 'email' && kind !== 'phone') return;
      pending = true;
      buttons.forEach((control) => {
        control.disabled = true;
      });
      root.setAttribute('aria-busy', 'true');
      announce(status, messages.verifying);
      container.hidden = false;
      const fail = (message: string) => {
        release();
        announce(status, message, true);
      };
      const reveal = async (token: string) => {
        try {
          const result = await post('/api/contact', { token, kind });
          if (
            !result.ok ||
            result.kind !== kind ||
            typeof result.value !== 'string'
          ) {
            fail(result.message || messages.unavailable);
            return;
          }
          const link = document.createElement('a');
          link.className = 'revealed-contact';
          link.textContent = result.value;
          link.href =
            kind === 'email'
              ? `mailto:${encodeURIComponent(result.value).replace('%40', '@')}`
              : `tel:${result.value.replace(/[^+\d]/g, '')}`;
          button.replaceWith(link);
          release();
          announce(status, messages.revealed);
          link.focus();
        } catch {
          fail(messages.revealNetwork);
        }
      };
      const execute = async () => {
        try {
          api = await loadTurnstile();
          widget = api.render(container, {
            sitekey: container.dataset.sitekey || '',
            action: 'reveal',
            theme: 'auto',
            size: container.clientWidth < 300 ? 'compact' : 'flexible',
            execution: 'execute',
            retry: 'never',
            'refresh-expired': 'manual',
            'response-field': false,
            callback: (token) => {
              void reveal(token);
            },
            'error-callback': () => fail(messages.tokenInvalid),
            'expired-callback': () => fail(messages.tokenExpired),
            'timeout-callback': () => fail(messages.tokenExpired),
          });
          if (!widget) throw new Error('No widget');
          api.execute(widget);
        } catch {
          fail(messages.tokenUnavailable);
        }
      };
      void execute();
    });
  });
}

export function initContactFlows() {
  document
    .querySelectorAll<HTMLFormElement>('[data-contact-form]')
    .forEach(initializeForm);
  document
    .querySelectorAll<HTMLElement>('[data-contact-reveal]')
    .forEach(initializeReveal);
}
