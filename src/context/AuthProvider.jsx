
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
  updateProfile
} from "firebase/auth";




const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Register user
  const register = (name, email, password, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, {
          displayName: name,
          photoURL: photoURL
        });
      });
  };



  //  Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //  Google Sign-in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //  Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  //  Track auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
    const updateUserProfile = (profile) => updateProfile(auth.currentUser, profile);

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleSignIn,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
