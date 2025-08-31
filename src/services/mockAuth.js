// Mock Firebase Auth service for demonstration
// In a real application, you would use actual Firebase Auth

class MockAuthService {
  constructor() {
    this.currentUser = null;
    this.listeners = new Set();
  }

  // Mock sign in with popup
  signInWithPopup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          email: 'demo@example.com',
          displayName: 'Demo User',
          uid: 'demo-user-id'
        };
        this.currentUser = user;
        this.notifyListeners(user);
        resolve({ user });
      }, 1000);
    });
  }

  // Mock sign out
  signOut() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        this.notifyListeners(null);
        resolve();
      }, 500);
    });
  }

  // Mock auth state listener
  onAuthStateChanged(callback) {
    this.listeners.add(callback);
    // Immediately call with current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  // Notify all listeners of auth state change
  notifyListeners(user) {
    this.listeners.forEach(callback => callback(user));
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }
}

// Create and export a singleton instance
export const mockAuth = new MockAuthService();