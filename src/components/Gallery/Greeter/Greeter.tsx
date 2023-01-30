import { FC } from 'react';
import { useMeContext } from '../../../contexts/meStore';

export const Greeter: FC = () => {
  const [isLoggedIn, userInfo] = useMeContext((state) => [
    state.isLoggedIn,
    state.userInfo,
  ]);

  return (
    <div className="about">
      {isLoggedIn && <h3>👋 Cześć {userInfo!.username}!</h3>}
      <h4>Galeria zdjęć</h4>
    </div>
  );
};

