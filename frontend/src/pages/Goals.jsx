import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Contribution from "../components/Contribution";
import ProgressBar from "../components/ProgressBar";
import "./Goals.css";

function Goals() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const fetchGoals = () => {
    API.get("/goals").then(res => setGoals(res.data));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="center-container">
      <div className="card">
        <h2 className="page-title">Your Goals</h2>

        {goals.map(goal => {
          const percent = ((goal.saved / goal.target_amount) * 100).toFixed(1);

          return (
            <div className="goal-box" key={goal.id}>
              <h3>{goal.title}</h3>
              <p>Category: {goal.category}</p>
              <p>₹{goal.saved} / ₹{goal.target_amount}</p>

              <ProgressBar percent={percent} />
              <p>{percent}% Completed</p>

            
              <Contribution goalId={goal.id} refresh={fetchGoals} />
            </div>
          );
        })}

        <div className="back-btn-container">
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Goals;
