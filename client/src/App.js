import "./App.css";
import AddUser from "./components/AddUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddPost from "./components/AddPost";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <Router>
      <div className="App">
        <Nav isLoggedIn={isLoggedIn} />
        <>
          <Routes>
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            {isLoggedIn ? (
              <>
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/home" element={<Home />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="/addpost" element={<AddPost />} />
              </>
            ) : null}
          </Routes>
        </>
      </div>
    </Router>
  );
}

export default App;
