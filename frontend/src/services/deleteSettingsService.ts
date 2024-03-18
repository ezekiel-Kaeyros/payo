


import DataService from './dataService';

export default class DeleteSettingsService extends DataService {

  deleteRolesAmounts = (id: any) => {
    return this.delete(`/rolesamount/${ id }`);
  };

  deleteRoles = (id: any) => {
    return this.delete(`/roles/${ id }`);
  };

  deleteDisbursementTypes = (id: any) => {
    return this.delete(`/disbursement_type/${ id }`);
  };
  
  deleteDisbursments = (id: any) => {
    return this.delete(`/disbursement/${ id }`);
  };

  deleteDepartments = (id: any) => {
    return this.delete(`/departments/${ id }`);
  };

  deleteOffices = (id: any) => {
    return this.delete(`/offices/${ id }`);
  };

  deleteBeneficiary = (id: any) => {
    return this.delete(`/beneficiary/${ id }`);
  };

  deleteStatusName = (id: any) => {
    return this.delete(`/status_name/${ id}`);
  };

  deletePaymentMode = (id: any) => {
    return this.delete(`/payment_method/${ id}`);
  };

  // UPDATE SERVICES


//   forgottenPassword = (data: any) => {
//     return this.post('/auth/forgottenPassword', data);
//   };

}
