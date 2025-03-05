import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Worklog from "./components/worklog/Worklog";
import Signup from "./components/Signup/Signup";
import Forgotpass from "./components/Login/Forgotpass";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgotpass />} />
        <Route path="/homepage" element={<Worklog />} />
      </Routes>
    </Router>
  );
};

export default App;
