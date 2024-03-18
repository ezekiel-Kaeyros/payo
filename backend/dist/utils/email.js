"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailAfterAddDisbursement = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = require("../db");
const sendEmail = (to, subject, body, qrCode = '', isHtml = false) => {
    console.log('send email to=====>', to);
    if (!to) {
        return;
    }
    let transporter = nodemailer_1.default.createTransport({
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
        let html = `<!DOCTYPE html>
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
        let mailOptions = {
            from: 'test@kaeyros-analytics.de',
            to: to,
            subject: subject,
            html: html,
            attachments: [{
                    filename: 'qrcode.png',
                    path: qrCode
                }]
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};
exports.sendEmail = sendEmail;
const sendEmailAfterAddDisbursement = (disbursement_id, body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let host = body.app_url ? body.app_url : '';
    // let status= await getStatusNameById(body.status_name_id);
    let disbursement1 = yield (0, db_1.getDisbursementById)(disbursement_id);
    let invoice_number = disbursement1['invoice_number'] ? disbursement1['invoice_number'] : '';
    const office_id = (_a = disbursement1['initiator'][0]) === null || _a === void 0 ? void 0 : _a.office_id[0]['_id'];
    const office = yield (0, db_1.getOfficeById)(office_id);
    const department_id = disbursement1['initiator'][0]['department_id'][0]['_id'];
    const department = yield (0, db_1.getDepartementById)(department_id);
    const usersDept = yield (0, db_1.getUsersByDepartment)(department_id);
    const chefDepartment = usersDept.filter((user) => user.role[0].level === 2);
    // console.log(chefDepartment);
    // return
    chefDepartment.forEach((chef, index) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log('chief is ====>', chef);
        let messageChefdep = `Bonjour ${chef.first_name}
    \nLa demande de décaissement ${invoice_number} a été initiée par l'agent ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} au bureau ${office.name} 
    \nOuvrez votre tableau de bord ${host} pour plus d'informations.`;
        (0, exports.sendEmail)(chef.email, 'Demande de décaissement', messageChefdep);
    }));
    // send email to financial chief
    let amount = disbursement1['amount'];
    let validatorsList = [];
    const users = yield (0, db_1.getUsers)();
    let objRandom = {};
    users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        if (((_c = user === null || user === void 0 ? void 0 : user.role[0]) === null || _c === void 0 ? void 0 : _c.level) === 1) {
            if (0 < amount && amount <= user['role'][0]['role_amount_id'][0]['amount']) {
                console.log('-------------------');
                console.log(user);
                console.log('amount validator', user['role'][0]['role_amount_id'][0]['amount']);
                console.log('===================', amount);
                if (objRandom['amount']) {
                    if (objRandom['amount'] > user['role'][0]['role_amount_id'][0]['amount']) {
                        objRandom['amount'] = user['role'][0]['role_amount_id'][0]['amount'];
                        objRandom['user'] = user;
                    }
                }
                else {
                    objRandom['amount'] = user['role'][0]['role_amount_id'][0]['amount'];
                    objRandom['user'] = user;
                }
            }
        }
    }));
    if (objRandom['user']) {
        validatorsList.push(objRandom['user']);
    }
    if (validatorsList.length) {
        validatorsList.forEach((validator) => __awaiter(void 0, void 0, void 0, function* () {
            let messageValidateur = `Bonjour ${validator.first_name}.\n
      Une demande de décaissement a été initiée par l'agent ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} au bureau ${office.name}.
      Vous pouvez également valider ce décaissement ou l'annuler. \n
      Ouvrez votre tableau de bord ${host}/ pour plus d'informations.
      MERCI.`;
            (0, exports.sendEmail)(validator.email, 'Demande de décaissement', messageValidateur);
        }));
    }
    // send mail to requester
    let messageRequester = `Bonjour ${disbursement1['initiator'][0].first_name}.\n
  Vous venez d'initier un décaissement Votre chef de service et votre responsable financier doivent vérifier votre décaissement avant validation.
  Veuillez patienter.
  Consultez vos décaissements ${host}/ pour plus d'informations.
  MERCI.`;
    (0, exports.sendEmail)((_b = disbursement1['initiator'][0]) === null || _b === void 0 ? void 0 : _b.email, 'Demande de décaissement', messageRequester);
});
exports.sendEmailAfterAddDisbursement = sendEmailAfterAddDisbursement;
