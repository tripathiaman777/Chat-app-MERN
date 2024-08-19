import { createContext, useContext, useState } from "react";

// Creating the context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component to provide context values to its children
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
