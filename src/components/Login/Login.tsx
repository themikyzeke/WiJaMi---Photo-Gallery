import React, { useCallback, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../contexts/apiClientContext";
import { useToken } from "../../contexts/authTokenContext";
import { successAlert } from "../../utils/alerts";

export const Login = (props: any) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [_, setToken] = useToken();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const sendLogin = useMutation(() =>
    axios.post<string>("login", { username: name, password: pass })
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Logowanie</h1>
        <h5>Podaj swoje dane, aby się zalogować!</h5>
        <input
          value={name}
          onChange={(e: { target: { value: any } }) => setName(e.target.value)}
          type="text"
          placeholder="Nazwa użytkownika"
          id="name"
          name="name"
        />

        <input
          value={pass}
          onChange={(e: { target: { value: any } }) => setPass(e.target.value)}
          type="password"
          placeholder="Hasło"
          id="password"
          name="password"
        />

        <button
          onClick={() => {
            sendLogin.mutate(undefined, {
              onSuccess: ({ data }) => {
                setToken(data);
                successAlert("Welcome! You're now logged in!");
                navigate("/");
              },
            });
          }}
        >
          Zaloguj się!
        </button>

        <button
          className="link-button"
          onClick={() => {
            navigate("/register");
          }}
        >
          Nie masz konta? Zarejestruj się!
        </button>
      </form>
    </div>
  );
};
