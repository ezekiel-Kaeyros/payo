import { Request, Response } from 'express';

import { ErrorCodes} from '../constants';
import * as qrCode from 'qrcode';
import { Disbursement, Disbursementstatus } from '../models';
import { addDisbursementStatus, getDisbursementById, getStatusNameById, getUserByEmail, getUserById, updateDisbursement } from '../db';
import {monitorEventLoopDelay} from 'perf_hooks';
const QrcodeController = {

  getComfirmationTemplate: async (req: Request, res: Response): Promise<any> => {
  //   const evenLoopDelayHistogram = monitorEventLoopDelay();
  //   evenLoopDelayHistogram.enable()
  // console.log({
  //   min: evenLoopDelayHistogram.min,
  //   max: evenLoopDelayHistogram.max,
  //   mean: evenLoopDelayHistogram.mean,
  //   median: evenLoopDelayHistogram.percentile(50),
  // });
  let query: any= req.query
  let status= await getStatusNameById(query?.status_name_id);
  let disbursement1= await getDisbursementById(query?.disbursement_id);
  let initiator= await getUserById(query?.user_id);
  console.log(initiator?.role[0]);
  let roles: any= initiator?.role[0].status_name_id
  let validation: any={}
  let rejection: any={}
  roles.forEach((role: any) => {
    if (role.flag === 1) {
      validation= role
    }
    if (role.flag === 0) {
      rejection= role
    }
    
  });

    return res.render('index',{user: {"name": "cash app"}, validation: validation, rejection: rejection,disbursement: disbursement1, initiator: initiator}) 
  },


  cashierConfirmation: async (req: Request, res: Response): Promise<any> => {
       console.log(req.body);
       const { email, password } = req.body;
       let body= req.body
       body['app_url']= 'https://cash-app-dusky.vercel.app/en/decaissements'

      //  {
      //   disbursement_id: '65c48a57da703603f800162b',
      //   status_name_id: '657aebb264009a5d542e8cad',
      //   user_id: '65a13b5cd1ecff00cbe9e941',
      //   app_url: 'https://cash-app-dusky.vercel.app/en/decaissements'
      // }
      
       
       let user = await getUserByEmail(email);
       if (!user) {
        return res.status(404).render('404',{error: {"message": "Your email and password combination does not match an account"}})
       }
       const validate = await user.isValidPassword(password);
       if (!validate) {
           return res.status(404).render('404',{error: {"message": "Your email and password combination does not match an account"}})
       }
       await addDisbursementStatus(body)
       return res.status(200).render('202') 
  },

  createQrcode: async (req: Request, res: Response): Promise<any> => {

     let body: any= {
      disbursement_id: req.query.disbursement_id,
      user_id: req.query.user_id,
      status_name_id: req.query.status_name_id
     }
    const dStatus= await Disbursementstatus.create({
      ...body
    });
    const disbursementID= body.disbursement_id
    const query = {_id: disbursementID};
    
    const disbursement: any = await Disbursement.findOne(query)
    if (disbursement['disbursement_status_id']) {
      let arr= disbursement['disbursement_status_id']
      arr.push(req.query.status_name_id);
      await updateDisbursement(body.disbursement_id, {disbursement_status_id: arr});
    } else {
      await updateDisbursement(body.disbursement_id, {disbursement_status_id: [dStatus._id]});
    }
  
   
    
    let  url =  req.hostname + "/template";

    qrCode.toDataURL(url, (err: any, qrCodeurl: any) => {
        if (err) {
           return res.status(500).send(err);
        } else {
           return res.status(200).send(`<!DOCTYPE html>
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
        <img src="${qrCodeurl}" alt="qr code">
    </div>
    </div>
    </body>
    </html>`);
     }
    });
  }
};

export default QrcodeController;
