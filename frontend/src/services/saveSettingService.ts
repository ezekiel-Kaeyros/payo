

import DataService from './dataService';

export default class SaveSettingsService extends DataService {

  postRolesAmounts = (data: any) => {
    return this.post('/rolesamount', data);
  };

  postRoles = (data: any) => {
    return this.post('/roles', data);
  };

  postDisbursementTypes = (data: any) => {
    return this.post('/disbursement_type', data);
  };
  
  postDisbursments = (data: any) => {
    return this.post('/disbursement', data);
  };

  postDepartments = (data: any) => {
    return this.post('/departments', data);
  };

  postOffices = (data: any) => {
    return this.post('/offices', data);
  };

  postBeneficiary = (data: any) => {
    return this.post('/beneficiary', data);
  };

  postStatusName = (data: any) => {
    return this.post('/status_name', data);
  };

  postPaymentMode = (data: any) => {
    return this.post('/payment_method', data);
  };


//   forgottenPassword = (data: anydata: any) => {
//     return this.post('/auth/forgottenPassword', data, data);
//   };

}
