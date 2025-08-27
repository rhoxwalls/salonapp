import { useState } from "react"
import { AuthContext } from "../hooks/useAuth";



export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const login = (username, password)=>{
    // login admin
    if(username === "admin" && password === "admin123"){
        setUser({username, role:"admin"});
        return{success:true, role :"admin"};
    // login user 
    } else if(username === "mozo" && password ==="1234"){
        setUser({username, role:"mozo"});
        return{success:true,role:"mozo"};    
    };

    return {success:false};
    };

    const logout = () => setUser(null);

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
