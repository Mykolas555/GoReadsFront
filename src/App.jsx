import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Reads from './components/reads/Reads';
import Yours from './components/yours/Yours';
import Add from './components/add/Add';
import Support from './components/support/Support';
import Settings from './components/settings/Settings';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Reads />} />
        <Route path="/yours" element={<Yours />} />
        <Route path="/add" element={<Add />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
