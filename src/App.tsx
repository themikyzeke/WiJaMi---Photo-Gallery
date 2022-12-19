import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Gallery } from "./components/Gallery/Gallery";
import { Navbar } from "./components/NavBar/Navbar";

function App() {
  return (
          <div className="Background">
            <br></br>
            <Navbar />
            <div className="App">
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Gallery />} />
                </Routes>
              </Router>
            </div>
          </div>

  );
}

export default App;
