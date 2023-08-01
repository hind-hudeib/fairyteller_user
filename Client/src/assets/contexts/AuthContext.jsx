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
  }, [user]);

  console.log(userData);

  return (
    // <UserContext.Provider value={{ userId, setUserId ,refreshUserData}}>
    //   {children}
    // </UserContext.Provider>

    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  );
}
