import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAxios } from '../../contexts/apiClientContext';
import { useMeContext } from '../../contexts/meStore';
import { useRedirectToHomePage } from '../../router/redirects/useRedirectToHomePage';
import { useRedirectToRegister } from '../../router/redirects/useRedirectToRegister';
import { errorAlert, successAlert } from '../../utils/alerts';

export const Login = (props: any) => {
  const redirectToHomePage = useRedirectToHomePage();
  const queryClient = useQueryClient();
  const redirectToRegister = useRedirectToRegister();
  const [axios, setToken] = useAxios();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const isLoggedIn = useMeContext((state) => state.isLoggedIn);

  const sendLogin = useMutation({
    mutationFn: async () => {
      const { data: token } = await axios.post<string>('login', {
        username: name,
        password: pass,
      });
      setToken(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  if (isLoggedIn) {
    redirectToHomePage();
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
                redirectToHomePage();
              },
              onError: () => {
                errorAlert('Failed to login! Invalid credntails!');
              },
            });
          }}
        >
          Zaloguj się!
        </button>

        <button className="link-button" onClick={redirectToRegister}>
          Nie masz konta? Zarejestruj się!
        </button>
      </form>
    </div>
  );
};

