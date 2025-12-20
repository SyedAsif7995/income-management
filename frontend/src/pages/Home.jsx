import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="center-container a">
      <div className="card home-card">
        <h1 className="title"> Financial Goals Tracker</h1>
        <p>Plan • Save • Achieve</p>

        <button onClick={() => navigate("/goals")}>View Goals</button>
        <button onClick={() => navigate("/add-goal")}>Add Goal</button>
      </div>
    </div>
  );
}

export default Home;
