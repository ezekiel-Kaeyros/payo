


import DataService from './dataService';

export default class PutSettingsService extends DataService {

  putRolesAmounts = (data: any, id: any) => {
    return this.put(`/rolesamount/${ id }`, data);
  };

  putRoles = (data: any, id: any) => {
    return this.put(`/roles/${ id }`, data);
  };

  putDisbursementTypes = (data: any, id: any) => {
    return this.put(`/disbursement_type/${ id }`, data);
  };

  putDisbursments = (data: any, id: any) => {
    return this.put(`/disbursement/${ id }`, data);
  };

  putDepartments = (data: any, id: any) => {
    return this.put(`/departments/${ id }`, data);
  };

  putOffices = (data: any, id: any) => {
    return this.put(`/offices/${ id }`, data);
  };

  putBeneficiary = (data: any, id: any) => {
    return this.put(`/beneficiary/${ id }`, data);
  };

  putStatusName = (data: any, id: any) => {
    return this.put(`/status_name/${ id}`, data);
  };

  putPaymentMode = (data: any, id: any) => {
    return this.put(`/payment_method/${ id}`, data);
  };

  // UPDATE SERVICES




}
