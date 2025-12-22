import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully 👋");
    navigate("/");
  };

  return (
    <div className="center-container">
      <div className="card home-card">
        <h1 className="title">Financial Goals Tracker</h1>
        <p className="subtitle">Plan • Save • Achieve</p>

       
        {!token && (
          <div className="btn-group">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}

        
        {token && (
          <>
            <div className="btn-group">
              <button onClick={() => navigate("/goals")}>View Goals</button>
              <button onClick={() => navigate("/add-goal")}>Add Goal</button>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
