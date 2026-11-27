export interface PrivateApiResult<T> {
  ok: boolean;
  status: number;
  data: T | null;
  errorMessage: string | null;
  isTransientError: boolean;
}

const RETRYABLE_STATUSES = new Set([502, 503, 504]);

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Fetches JSON from same-origin private backend API endpoints with:
 * - `credentials: "include"` so preview proxy cookies are always attached
 * - Safe JSON parsing (never throws raw SyntaxError on HTML gateway pages)
 * - Automatic retry on transient container cold-start / gateway errors (502/503/504/network)
 */
export async function fetchPrivateJson<T extends { error?: string }>(
  url: string,
  init: RequestInit = {},
  maxRetries = 2
): Promise<PrivateApiResult<T>> {
  const headers = new Headers(init.headers || {});
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        headers,
        credentials: "include",
        cache: "no-store"
      });

      const contentType = (res.headers.get("content-type") || "").toLowerCase();
      const rawText = await res.text();

      let parsed: T | null = null;
      if (rawText.trim().length > 0) {
        try {
          parsed = JSON.parse(rawText) as T;
        } catch {
          parsed = null;
        }
      }

      const isJson = contentType.includes("application/json") || parsed !== null;

      // Retry transient gateway / wake-up failures or unexpected HTML proxy pages
      if ((RETRYABLE_STATUSES.has(res.status) || (!res.ok && !isJson)) && attempt < maxRetries) {
        await delay(750 * (attempt + 1));
        continue;
      }

      if (!isJson) {
        return {
          ok: false,
          status: res.status,
          data: null,
          errorMessage:
            "Unable to reach the verification server right now. Please refresh the page and try again.",
          isTransientError: true
        };
      }

      return {
        ok: res.ok,
        status: res.status,
        data: parsed,
        errorMessage: res.ok ? null : parsed?.error || null,
        isTransientError: false
      };
    } catch {
      if (attempt < maxRetries) {
        await delay(750 * (attempt + 1));
        continue;
      }

      return {
        ok: false,
        status: 0,
        data: null,
        errorMessage:
          "Unable to reach the verification server right now. Please refresh the page and try again.",
        isTransientError: true
      };
    }
  }

  return {
    ok: false,
    status: 0,
    data: null,
    errorMessage:
      "Unable to reach the verification server right now. Please refresh the page and try again.",
    isTransientError: true
  };
}
