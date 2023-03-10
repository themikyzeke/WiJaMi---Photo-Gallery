import { useMutation } from '@tanstack/react-query';
import { FormEvent, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../contexts/apiClientContext';
import { errorAlert, successAlert } from '../../utils/alerts';

export const Register: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [axios] = useAxios();

  const sendRegister = useMutation(() =>
    axios.post('register', { username: name, password: pass }),
  );

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    console.log(name);
  };

  const navigate = useNavigate();

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Rejestracja</h1>
        <h5>Podaj swoje dane, aby się zarejestrować!</h5>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nazwa użytkownika"
          id="name"
          name="name"
        />

        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Hasło"
          id="password"
          name="password"
        />

        <button
          onClick={() => {
            sendRegister.mutate(undefined, {
              onSuccess: () => {
                navigate('/login');
                successAlert(
                  'Użytkownik zarejestrowany! Możesz się zalogować!',
                );
              },
              onError: () => {
                errorAlert('Błąd podczas rejestarcji!');
              },
            });
          }}
        >
          Zarejestruj się!
        </button>

        <button
          className="link-button"
          onClick={() => {
            navigate('/login');
          }}
        >
          {' '}
          Masz już konto? Zaloguj się!
        </button>
      </form>
    </div>
  );
};

