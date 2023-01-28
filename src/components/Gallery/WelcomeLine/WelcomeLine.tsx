import { FC } from 'react';
import { useMeContext } from '../../../contexts/meStore';

export const WelcomeLine: FC = () => {
  const [isLoggedIn, userInfo] = useMeContext((state) => [
    state.isLoggedIn,
    state.userInfo,
  ]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="about">
      <h3>👋 Cześć {userInfo!.username}!</h3>
      <h4>Galeria zdjęć</h4>
    </div>
  );
};

