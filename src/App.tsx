import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Gallery } from "./components/Gallery/Gallery";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/NavBar/Navbar";
import { Register } from "./components/Register/Register";
import "./styles/App.css";

function App() {
  return (
          <div className="Background">
            <br></br>
            <Router>
            <Navbar />
            <div className="App">
      
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={<Gallery />} />
                </Routes>
           
            </div>
            </Router>
          </div>

  );
}

export default App;
