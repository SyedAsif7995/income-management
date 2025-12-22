import { useState } from "react";
import API from "../api";
import './contribution.css';
function Contribution({ goalId, refresh }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addContribution = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      setLoading(true);
      await API.post("/contributions", {
        goal_id: goalId,
        account_id: 1,  
        amount
      });
      setAmount("");
      refresh(); 
    } catch (err) {
      alert("Failed to add contribution");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-amount-container">
      <input
        type="number"
        className="add-amount-input"
        placeholder="Add Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button className="add-btn"
       onClick={addContribution} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

export default Contribution;
