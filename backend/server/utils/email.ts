import nodemailer from 'nodemailer';
import { getDepartementById, getDisbursementById, getOfficeById, getUserById, getUsers, getUsersByDepartment } from '../db';
export const sendEmail = (to:any, subject:any, body:any, qrCode='', isHtml= false) => {
  console.log('send email to=====>', to);
  if (!to) {
    return
    
  }
  
  let transporter = nodemailer.createTransport({
  host: 'smtp.ionos.de', // smtp.ionos.de // entering here the right hostprovider
  service: 'ionos',  
  secure: false,
  auth: {
      user: "test@kaeyros-analytics.de",
      pass: "@@Test$$",
  },
  });
  
  let mailOptions = {
    from: 'test@kaeyros-analytics.de',
    to: to,
    subject: subject,
    text: body
  };

  if (isHtml) {
    let html= `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> Qrcode </title>
            <script src="https://cdn.tailwindcss.com/3.4.1"></script>
        <style>
    /* Styles CSS ici */
    body {
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }
   
    h1 {
      color: blue;
      padding: 50px;
   
    }
   
    img {
      width: 300px;
      height: auto;
    }
   
   
  </style>
    </head>
    <body>
        
        <div class="centrer">
        <div class=" flex items-start flex justify-center items-center h-screen flex-col ">
        <h1 class= "text-3xl">Scanner le QR Code pour confirmer le decaissements</h1>
        <div style='width: 250px; height: 250px'>
        ${body}
        </div>
      </div>
      </div>
    </body>
    </html>`;
   let  mailOptions = {
      from: 'test@kaeyros-analytics.de',
      to: to,
      subject: subject,
      html: html,
      attachments: [{
        filename: 'qrcode.png',
        path: qrCode
    }]
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }else{
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  

};

export const sendEmailAfterAddDisbursement = async (disbursement_id: string, body: any) => {
  let host= body.app_url ? body.app_url : '';
  // let status= await getStatusNameById(body.status_name_id);
  let disbursement1= await getDisbursementById(disbursement_id);
  let invoice_number= disbursement1['invoice_number'] ? disbursement1['invoice_number'] : ''
  const office_id= disbursement1['initiator'][0]?.office_id[0]['_id']
  const office= await getOfficeById(office_id);
  const department_id= disbursement1['initiator'][0]['department_id'][0]['_id']
  const department= await getDepartementById(department_id);
  const usersDept= await getUsersByDepartment(department_id);
  const chefDepartment= usersDept.filter((user)=> user.role[0].level === 2);
  // console.log(chefDepartment);
  // return

  chefDepartment.forEach(async (chef: any, index)=>{
    // console.log('chief is ====>', chef);
    
    let messageChefdep = `Bonjour ${chef.first_name}
    \nLa demande de décaissement ${ invoice_number } a été initiée par l'agent ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} au bureau ${office.name } 
    \nOuvrez votre tableau de bord ${ host } pour plus d'informations.`;
    sendEmail(chef.email, 'Demande de décaissement', messageChefdep)
  })

 

  // send email to financial chief

  let amount= disbursement1['amount'];
  let validatorsList: any= [];
  const users= await getUsers();
    let objRandom:any={}
    users.forEach(async (user)=>{
      if (user?.role[0]?.level === 1) {
       
        if (0 <amount && amount <= user['role'][0]['role_amount_id'][0]['amount']) {
          console.log('-------------------');
        
          console.log(user);
          console.log('amount validator', user['role'][0]['role_amount_id'][0]['amount']);
          console.log('===================', amount);
          if (objRandom['amount']) {
            if (objRandom['amount'] >  user['role'][0]['role_amount_id'][0]['amount']) {
              objRandom['amount']= user['role'][0]['role_amount_id'][0]['amount']
              objRandom['user']= user
            }
          }else{
            objRandom['amount']= user['role'][0]['role_amount_id'][0]['amount']
            objRandom['user']= user
          }
          
        }
      }
    })

    if (objRandom['user']) {
      validatorsList.push(objRandom['user'])
    }
  if (validatorsList.length) {
    validatorsList.forEach(async (validator: any)=>{
      let messageValidateur = `Bonjour ${validator.first_name}.\n
      Une demande de décaissement a été initiée par l'agent ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} au bureau ${office.name}.
      Vous pouvez également valider ce décaissement ou l'annuler. \n
      Ouvrez votre tableau de bord ${ host}/ pour plus d'informations.
      MERCI.`;
      sendEmail(validator.email, 'Demande de décaissement', messageValidateur)
    })
  }

  // send mail to requester

  let messageRequester = `Bonjour ${disbursement1['initiator'][0].first_name}.\n
  Vous venez d'initier un décaissement Votre chef de service et votre responsable financier doivent vérifier votre décaissement avant validation.
  Veuillez patienter.
  Consultez vos décaissements ${ host}/ pour plus d'informations.
  MERCI.`

  sendEmail(disbursement1['initiator'][0]?.email, 'Demande de décaissement', messageRequester)

}