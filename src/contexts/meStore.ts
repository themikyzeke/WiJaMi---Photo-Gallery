import { create } from 'zustand';

export interface UserInfo {
  id: number;
  username: string;
}

export type MeContext = (
  | {
      isLoggedIn: true;
      userInfo: UserInfo;
    }
  | {
      isLoggedIn: false;
      userInfo?: undefined;
    }
) & {
  setUserInfo: (userInfo: UserInfo | undefined) => void;
};

export const useMeContext = create<MeContext>(
  (set: (userInfo: Partial<MeContext>) => void) => ({
    isLoggedIn: false,
    userInfo: undefined,
    setUserInfo: (userInfo: UserInfo | undefined): void => {
      if (!userInfo) {
        set({
          isLoggedIn: false,
          userInfo: undefined,
        });
        console.log('set no user info');
        return;
      }

      set({
        isLoggedIn: true,
        userInfo: userInfo,
      });
    },
  }),
);

