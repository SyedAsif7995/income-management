import { useState } from "react";
import API from "../api";

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
    <div className="contribution-box">
      <input
        type="number"
        placeholder="Add Amount ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={addContribution} disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

export default Contribution;
