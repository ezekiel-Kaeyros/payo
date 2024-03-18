import DataService from './dataService';

export default class AuthService extends DataService {
  login = (data: any) => {
    return this.post('/login', data);
  };

  register = (data: any, config: any) => {
    return this.post('/auth/register', data);
  };

    changePassword = (data: any) => {
      return this.post('/auth/changePassword', data)
    }

    sendResetPasswordEmail = (data: any) => {
      return this.post('/auth/sendResetPasswordEmail', data)
    }

  forgottenPassword = (data: any) => {
    return this.post('/auth/forgottenPassword', data);
  };

    getProfile = (data: any) => {
      return this.get(`/auth/user/${data}`);
    };

    getUser = (data: any) => {
      return this.get(`/user/${data}`);
    };
}
