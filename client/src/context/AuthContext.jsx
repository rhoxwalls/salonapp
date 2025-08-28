import { useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuth";



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token,setToken] = useState(localStorage.getItem("token") || null);

    useEffect(()=>{
        if(token){
            // Recuperar user desde el localStorage al recargar
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if(storedUser) setUser(storedUser);
        }
    },[token]);

    const login = (data)=>{
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
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
