import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import './Auth.css';
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await API.post("/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="center-container">
    <div className="card">
      <h2 className="auth-title">Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="auth-btn"
      onClick={register}>Register</button>
    </div>
    </div>
  );
}

export default Register;
