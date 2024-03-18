

import DataService from './dataService';

export default class StatusNameService extends DataService {

  getAllStatusName = () => {
    return this.get('/status_name');
  };

  getOneStatusName = (id: any) => {
    return this.post(`/users/${ id }`);
  };

  // getUser = (id: any) => {
  //   return this.get(`/users/${ id }`);
  // };

  // updateUser = (data: any, id: any) => {
  //   return this.put(`/users/${ id }`, data);
  // };

  // deleteUser = (id: any) => {
  //   return this.delete(`/users/${ id }`);
  // };
  

}
