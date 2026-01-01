/**
 * Session Management Utility
 * Handles JWT token storage, retrieval, and refresh
 */

const SESSION_KEY = 'physical_ai_session';
const TOKEN_KEY = 'physical_ai_token';

/**
 * Store session data
 */
export function storeSession(session) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      ...session,
      storedAt: Date.now(),
    }));
  }
}

/**
 * Retrieve session data
 */
export function getSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;

    const session = JSON.parse(data);

    // Check if session is expired
    if (session.expiresAt && Date.now() > new Date(session.expiresAt).getTime()) {
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error reading session:', error);
    return null;
  }
}

/**
 * Clear session data
 */
export function clearSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Get current JWT token
 */
export function getToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  // Try session first
  const session = getSession();
  if (session?.token) {
    return session.token;
  }

  // Fallback to token key
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const session = getSession();
  return !!session?.token && !!session.user;
}

/**
 * Get authorization headers for API calls
 */
export function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/**
 * Refresh session if needed
 */
export async function refreshSession() {
  const session = getSession();
  if (!session?.refreshToken) {
    return null;
  }

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: session.refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const data = await response.json();
    storeSession(data.session);
    return data.session;
  } catch (error) {
    console.error('Session refresh failed:', error);
    clearSession();
    return null;
  }
}

/**
 * Get background preference for content personalization
 */
export function getUserBackground() {
  const session = getSession();
  return session?.user?.background || null;
}

/**
 * Get content depth preference
 */
export function getContentDepth() {
  const session = getSession();
  return session?.user?.preferences?.contentDepth || 'detailed';
}

/**
 * Get language preference
 */
export function getLanguagePreference() {
  const session = getSession();
  return session?.user?.preferences?.language || 'en';
}
