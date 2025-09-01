// src/auth/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name if provided
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    
    return { 
      success: true, 
      user: userCredential.user,
      message: 'Account created successfully!'
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return { 
      success: false, 
      error: getErrorMessage(error.code)
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { 
      success: true, 
      user: userCredential.user,
      message: 'Welcome back!'
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: getErrorMessage(error.code)
    };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { 
      success: true, 
      user: result.user,
      message: 'Successfully signed in with Google!'
    };
  } catch (error) {
    console.error('Google sign in error:', error);
    
    if (error.code === 'auth/popup-closed-by-user') {
      return { 
        success: false, 
        error: 'Sign in was cancelled.'
      };
    }
    
    return { 
      success: false, 
      error: 'Google sign in failed. Please try again.'
    };
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { 
      success: true,
      message: 'Successfully signed out!'
    };
  } catch (error) {
    console.error('Sign out error:', error);
    return { 
      success: false, 
      error: 'Error signing out. Please try again.'
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { 
      success: true,
      message: 'Password reset email sent! Check your inbox.'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return { 
      success: false, 
      error: getErrorMessage(error.code)
    };
  }
};

// Listen for authentication state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Helper function to get user-friendly error messages
const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email is already registered. Try signing in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    default:
      return 'An error occurred. Please try again.';
  }
};