import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Register } from "./Pages/Register.jsx";
import { Login } from "./Pages/Login.jsx";
import Todolist from "./Pages/Todolist.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route exact path="/todo" element={<Todolist />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
