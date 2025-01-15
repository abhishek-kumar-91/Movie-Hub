import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);

  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result) setUser(result.user);
    } catch (error) {
      console.error("Error during email sign-up:", error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        setUser(result.user);
        return true;
      }
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) setUser(result.user);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addToFavorites = async (showId) => {
    if (!user) return;
    // Add a new document in collection "users"
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {}, { merge: true });
    await updateDoc(userDocRef, {
      favorites: arrayUnion(showId),
    });
  };

  const removeFromFavorites = async (showId) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      favorites: arrayRemove(showId),
    });
  };

  const getFavorites = async () => {
    if (!user) return [];
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    return userDocSnap.exists() ? userDocSnap.data().favorites || [] : [];
  };

  const handleRating = async (movieId, rating) => {
    if (!user) return [];
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data() || {};
    const updatedRatings = {
      ...userData.ratings,
      [movieId]: rating,
    };
    await setDoc(userDocRef, { ratings: updatedRatings }, { merge: true });
  };

  const getUserRating = async (movieId) => {
    if (!user) return 0;
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() || {};
      return userData.ratings ? userData.ratings[movieId] || 0 : 0;
    }
    return 0;
  };

  return (
    <AuthContext.Provider
      value={{
        signUpWithEmail,
        signInWithEmail,
        signUpWithGoogle,
        logOut,
        user,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
        handleRating,
        getUserRating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
