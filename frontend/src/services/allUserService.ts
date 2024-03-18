

import DataService from './dataService';

export default class UsersService extends DataService {

  getAllUsers = () => {
    return this.get('/users');
  };

  postUser = (data: any) => {
    return this.post(`/users/`, data);
  };

  getUser = (id: any) => {
    return this.get(`/users/${ id }`);
  };

  updateUser = (data: any, id: any) => {
    return this.put(`/users/${ id }`, data);
  };

  deleteUser = (id: any) => {
    return this.delete(`/users/${ id }`);
  };

}
