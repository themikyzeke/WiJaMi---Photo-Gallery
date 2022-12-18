import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }

    const navigate = useNavigate();

    return (
        <div className="form-container">
            
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>WiJaMi - Photo Gallery</h1>
                <h5>Podaj swoje dane, aby się zarejestorwać!</h5>
                <input value={name} onChange={(e) => setName (e.target.value)} type="text" placeholder="Nazwa użytkownika" id="name" name="name"/>

                <input value={pass} onChange={(e) => setPass (e.target.value)} type="password" placeholder="Hasło" id="password" name="password"/>

                <button onClick={() => {navigate("/login")}}>Zarejestruj się!</button>

                <button className="link-button" onClick={() => {navigate("/login")}}> Masz już konto? Zaloguj się!</button>
            </form>
            
        </div>
    )
}