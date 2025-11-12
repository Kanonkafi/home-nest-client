import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register user
  const register = (name, email, password, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      (res) => {
        return updateProfile(res.user, {
          displayName: name,
          photoURL: photoURL,
        });
      }
    );
  };

  // ✅ Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Sign-in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Logout user
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("access-token"); // clear token
    return signOut(auth);
  };

  // ✅ Update profile
  const updateUserProfile = (profile) =>
    updateProfile(auth.currentUser, profile);

  // ✅ Listen for user state + set Firebase ID token in localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // get Firebase verified token
        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
