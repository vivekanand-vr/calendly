import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebase/firebase'; 

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Provide the logged-in state and auth methods
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children} {/* Only render children if not loading */}
    </AuthContext.Provider>
  );
};
