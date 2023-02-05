import { FC } from 'react';
import { useMeContext } from '../../../contexts/meStore';

export const Greeter: FC = () => {
  const [isLoggedIn, userInfo] = useMeContext((state) => [
    state.isLoggedIn,
    state.userInfo,
  ]);

  return (
    <div className="about">
      <h3>👋 Witaj w galerii{isLoggedIn && ` ${userInfo!.username}`}!</h3>
    </div>
  );
};

