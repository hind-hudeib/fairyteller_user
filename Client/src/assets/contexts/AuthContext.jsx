import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("auth"));
  const [loading, setLoading] = useState(true); // Add loading state

  async function verifyToken() {
    const token = localStorage.getItem("token") || false;

    if (token) {
      try {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data); // Assuming the response contains user data
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    } else {
      setLoading(false); // Set loading to false if there's no token
    }
  }

  useEffect(() => {
    if (localStorage.token != null) {
      verifyToken();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
