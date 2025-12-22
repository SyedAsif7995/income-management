import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import './Auth.css';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="center-container">

    <div className="card">
      <h2 className="auth-title">Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className ="auth-btn"onClick={login}>Login</button>
    </div>
    </div>
  );
}

export default Login;
