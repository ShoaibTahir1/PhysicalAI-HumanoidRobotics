import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../components/Auth/AuthContext';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import OnboardingModal from '../components/Auth/OnboardingModal';

// Inner component that uses auth context
function AppWithAuth() {
  const { needsOnboarding } = useAuth();

  return (
    <>
      {/* Onboarding modal appears when needed */}
      {needsOnboarding && (
        <OnboardingModal
          isOpen={needsOnboarding}
          onComplete={() => {
            // Modal auto-closes via context update
          }}
        />
      )}
    </>
  );
}

// Navbar button component
function NavbarAuthWrapper() {
  const { isAuthenticated, user, signOut, isLoading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(null); // 'signin' | 'signup' | null

  if (isLoading) {
    return (
      <div className="navbar-auth-loading">
        <span className="loading-spinner"></span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="navbar-authenticated">
        <button
          className="navbar-user-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="user-avatar">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
          <span className="user-name">{user.name}</span>
        </button>

        {showDropdown && (
          <div className="auth-dropdown">
            <div className="dropdown-header">
              <span className="dropdown-email">{user.email}</span>
              <span className="dropdown-background">{user.background}</span>
            </div>
            <button className="dropdown-item" onClick={() => {/* Open settings */}}>
              Settings
            </button>
            <button className="dropdown-item danger" onClick={signOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="navbar-auth-buttons">
      <button
        className="navbar-auth-btn signin"
        onClick={() => setShowAuthModal('signin')}
      >
        Sign In
      </button>
      <button
        className="navbar-auth-btn signup"
        onClick={() => setShowAuthModal('signup')}
      >
        Sign Up
      </button>

      {showAuthModal === 'signin' && (
        <SignIn
          onSwitchToSignUp={() => setShowAuthModal('signup')}
          onClose={() => setShowAuthModal(null)}
        />
      )}

      {showAuthModal === 'signup' && (
        <SignUp
          onSwitchToSignIn={() => setShowAuthModal('signin')}
          onClose={() => setShowAuthModal(null)}
        />
      )}
    </div>
  );
}

// Root component that wraps the entire app
export default function Root({ children }) {
  return (
    <AuthProvider>
      <AppWithAuth />
      {children}
    </AuthProvider>
  );
}

// Styles for auth components
const authStyles = `
  .navbar-auth-loading {
    padding: 0.5rem;
  }

  .loading-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid var(--ifm-color-emphasis-300);
    border-radius: 50%;
    border-top-color: var(--ifm-color-primary);
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .navbar-auth-buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .navbar-auth-btn {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .navbar-auth-btn.signin {
    background: transparent;
    border: 1px solid var(--ifm-color-emphasis-300);
    color: var(--ifm-color-emphasis-700);
  }

  .navbar-auth-btn.signin:hover {
    border-color: var(--ifm-color-primary);
    color: var(--ifm-color-primary);
  }

  .navbar-auth-btn.signup {
    background: var(--ifm-color-primary);
    border: 1px solid var(--ifm-color-primary);
    color: white;
  }

  .navbar-auth-btn.signup:hover {
    background: var(--ifm-color-primary-dark);
    border-color: var(--ifm-color-primary-dark);
  }

  .navbar-authenticated {
    position: relative;
  }

  .navbar-user-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
  }

  .navbar-user-btn:hover {
    background: var(--ifm-color-emphasis-200);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--ifm-color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .user-name {
    font-weight: 500;
    color: var(--ifm-color-emphasis-700);
  }

  .auth-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    min-width: 200px;
    background: var(--ifm-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }

  .dropdown-header {
    padding: 1rem;
    border-bottom: 1px solid var(--ifm-color-emphasis-200);
  }

  .dropdown-email {
    display: block;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .dropdown-background {
    display: block;
    font-size: 0.8rem;
    color: var(--ifm-color-emphasis-600);
    margin-top: 0.25rem;
    text-transform: capitalize;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.2s;
  }

  .dropdown-item:hover {
    background: var(--ifm-color-emphasis-100);
  }

  .dropdown-item.danger {
    color: var(--ifm-color-danger);
  }

  /* RTL support */
  [lang='ur'] .navbar-auth-buttons {
    flex-direction: row-reverse;
  }

  [lang='ur'] .auth-dropdown {
    right: auto;
    left: 0;
    text-align: right;
  }

  [lang='ur'] .dropdown-item {
    text-align: right;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleId = 'auth-component-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = authStyles;
    document.head.appendChild(style);
  }
}
