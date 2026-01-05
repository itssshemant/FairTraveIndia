import "./bootstrap/networkDebug";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// DEV-only: log + abort stuck network requests (Supabase uses globalThis.fetch).
if (import.meta.env.DEV) {
  const FETCH_TIMEOUT_MS = 15000;

  const g: any = globalThis as any;
  if (typeof g.fetch === "function" && !g.__FETCH_DEBUG_INSTALLED__) {
    g.__FETCH_DEBUG_INSTALLED__ = true;

    const originalFetch = g.fetch.bind(g);

    const wrappedFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
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
      if (upstream) {
        upstream.addEventListener("abort", () => controller.abort(), { once: true });
      }

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

    // Patch both (some libs read one or the other)
    g.fetch = wrappedFetch;
    if (typeof window !== "undefined") (window as any).fetch = wrappedFetch;

    console.log("[fetch] debug wrapper installed");
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Remove StrictMode to avoid dev double-invocation of effects (doubles Supabase calls).
  <App />
);
