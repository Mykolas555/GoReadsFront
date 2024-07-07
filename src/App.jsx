import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/authorization/Login';
import Header from './components/Header';
import Reads from './components/pages/Reads';
import Yours from './components/pages/Yours';
import Add from './components/pages/Add';
import Support from './components/pages/Support';
import UserInfo from './components/pages/UserInfo';
import Register from './components/authorization/Register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Reads />} />
        <Route path="/yours" element={<Yours />} />
        <Route path="/add" element={<Add />} />
        <Route path="/support" element={<Support />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
