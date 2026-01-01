/**
 * Mock Authentication Implementation for Docusaurus
 * This simulates API responses when a real backend is not available
 */
export class MockAuth {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.needsOnboarding = true;

    // Check if user data exists in localStorage
    const savedUser = this.getSavedUser();
    if (savedUser) {
      this.currentUser = savedUser;
      this.isAuthenticated = true;
      this.needsOnboarding = !savedUser.background;
    }
  }

  getSavedUser() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('mock_user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  saveUser(user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_user_data', JSON.stringify(user));
    }
  }

  async getSession() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (this.currentUser) {
      return {
        user: this.currentUser,
        session: {
          token: `mock-token-${Date.now()}`,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      };
    }

    throw new Error('No active session');
  }

  async signUp(email, password, name, background) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create mock user
    const user = {
      id: `user_${Date.now()}`,
      email,
      name,
      background,
      createdAt: new Date().toISOString(),
    };

    this.currentUser = user;
    this.isAuthenticated = true;
    this.needsOnboarding = false;

    this.saveUser(user);

    return {
      user,
      session: {
        token: `mock-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  }

  async signIn(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In mock mode, we'll allow any credentials and create/update the user
    const user = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0], // Use part of email as name
      background: null, // Will need onboarding
      createdAt: new Date().toISOString(),
    };

    this.currentUser = user;
    this.isAuthenticated = true;
    this.needsOnboarding = true; // Need to set background

    this.saveUser(user);

    return {
      user,
      session: {
        token: `mock-token-${Date.now()}`,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  }

  async signOut() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));

    this.currentUser = null;
    this.isAuthenticated = false;
    this.needsOnboarding = false;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_user_data');
    }
  }

  async updateProfile(updates) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!this.currentUser) {
      throw new Error('Not authenticated');
    }

    this.currentUser = { ...this.currentUser, ...updates };
    this.needsOnboarding = !this.currentUser.background;

    this.saveUser(this.currentUser);

    return {
      user: this.currentUser,
    };
  }

  // For testing purposes
  clearMockData() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.needsOnboarding = true;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_user_data');
    }
  }
}

export const mockAuth = new MockAuth();