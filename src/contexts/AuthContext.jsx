// AuthContext.js
import { createContext, useContext, useState } from "react";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("authToken"));

  return (
    <AuthContext.Provider value={{ hasToken, setHasToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
