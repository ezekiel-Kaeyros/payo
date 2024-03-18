import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  AuthValuesType,
  ErrCallbackType,
  LoginParams,
  UserDataType,
} from './types';
import { useRouter } from 'next/router';
import {
  getUserCookies,
  removeUserCookies,
  setUserCookies,
} from '@/cookies/cookies';
import AuthService from '@/services/authService';
import { AxiosResponse } from 'axios';

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setLoading: () => Boolean,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const userData: UserDataType = await getUserCookies();
      if (userData) {
        setUser({ ...userData });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    new AuthService()
      .login(params)
      .then(async (response: AxiosResponse<UserDataType, any>) => {
        setLoading(false);

        const { data, status } = response as AxiosResponse<UserDataType, any>;
        if (status === 200) {
          const returnUrl = router.query.returnUrl;
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';

          // Found users and setting parameters into cookies

          setUserCookies({ ...data, remember: params?.remember });
        } else {
          if (errorCallback) errorCallback({ message: data.message || '' });
        }
      })
      .catch((error: any) => {
        if (errorCallback) errorCallback(error);
      });
  };

  // Logout

  const handleLogout = () => {
    removeUserCookies();
    setUser(null);
    router.push('/login');
  };

  const values: any = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
