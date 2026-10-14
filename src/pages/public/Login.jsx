import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../style/Login.css"

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/admin");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          🛍
        </div>

        <h1>Welcome Back</h1>

        <p>
          Sign in to access the
          <strong> Nexus Admin Dashboard</strong>.
        </p>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login as Admin →
        </button>

        <p className="login-note">
          Demo Login (No password required)
        </p>

      </div>
    </div>
  );
}

export default Login;