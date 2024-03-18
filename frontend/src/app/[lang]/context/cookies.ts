import Cookies from 'js-cookie';

export const SetCookie = (token: string) => {
  let inFifteenMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);

  Cookies.set('token', `${token}`, {
    expires: inFifteenMinutes,
  });
};

export const GetCookie = () => {
  return Cookies.get('token');
};

export const RemoveCookie = () => {
  Cookies.remove('token');
};
