import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);

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
      }
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
}
