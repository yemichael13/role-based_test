// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          // Handle legacy users or invalid accounts
          await signOut(auth);
          setUser(null);
          setUserRole(null);
        }
        setUser(firebaseUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User account not properly configured');
      }
      
      setUserRole(userDoc.data().role);
      return userCredential.user;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Parent registration function
  const register = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: 'parent',
        createdAt: new Date().toISOString(),
        children: []
      });

      return userCredential.user;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  // Admin-created teacher registration
  const createTeacherAccount = async (email, password) => {
    if (userRole !== 'admin') {
      throw new Error('Unauthorized access');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: 'teacher',
        createdAt: new Date().toISOString(),
        assignedClasses: []
      });
      
      return userCredential.user;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setUserRole(null);
    } catch (error) {
      throw new Error('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add child to parent account
  const addChild = async (childName) => {
    if (userRole !== 'parent') return;

    try {
      // Create child document
      const childRef = doc(collection(db, 'children'));
      await setDoc(childRef, {
        name: childName,
        parentId: user.uid,
        progress: {},
        createdAt: new Date().toISOString()
      });

      // Update parent document
      await updateDoc(doc(db, 'users', user.uid), {
        children: arrayUnion(childRef.id)
      });

      return childRef.id;
    } catch (error) {
      throw new Error('Failed to add child. Please try again.');
    }
  };

  const value = {
    user,
    userRole,
    loading,
    login,
    register,
    createTeacherAccount,
    resetPassword,
    logout,
    addChild
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function to translate Firebase error codes
const getAuthErrorMessage = (code) => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address format';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'This email is already registered';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed';
    case 'auth/requires-recent-login':
      return 'Please reauthenticate to perform this action';
    default:
      return 'Authentication error. Please try again';
  }
};