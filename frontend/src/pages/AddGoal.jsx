import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./AddGoal.css";

function AddGoal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [goal, setGoal] = useState({

    title: "",
    target_amount: "",
    target_date: "",
    category: ""
  });

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const submitGoal = async () => {
    if (!goal.title || !goal.target_amount || !goal.target_date || !goal.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await API.post("/goals", goal);
      alert("Goal Added Successfully ");
      navigate("/goals");
    } catch (err) {
      console.error(err);
      alert("Failed to add goal ");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="center-container">
    <div className="card add-goal-card">
      <h2 className="page-title">Add New Goal</h2>

      <div className="form-row">
        <input
          type="text"
          name="title"
          placeholder="Goal Title (e.g. Emergency Fund)"
          value={goal.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="target_amount"
          placeholder="Target Amount (₹)"
          value={goal.target_amount}
          onChange={handleChange}
        />

        <input
          type="date"
          name="target_date"
          value={goal.target_date}
          onChange={handleChange}
        />
      </div>

      <select
        name="category"
        value={goal.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        <option value="Emergency">Emergency Fund</option>
        <option value="Vacation">Vacation</option>
        <option value="Education">Education</option>
        <option value="Investment">Investment</option>
        <option value="Other">Other</option>
      </select>

      <div className="button-row">
        <button
          className="primary-btn"
          onClick={submitGoal}
          disabled={loading}
        >
          {loading ? "Saving..." : " Add Goal"}
        </button>

        <button
          className="secondary-btn"
          onClick={() => navigate("/")}
        >
           Back to Home
        </button>
      </div>
    </div>
  </div>
);

}

export default AddGoal;
