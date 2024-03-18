import DataService from './dataService';

export default class SaveDisbursementStatusService extends DataService {

  postQRCodeURLParams = (user_id: any, disbursement_id: any) => {
    // console.log(user_id, disbursement_id, `https://cash-disbursement.onrender.com/qrcode?user_id=${ user_id}&disbursement_id=${ disbursement_id }`)
    // return
    return this.post(`/qrcode?user_id=${ user_id}&disbursement_id=${ disbursement_id }`);
  };

  postDisbursmentStatus = (data: any) => {
    return this.post('/disbursement_Status', data);
  };

  getDisbursmentStatus = () => {
    return this.get('/disbursement_Status');
  };

}