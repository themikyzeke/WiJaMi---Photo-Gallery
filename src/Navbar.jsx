import { IoLogOut } from "react-icons/io5";
import "./navbar.css"

export const Navbar = () => {

 
    return (
        <header>
            <a className="logo" href="/"><img  src="WiJaMi Logo3.png"/></a> 
            <button className="nav-btn">
                <a href="/login"><IoLogOut/></a> 
            </button>
        </header>
    )
}