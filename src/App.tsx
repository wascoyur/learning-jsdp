import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import CreationalPatterns from "./pages/CreationalPatterns";
import StructuralPatterns from "./pages/StructuralPatterns";
import BehavioralPatterns from "./pages/BehavioralPatterns";
import Home from "./pages/Home";
import "./App.css";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creational/*" element={<CreationalPatterns />} />
      <Route path="/structural/*" element={<StructuralPatterns />} />
      <Route path="/behavioral/*" element={<BehavioralPatterns />} />
      <Route path="*" element={<Navigate to="/creational" />} />
    </Routes>
  </Router>
);

export default App;
