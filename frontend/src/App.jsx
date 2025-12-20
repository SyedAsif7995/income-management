import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddGoal from "./pages/AddGoal";
import Goals from "./pages/Goals";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/add-goal" element={<AddGoal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
