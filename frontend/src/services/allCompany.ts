

import DataService from './dataService';

export default class CompanyService extends DataService {

  getAllCompany = () => {
    return this.get('/company');
  };

  getCompany = (id: any) => {
    return this.get(`/company/${ id }`);
  };

  postCompany = (data: any) => {
    return this.post(`/company/`, data);
  };

  updateCompany = (data: any, id: any) => {
    return this.put(`/company/${ id }`, data);
  };

  deleteCompany = (id: any) => {
    return this.delete(`/company/${ id }`);
  };

}
