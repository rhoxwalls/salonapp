import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { Login } from "./pages/Login";
import { WaiterDashboard } from "./pages/WaiterDashboard";

import { NavBar } from "./components/NavBar";
import { AdminDashboard } from "./pages/AdminDashboard";



function PrivateRoute({children,role}){
    const {user} = useAuth();

if(!user) return <Navigate to="/" />;
if(role && user.role !== role) return <Navigate to="/"/>;

return children;
}

function App(){
    return(
<AuthProvider>
<BrowserRouter>
<NavBar />
    <Routes>
        <Route path="/" element={<Login/>} />

        <Route path="/mozo" element={<PrivateRoute role="mozo"><WaiterDashboard/></PrivateRoute>} />

        <Route path="/admin" element={<PrivateRoute role="admin"><AdminDashboard/></PrivateRoute>} />
          
    </Routes>
</BrowserRouter>
</AuthProvider>
    )
};

export default App