// @ts-nocheck
import {Disbursementstatus} from '../models';
import {updateDisbursement, getDisbursementById} from './disbursement';
import { IDisbursementStatus } from '../models/disbursement_status';
import {Disbursement} from '../models';
import { getUserById, getUsers, getUsersByDepartment, getUsersByOffice } from './user';
import { getOfficeById } from './office';
import { getStatusNameById } from './status_name';
import { sendEmail } from '../utils/email';
import { getDepartementById } from './departement';
import { createQrcode } from '../utils/generate_qrcode';


export const getDisbursementStatusById = async (id: string): Promise<IDisbursementStatus> => {
  const query = { _id: id };
  const dStatus = await Disbursementstatus.findOne(query)
  .populate('user_id')
  .populate('status_name_id')
  return dStatus;
};

export const getDisbursementStatuss = async (): Promise<IDisbursementStatus[]> => {
      const dStatuss = Disbursementstatus.find({})
      .populate('user_id')
      .populate('status_name_id')
      return dStatuss;
    };

export const addDisbursementStatus = async (
  body: IDisbursementStatus
) => {
  let host= body.app_url ? body.app_url : '';
  let status= await getStatusNameById(body.status_name_id);
  let disbursement1= await getDisbursementById(body.disbursement_id);
  let invoice_number= disbursement1['invoice_number'] ? disbursement1['invoice_number'] : ''
  const office_id= disbursement1['initiator'][0]['office_id'][0]['_id']
  const office= await getOfficeById(office_id);
  
  const department_id= disbursement1['initiator'][0]['department_id'][0]['_id']
  const department= await getDepartementById(department_id);
  const usersDept= await getUsersByDepartment(department_id);
  const usersOffice= await getUsersByOffice(office_id);
  let connect_user= await getUserById(body.user_id);
  const chefDepartment= usersDept.filter((user)=> user.role[0].level === 2);
 
  
  const cashier= usersOffice.filter((user)=> user?.role[0]?.level === 3);
  
   

  if (connect_user?.role[0]?.level === 1) { //financial chief make validation
   let messageInitiateur = `Bonjour ${disbursement1['initiator'][0]?.first_name}! 
    \nVotre demande décaissement ${ invoice_number } a été ${status?.name} par ${connect_user?.first_name} ${connect_user?.last_name} votre responsable financier.
    \nConsultez vos décaissements ${ host }/ pour plus d'informations.`;
    
    sendEmail(disbursement1['initiator'][0]?.email, 'Demande de décaissement', messageInitiateur)

    chefDepartment.forEach(async (chef: any, index)=>{
      let messageChefdep = `Bonjour ${chef?.first_name}
      \nLa demande de décaissement ${ invoice_number } initiée par ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} a été ${status?.name} par ${connect_user?.first_name} ${connect_user?.last_name} au bureau ${office.name } 
      \nOuvrez votre tableau de bord ${ host } pour plus d'informations`;
      sendEmail(chef?.email, 'Demande de décaissement', messageChefdep)
    })
    
   let messageValidateur = `Bonjour ${connect_user?.first_name}.\n
   Vous avez validé avec succes la demande de décaissement ${ invoice_number } effectuée par ${disbursement1['initiator'][0]?.first_name} ${disbursement1['initiator'][0]?.last_name} au bureau de ${ office?.name }\n 
    Ouvrez votre tableau de bord ${ host } pour plus d'informations \n 
    MERCI.`;
    sendEmail(connect_user.email, 'Demande de décaissement', messageValidateur)
   let messageCashier = `Bonjour ${ cashier[0]?.first_name } ${ cashier[0]?.last_name } \n
    La demande de décaissement ${ invoice_number } effectuée par ${disbursement1['initiator'][0]?.first_name } ${disbursement1['initiator'][0]?.last_name } du bureau de ${  office?.name } été ${status?.name} par ${ connect_user?.first_name } ${ connect_user?.last_name }, le responsable financier.\n Veuillez effectuer un décaissement d'un montant de ${ disbursement1.amount } \n
    Ouvrez votre tableau de bord ${ host}/ pour plus d'informations.`;
    sendEmail(cashier[0]?.email, 'Demande de décaissement', messageCashier)
    // return
  }
  
  if (connect_user?.role[0]?.level === 2) { //department chief make validation
    // find validators financial and send email
    let amount= disbursement1['amount'];
    let validatorsList= [];
    const users= await getUsers();
    let objRandom: any={}
    users.forEach(async (user)=>{
      if (user?.role[0]?.level === 1) {
        if (0 < amount && amount >= user['role'][0]['role_amount_id'][0]['amount']) {
          if (objRandom['amount']) {
            if (objRandom['amount']  > user['role'][0]['role_amount_id'][0]['amount']) {
              objRandom['amount']= user['role'][0]['role_amount_id'][0]['amount']
              objRandom['user']= user
            }
          }else{
            objRandom['amount']= user['role'][0]['role_amount_id'][0]['amount']
            objRandom['user']= user
          }
          
        }
      }else{
        console.log('user not level 1', user);
      }
    })

    if (objRandom['user']) {
      validatorsList.push(objRandom['user'])
    }
    if (validatorsList.length) {
      validatorsList.forEach(async (validator)=>{
        let messageValidateur = `Bonjour ${validator.first_name} ${validator.last_name}.\n
        La demande de décaissement ${ invoice_number } effectué par ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name}  au bureau de ${office.name} a été
        ${status.name} par ${connect_user.first_name} ${connect_user.last_name}, chef de service ${department.name}.
        Vous pouvez également valider ce décaissement ou l'annuler en cliquant sur le lien ci-dessous. \n
        ${ host }
        MERCI.`;
        sendEmail(validator.email, 'Demande de décaissement', messageValidateur)
      })
    }
    // send email to department chief
    chefDepartment.forEach(async (chef: any, index)=>{
      let messageChefdep = `Bonjour ${connect_user.first_name}.\n
      Vous venez de ${status.name} la demande de décaissement ${ invoice_number } effectué par ${disbursement1['initiator'][0]?.first_name} ${disbursement1['initiator'][0]?.last_name} au bureau de ${office?.name}.
      Ouvrez votre tableau de bord ${host} pour plus d'informations.
      
      MERCI.`;
     sendEmail(chef?.email, 'Demande de décaissement', messageChefdep)
    })
   

    //send email to requester
    let messageInitiateur = `Bonjour ${disbursement1['initiator'][0]?.first_name} ${disbursement1['initiator'][0]?.last_name}! 
    \nVotre demande de décaissement ${ invoice_number } a été ${status?.name} par ${connect_user?.first_name} ${connect_user?.last_name} votre chef de service.
    \nConsultez vos décaissements sur ${ host } pour plus d'informations.`;
    sendEmail(disbursement1['initiator'][0]?.email, 'Demande de décaissement', messageInitiateur)

    
  }
 
  
  if (connect_user?.role[0]?.level === 3) { // cashier make validation 
    let messageInitiateur = `Bonjour ${disbursement1['initiator'][0].first_name}! 
    \nVotre demande de décaissement ${ invoice_number } a été ${status.name} par ${connect_user.first_name} ${connect_user.last_name} votre caissier(e).
    \nConsultez vos décaissements sur ${ host } pour plus d'informations.
    Veillez presenter votre Qrcode que vous avez recu en piece jointe pour valider le décaissement.
    `;
    let serverUrl= `https://cash-disbursement.onrender.com/template?user_id=${disbursement1['initiator'][0]['_id']}&disbursement_id=${disbursement1['_id']}&status_name_id=${body.status_name_id}`
    console.log(serverUrl);
    
   try {
    let html= await createQrcode(serverUrl,messageInitiateur)
    sendEmail(disbursement1['initiator'][0].email, 'Demande de décaissement',messageInitiateur, html, true)
   } catch (error) {
    
   }
    // send mail to cashier
    let messageCashier = `Bonjour ${ cashier[0]?.first_name } \n
    Vous venez de ${status.name} la demande de décaissement ${ invoice_number } effectuée par ${disbursement1['initiator'][0].first_name } ${disbursement1['initiator'][0].last_name } du bureau de ${  office.name }. \n
    Ouvrez votre tableau de bord sur ${ host} pour plus d'informations.`;
    sendEmail(cashier[0]?.email, 'Demande de décaissement', messageCashier)
  }
  if (connect_user?.role[0]?.level === 4) { //initiator make validation
     // send email to department chief
     chefDepartment.forEach(async (chef: any, index)=>{
      let messageChefdep = `Bonjour \n ${chef.first_name} ${chef.last_name}.\n
      ${connect_user.first_name} ${connect_user.last_name} a recu le montant de ${disbursement1['amount']} de la demande de decaissement ${ invoice_number } de la part de ${ cashier[0]?.first_name } ${ cashier[0]?.last_name }, caissier(e) \n
      Ouvrez votre tableau de bord ${host} pour plus d'informations.
      
      MERCI.`;
     sendEmail(chef?.email, 'Demande de décaissement', messageChefdep)
     })
  }
  
  const dStatus= await Disbursementstatus.create({
    ...body
  });
  const disbursementID= body.disbursement_id
  const query = {_id: disbursementID};
  let reason= ''
  if (body.reason) {
    reason= body.reason
    
  }
  const disbursement = await Disbursement.findOne(query)
  if (disbursement['disbursement_status_id']) {
    let arr= disbursement['disbursement_status_id']
    arr.push(dStatus._id);
    await updateDisbursement(disbursementID, {disbursement_status_id: arr, reason: reason});
  } else {
    await updateDisbursement(disbursementID, {disbursement_status_id: [dStatus._id], reason: reason});
  }

  const newdisbursement = await Disbursement.findOne(query)
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
  return newdisbursement;
};

export const updateDisbursementStatus = async (id: string, body: IDisbursementStatus): Promise<IDisbursementStatus> => {
  const dStatus = await Disbursementstatus.findOneAndUpdate({ _id: id }, {...body}, { new: true })
  return dStatus;
};

export const deleteDisbursementStatus = async (id: string): Promise<any> => {
  const dStatus = await Disbursementstatus.findByIdAndDelete(id);
  return dStatus;
};
