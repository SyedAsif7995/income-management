import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "./AddGoal.css";

function EditGoal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [goal, setGoal] = useState({
    title: "",
    target_amount: "",
    target_date: "",
    category: ""
  });

  useEffect(() => {
  API.get(`/goals/${id}`)
    .then(res => {
      setGoal({
        title: res.data.title,
        target_amount: res.data.target_amount,
        target_date: res.data.target_date.split("T")[0],
        category: res.data.category
      });
    })
    .catch(() => {
      alert("Failed to load goal");
      navigate("/goals");
    });
}, [id, navigate]);


  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const updateGoal = async () => {
    await API.put(`/goals/${id}`, goal);
    alert("Goal Updated ✅");
    navigate("/goals");
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2>Edit Goal</h2>

        <input name="title" value={goal.title} onChange={handleChange} />
        <input
          type="number"
          name="target_amount"
          value={goal.target_amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="target_date"
          value={goal.target_date?.split("T")[0]}
          onChange={handleChange}
        />

        <select
          name="category"
          value={goal.category}
          onChange={handleChange}
        >
          <option value="Emergency">Emergency</option>
          <option value="Vacation">Vacation</option>
          <option value="Investment">Investment</option>
          <option value="Education">Education</option>
        </select>

        <button onClick={updateGoal}>Update Goal</button>
        <button className="back-btn" onClick={() => navigate("/goals")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditGoal;
