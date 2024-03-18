// @ts-nocheck
import {Disbursement} from '../models';
import { IDisbursement } from '../models/disbursement';
import { sendEmailAfterAddDisbursement } from '../utils/email';



export const getDisbursementById = async (id: string): Promise<IDisbursement> => {
  const query = { _id: id };

  const disbursement = await Disbursement.findOne(query)
  .populate('beneficiary_id')
  .populate('disbursement_status_id')
  .populate({
    path: 'disbursement_status_id',
    populate: [{ path: 'status_name_id' },{path: 'user_id',populate: [{ path: 'role', populate: [{ path: 'status_name_id' }]}]}],
  })
  .populate('disbursement_current_status')
  .populate('payment_method_id')
  .populate({
    path: 'initiator',
   populate: [{ path: 'role', populate: [{ path: 'role_amount_id' }]}, { path: 'department_id' }, { path: 'role.role_amount_id' }],
  })
  return disbursement;
};

export const getAllDisbursement = async (user): Promise<IDisbursement[]> => {
  let office_id= user?.office_id[0]['_id']
  let department_id= user?.department_id[0]['_id']
  
  let level: any= user?.role[0]?.level
  console.log(office_id);
  console.log(level);
  let filter= {}
  if (level == 4) {
    filter= {user_department: department_id, user_office: office_id, initiator: user._id}
  }

  if (level == 3) {
    filter= {user_office: office_id}
  }

  if (level == 2) {
    filter= {user_department: department_id, user_office: office_id}
  }
    
  
  
  // return
  
      const disbursements = Disbursement.find(filter)
      .populate('beneficiary_id')
      .populate('disbursement_status_id')
      // .populate('office_id')
      .populate({
        path: 'disbursement_status_id',
        populate: [{ path: 'status_name_id' },{path: 'user_id',populate: [{ path: 'role', populate: [{ path: 'status_name_id' }]}]}],
      })
      .populate('disbursement_current_status')
      .populate('payment_method_id')
      .populate({
        path: 'initiator',
      populate: [{ path: 'role', populate: [{ path: 'role_amount_id' }]}, { path: 'department_id' }, { path: 'role.role_amount_id' }],
      })
      return disbursements
    };

export const addDisbursement = async (body: IDisbursement, user) => {
  let user_office= user?.office_id[0]['_id']
  let user_department= user?.department_id[0]['_id']
  body.user_office= user_office
  body.user_department= user_department

  const disbursement = await Disbursement.create({...body});
  sendEmailAfterAddDisbursement(disbursement._id, body)
  return disbursement;
};

export const updateDisbursement = async (id: string, body: any): Promise<IOffice> => {
  const disbursement = await Disbursement.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return disbursement;
};

export const deleteDisbursement = async (id: string): Promise<any> => {
  const disbursement = await Disbursement.findByIdAndDelete(id);
  return disbursement;
};
