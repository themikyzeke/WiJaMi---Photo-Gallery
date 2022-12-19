import { IoLogOut } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
    const location = useLocation()
 
    return (
        <header>
            <a className="logo" href="/"><img  src="WiJaMi Logo3.png"/></a> 
            <button className="nav-btn">
               {!location.pathname.includes("/login") && <a href="/login"><IoLogOut/></a>} 
            </button>
        </header>
    )
}