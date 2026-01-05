// DEV-only global network instrumentation. Import this BEFORE supabaseclient is imported anywhere.
if (import.meta.env.DEV) {
  const g: any = globalThis as any;

  // ---- fetch wrapper ----
  if (typeof g.fetch === "function" && !g.__FETCH_DEBUG_INSTALLED__) {
    g.__FETCH_DEBUG_INSTALLED__ = true;
    const FETCH_TIMEOUT_MS = 15000;

    const originalFetch = g.fetch.bind(g);
    g.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : (input as Request).url;

      const method = (init?.method || (input as any)?.method || "GET").toUpperCase();

      const upstream = init?.signal;
      if (upstream) upstream.addEventListener("abort", () => controller.abort(), { once: true });

      try {
        console.log("[fetch:start]", method, url);
        const res = await originalFetch(input, { ...init, signal: controller.signal });
        console.log("[fetch:done ]", method, url, res.status);
        return res;
      } catch (e: any) {
        console.warn("[fetch:fail ]", method, url, e?.name || e);
        throw e;
      } finally {
        window.clearTimeout(timeoutId);
      }
    };
  }

  // ---- XHR wrapper ----
  if (typeof XMLHttpRequest !== "undefined" && !g.__XHR_DEBUG_INSTALLED__) {
    g.__XHR_DEBUG_INSTALLED__ = true;
    const XHR_TIMEOUT_MS = 15000;

    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method: string, url: string, ...rest: any[]) {
      (this as any).__dbg = { method, url };
      return origOpen.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (body?: any) {
      const meta = (this as any).__dbg || {};
      try {
        (this as any).timeout = XHR_TIMEOUT_MS;

        console.log("[xhr:start]", meta.method || "GET", meta.url || "(unknown url)");
        this.addEventListener("load", () => {
          console.log("[xhr:done ]", meta.method || "GET", meta.url || "(unknown url)", (this as any).status);
        });
        this.addEventListener("error", () => {
          console.warn("[xhr:fail ]", meta.method || "GET", meta.url || "(unknown url)", "error");
        });
        this.addEventListener("timeout", () => {
          console.warn("[xhr:fail ]", meta.method || "GET", meta.url || "(unknown url)", `timeout ${XHR_TIMEOUT_MS}ms`);
        });
        this.addEventListener("abort", () => {
          console.warn("[xhr:fail ]", meta.method || "GET", meta.url || "(unknown url)", "abort");
        });
      } catch {
        // ignore
      }

      return origSend.call(this, body);
    };
  }
}
