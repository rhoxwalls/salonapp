import { useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuth";



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(() => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return null;
  }});

    const [token,setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
  if (token) {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        localStorage.removeItem("user");
      }
    }
  }
}, [token]);
    const login = (data)=>{

    setToken(data.token);
    const userData = data.user ?? { role: data.role, username: data.username };
    

    localStorage.setItem("token", data.token);
    
    localStorage.setItem("user", JSON.stringify(userData));
  
    };

    const logout = () =>{
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    };

    return(
        <AuthContext.Provider value={{user,token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
