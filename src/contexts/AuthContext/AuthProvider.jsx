import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track the current authenticated user
  const [loading, setLoading] = useState(true); // Track if the auth state is still loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to register a new user with email and password
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Function to login existing user
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Function to login with Google using popup
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider());

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Function to log out user
  const logout = () => signOut(auth);
  const authInfo = {
    user,
    register,
    updateUserProfile,
    login,
    googleLogin,
    loading,
    setLoading,
    resetPassword,
    logout,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
