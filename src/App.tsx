import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/routing/Navbar.tsx";
import CreationalPatterns from "./pages/CreationalPatterns";
import StructuralPatterns from "./pages/StructuralPatterns";
import BehavioralPatterns from "./pages/BehavioralPatterns";
import Home from "./pages/Home";
import "./App.css";
import Factory from "./examples/fabric-pattern/Factory.tsx";
import { Observer } from "./examples/behavioral/Observer.tsx";
import MediatorEmployee from "./examples/behavioral/Mediator/MediatorView.tsx";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creational/*" element={<CreationalPatterns />}>
        <Route path="factory" element={<Factory />} />
      </Route>
      <Route path="/structural/*" element={<StructuralPatterns />} />
      <Route path="/behavioral/*" element={<BehavioralPatterns />}>
        <Route path="observer" element={<Observer />} />
        <Route path="mediator" element={<MediatorEmployee />} />
      </Route>
      <Route path="*" element={<Navigate to="/creational" />} />
    </Routes>
  </Router>
);

export default App;
