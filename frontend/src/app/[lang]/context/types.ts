export type LoginParams = {
  email: string;
  password: string;
  remember?: boolean;
};

export type UserDataType = {
  message: string;
  id: number;
  email: string;
  username: string;
  isActive: boolean;
  password: string;
  role: number;
};

export type AuthValuesType = {
  loading: boolean;
  logout: () => void;
  setUser: (value: UserDataType | null) => void;
  user: UserDataType | null;
  setLoading: (value: UserDataType | null) => void;
  login: (params: LoginParams) => void;
};

export type ErrCallbackType = (err: { [key: string]: string }) => void;
