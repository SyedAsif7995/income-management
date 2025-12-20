import { useEffect, useState } from "react";
import API from "../api";
import ProgressBar from "./ProgressBar";

function GoalList() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    API.get("/goals").then((res) => setGoals(res.data));
  }, []);

  return (
    <div>
      <h2>Your Goals</h2>

      {goals.map((goal) => {
        const percent = ((goal.saved / goal.target_amount) * 100).toFixed(1);

        return (
          <div key={goal.id}>
            <h3>{goal.title}</h3>
            <p>Category: {goal.category}</p>
            <p>
              {goal.saved} / {goal.target_amount}
            </p>

            <ProgressBar percent={percent} />
            <p>{percent}% Completed</p>
          </div>
        );
      })}
    </div>
  );
}

export default GoalList;
