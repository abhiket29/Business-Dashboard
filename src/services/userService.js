import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const createUserProfile = async (user, additionalData = {}) => {
  if (!user) return;
  
  const userDocRef = doc(db, 'users', user.uid);
  
  try {
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      createdAt: new Date(),
      ...additionalData
    }, { merge: true });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

export const getUserProfile = async (uid) => {
  const userDocRef = doc(db, 'users', uid);
  
  try {
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};