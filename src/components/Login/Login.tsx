import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../contexts/apiClientContext';
import { successAlert } from '../../utils/alerts';
import { useMeContext } from '../../contexts/meStore';
import { GetMeDto } from '../../dtos/GetMe.dto';

export const Login = (props: any) => {
  const navigate = useNavigate();
  const [axios, setToken] = useAxios();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const [isLoggedIn, setUserInfo] = useMeContext((state) => [
    state.isLoggedIn,
    state.setUserInfo,
  ]);

  const sendLogin = useMutation(async () => {
    const { data: token } = await axios.post<string>('login', {
      username: name,
      password: pass,
    });
    setToken(token);
    const { data } = await axios.get<GetMeDto>('users/me');
    setUserInfo({
      id: data.id,
      username: data.login,
    });
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  if (isLoggedIn) {
    navigate('/');
    return null;
  }

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
              onSuccess: () => {
                successAlert('Zalogowano!');
                navigate('/');
              },
            });
          }}
        >
          Zaloguj się!
        </button>

        <button
          className="link-button"
          onClick={() => {
            navigate('/register');
          }}
        >
          Nie masz konta? Zarejestruj się!
        </button>
      </form>
    </div>
  );
};

