// "use client";

// import { User } from "@/models/userTypes";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";

// export type GlobalContextType = {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: (isLoggedIn: boolean) => void;
// };

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   return <GlobalContext.Provider value={{
//     user, setUser,
//     isLoggedIn, setIsLoggedIn,
//   }}>{children}</GlobalContext.Provider>;
// };

// export const useGlobalContext = () => {
//   const context = useContext(GlobalContext);
//   if (context === undefined) {
//     throw new Error("useGlobalContext must be used within a GlobalProvider");
//   }
//   return context;
// };

"use client";

import { User } from "@/models/userTypes";
import { BASE_URL } from "@/utils/constants";
import { createContext, useContext, useEffect, useState } from "react";

export type GlobalContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  loading: boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Simulating an API call to verify the token
          const response = await fetch(`${BASE_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
