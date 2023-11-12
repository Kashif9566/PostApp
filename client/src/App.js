import "./App.css";

import Nav from "./components/Nav";
import AddUser from "./components/AddUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/adduser" element={<AddUser />} />
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
