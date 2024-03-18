

import DataService from './dataService';

export default class SettingsService extends DataService {

  getRolesAmounts = () => {
    return this.get('/rolesamount');
  };

  getRoles = () => {
    return this.get('/roles');
  };

  getOneRoles = (id: any) => {
    return this.get(`/roles/${ id }`);
  };

  getDisbursementTypes = () => {
    return this.get('/disbursement_type');
  };
  
  getDisbursments = () => {
    return this.get('/disbursement');
  };

  getDepartments = () => {
    return this.get('/departments');
  };

  getOffices = () => {
    return this.get('/offices');
  };

  getOneOffice = (id: any) => {
    return this.get(`/offices/${ id }`);
  };

  getBeneficiary = () => {
    return this.get('/beneficiary');
  };

  getStatusName = () => {
    return this.get('/status_name');
  };

  getPaymentMode = () => {
    return this.get('/payment_method');
  };

  // UPDATE SERVICES


//   forgottenPassword = (data: any) => {
//     return this.post('/auth/forgottenPassword', data);
//   };

}
