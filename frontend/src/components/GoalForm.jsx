import { useState } from "react";
import API from "../api";

function GoalForm() {
  const [goal, setGoal] = useState({
    user_id: 1,
    title: "",
    target_amount: "",
    target_date: "",
    category: ""
  });

  const submitGoal = async () => {
    await API.post("/goals", goal);
    alert("Goal Created");
    window.location.reload();
  };

  return (
    <div>
      <h2>Create Goal</h2>

      <input
        type="text"
        placeholder="Goal Title"
        onChange={(e) => setGoal({ ...goal, title: e.target.value })}
      />

      <input
        type="number"
        placeholder="Target Amount"
        onChange={(e) => setGoal({ ...goal, target_amount: e.target.value })}
      />

      <input
        type="date"
        onChange={(e) => setGoal({ ...goal, target_date: e.target.value })}
      />

      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setGoal({ ...goal, category: e.target.value })}
      />

      <button onClick={submitGoal}>Add Goal</button>
    </div>
  );
}

export default GoalForm;
