import { BrowserRouter, Route, Routes } from "react-router-dom";
import './common.css';
import AddGoal from "./pages/AddGoal";
import EditGoal from "./pages/EditGoal";
import Goals from "./pages/Goals";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/goals"
          element={
            <PrivateRoute>
              <Goals />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-goal"
          element={
            <PrivateRoute>
              <AddGoal />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-goal/:id"
          element={
            <PrivateRoute>
              <EditGoal />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;