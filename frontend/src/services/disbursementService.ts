

import DataService from './dataService';

export default class SaveDisbursementService extends DataService {

  postDisbursment = (data: any) => {
    return this.post('/disbursement', data);
  };

  getDisbursment = () => {
    return this.get('/disbursement');
  };



}
