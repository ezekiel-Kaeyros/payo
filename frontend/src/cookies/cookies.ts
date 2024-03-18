import cookies from 'js-cookie';
import { USER_DATA } from './cookies.d';

export const setUserCookies = (data: any) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};


// export const GetCookie = () => {
//   return Cookies.get('session');
// };

// export const RemoveCookie = () => {
//   Cookies.remove('session');
// };