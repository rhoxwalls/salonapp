import { LoginComp } from "../components/LoginComp";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = ({ token, user }) => {
    login({token,user});
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "mozo") navigate("/mozo");
  };
  return <LoginComp onLogin={handleLogin} />;
};
