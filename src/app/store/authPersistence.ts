const PERSIST_KEY = "auth_persist";
const SESSION_KEY = "auth_session";
const REFRESH_COOKIE_KEY = "refreshToken";
const PERSISTENT_REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type StoredAuth = {
  accessToken: string;
};

export function saveAuth(data: StoredAuth, rememberMe: boolean): void {
  if (rememberMe) {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(data));
    sessionStorage.removeItem(SESSION_KEY);
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    localStorage.removeItem(PERSIST_KEY);
  }
}

export function saveRefreshToken(
  refreshToken: string,
  rememberMe: boolean,
): void {
  const serialized = encodeURIComponent(refreshToken);
  const maxAge = rememberMe
    ? `; Max-Age=${PERSISTENT_REFRESH_COOKIE_MAX_AGE}`
    : "";

  // biome-ignore lint/suspicious/noDocumentCookie: cookie persistence is required here for browser-side refresh flow.
  document.cookie = `${REFRESH_COOKIE_KEY}=${serialized}; Path=/; SameSite=Lax${maxAge}`;
}

export function getRefreshToken(): string | null {
  const cookies = document.cookie.split("; ");
  const refreshToken = cookies
    .find((row) => row.startsWith(`${REFRESH_COOKIE_KEY}=`))
    ?.split("=")[1];

  return refreshToken ? decodeURIComponent(refreshToken) : null;
}

export function clearRefreshToken(): void {
  // biome-ignore lint/suspicious/noDocumentCookie: cookie cleanup is required here for browser-side logout/reset.
  document.cookie = `${REFRESH_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function hasPersistentAuth(): boolean {
  return Boolean(localStorage.getItem(PERSIST_KEY));
}

function parseStored(raw: string): StoredAuth | null {
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.accessToken === "string") {
      return { accessToken: parsed.accessToken };
    }
  } catch {
    return null;
  }
  return null;
}

export function loadAuth(): StoredAuth | null {
  const local = localStorage.getItem(PERSIST_KEY);
  if (local) {
    return parseStored(local);
  }

  const sess = sessionStorage.getItem(SESSION_KEY);
  if (sess) {
    return parseStored(sess);
  }

  return null;
}

export function clearAuthStorage(): void {
  localStorage.removeItem(PERSIST_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  clearRefreshToken();
}

export function updateStoredAccessToken(token: string): void {
  try {
    const persist = localStorage.getItem(PERSIST_KEY);
    if (persist) {
      const data = JSON.parse(persist) as StoredAuth;
      data.accessToken = token;
      localStorage.setItem(PERSIST_KEY, JSON.stringify(data));
      return;
    }

    const sess = sessionStorage.getItem(SESSION_KEY);
    if (sess) {
      const data = JSON.parse(sess) as StoredAuth;
      data.accessToken = token;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    }
  } catch {
    console.error("Failed to update stored access token");
  }
}
