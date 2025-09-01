import { useState, useEffect } from 'react';
import { 
  onAuthChange, 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  logOut,
  resetPassword
} from '../components/auth/authService.js'

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Auth methods
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    const result = await signInWithEmail(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const signup = async (email, password, displayName) => {
    setLoading(true);
    setError(null);
    
    const result = await signUpWithEmail(email, password, displayName);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    const result = await signInWithGoogle();
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    const result = await logOut();
    setLoading(false);
    return result;
  };

  const forgotPassword = async (email) => {
    const result = await resetPassword(email);
    return result;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    loginWithGoogle,
    logout,
    forgotPassword
  };
};