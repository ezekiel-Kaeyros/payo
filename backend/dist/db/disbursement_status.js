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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDisbursementStatus = exports.updateDisbursementStatus = exports.addDisbursementStatus = exports.getDisbursementStatuss = exports.getDisbursementStatusById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const disbursement_1 = require("./disbursement");
const models_2 = require("../models");
const user_1 = require("./user");
const office_1 = require("./office");
const status_name_1 = require("./status_name");
const email_1 = require("../utils/email");
const departement_1 = require("./departement");
const generate_qrcode_1 = require("../utils/generate_qrcode");
const getDisbursementStatusById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const dStatus = yield models_1.Disbursementstatus.findOne(query)
        .populate('user_id')
        .populate('status_name_id');
    return dStatus;
});
exports.getDisbursementStatusById = getDisbursementStatusById;
const getDisbursementStatuss = () => __awaiter(void 0, void 0, void 0, function* () {
    const dStatuss = models_1.Disbursementstatus.find({})
        .populate('user_id')
        .populate('status_name_id');
    return dStatuss;
});
exports.getDisbursementStatuss = getDisbursementStatuss;
const addDisbursementStatus = (body) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    let host = body.app_url ? body.app_url : '';
    let status = yield (0, status_name_1.getStatusNameById)(body.status_name_id);
    let disbursement1 = yield (0, disbursement_1.getDisbursementById)(body.disbursement_id);
    let invoice_number = disbursement1['invoice_number'] ? disbursement1['invoice_number'] : '';
    const office_id = disbursement1['initiator'][0]['office_id'][0]['_id'];
    const office = yield (0, office_1.getOfficeById)(office_id);
    const department_id = disbursement1['initiator'][0]['department_id'][0]['_id'];
    const department = yield (0, departement_1.getDepartementById)(department_id);
    const usersDept = yield (0, user_1.getUsersByDepartment)(department_id);
    const usersOffice = yield (0, user_1.getUsersByOffice)(office_id);
    let connect_user = yield (0, user_1.getUserById)(body.user_id);
    const chefDepartment = usersDept.filter((user) => user.role[0].level === 2);
    const cashier = usersOffice.filter((user) => { var _a; return ((_a = user === null || user === void 0 ? void 0 : user.role[0]) === null || _a === void 0 ? void 0 : _a.level) === 3; });
    if (((_a = connect_user === null || connect_user === void 0 ? void 0 : connect_user.role[0]) === null || _a === void 0 ? void 0 : _a.level) === 1) { //financial chief make validation
        let messageInitiateur = `Bonjour ${(_b = disbursement1['initiator'][0]) === null || _b === void 0 ? void 0 : _b.first_name}! 
    \nVotre demande décaissement ${invoice_number} a été ${status === null || status === void 0 ? void 0 : status.name} par ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.first_name} ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.last_name} votre responsable financier.
    \nConsultez vos décaissements ${host}/ pour plus d'informations.`;
        (0, email_1.sendEmail)((_c = disbursement1['initiator'][0]) === null || _c === void 0 ? void 0 : _c.email, 'Demande de décaissement', messageInitiateur);
        chefDepartment.forEach((chef, index) => __awaiter(void 0, void 0, void 0, function* () {
            let messageChefdep = `Bonjour ${chef === null || chef === void 0 ? void 0 : chef.first_name}
      \nLa demande de décaissement ${invoice_number} initiée par ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} a été ${status === null || status === void 0 ? void 0 : status.name} par ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.first_name} ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.last_name} au bureau ${office.name} 
      \nOuvrez votre tableau de bord ${host} pour plus d'informations`;
            (0, email_1.sendEmail)(chef === null || chef === void 0 ? void 0 : chef.email, 'Demande de décaissement', messageChefdep);
        }));
        let messageValidateur = `Bonjour ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.first_name}.\n
   Vous avez validé avec succes la demande de décaissement ${invoice_number} effectuée par ${(_d = disbursement1['initiator'][0]) === null || _d === void 0 ? void 0 : _d.first_name} ${(_e = disbursement1['initiator'][0]) === null || _e === void 0 ? void 0 : _e.last_name} au bureau de ${office === null || office === void 0 ? void 0 : office.name}\n 
    Ouvrez votre tableau de bord ${host} pour plus d'informations \n 
    MERCI.`;
        (0, email_1.sendEmail)(connect_user.email, 'Demande de décaissement', messageValidateur);
        let messageCashier = `Bonjour ${(_f = cashier[0]) === null || _f === void 0 ? void 0 : _f.first_name} ${(_g = cashier[0]) === null || _g === void 0 ? void 0 : _g.last_name} \n
    La demande de décaissement ${invoice_number} effectuée par ${(_h = disbursement1['initiator'][0]) === null || _h === void 0 ? void 0 : _h.first_name} ${(_j = disbursement1['initiator'][0]) === null || _j === void 0 ? void 0 : _j.last_name} du bureau de ${office === null || office === void 0 ? void 0 : office.name} été ${status === null || status === void 0 ? void 0 : status.name} par ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.first_name} ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.last_name}, le responsable financier.\n Veuillez effectuer un décaissement d'un montant de ${disbursement1.amount} \n
    Ouvrez votre tableau de bord ${host}/ pour plus d'informations.`;
        (0, email_1.sendEmail)((_k = cashier[0]) === null || _k === void 0 ? void 0 : _k.email, 'Demande de décaissement', messageCashier);
        // return
    }
    if (((_l = connect_user === null || connect_user === void 0 ? void 0 : connect_user.role[0]) === null || _l === void 0 ? void 0 : _l.level) === 2) { //department chief make validation
        // find validators financial and send email
        let amount = disbursement1['amount'];
        let validatorsList = [];
        const users = yield (0, user_1.getUsers)();
        let objRandom = {};
        users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            var _u;
            if (((_u = user === null || user === void 0 ? void 0 : user.role[0]) === null || _u === void 0 ? void 0 : _u.level) === 1) {
                if (0 < amount && amount >= user['role'][0]['role_amount_id'][0]['amount']) {
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
            else {
                console.log('user not level 1', user);
            }
        }));
        if (objRandom['user']) {
            validatorsList.push(objRandom['user']);
        }
        if (validatorsList.length) {
            validatorsList.forEach((validator) => __awaiter(void 0, void 0, void 0, function* () {
                let messageValidateur = `Bonjour ${validator.first_name} ${validator.last_name}.\n
        La demande de décaissement ${invoice_number} effectué par ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name}  au bureau de ${office.name} a été
        ${status.name} par ${connect_user.first_name} ${connect_user.last_name}, chef de service ${department.name}.
        Vous pouvez également valider ce décaissement ou l'annuler en cliquant sur le lien ci-dessous. \n
        ${host}
        MERCI.`;
                (0, email_1.sendEmail)(validator.email, 'Demande de décaissement', messageValidateur);
            }));
        }
        // send email to department chief
        chefDepartment.forEach((chef, index) => __awaiter(void 0, void 0, void 0, function* () {
            var _v, _w;
            let messageChefdep = `Bonjour ${connect_user.first_name}.\n
      Vous venez de ${status.name} la demande de décaissement ${invoice_number} effectué par ${(_v = disbursement1['initiator'][0]) === null || _v === void 0 ? void 0 : _v.first_name} ${(_w = disbursement1['initiator'][0]) === null || _w === void 0 ? void 0 : _w.last_name} au bureau de ${office === null || office === void 0 ? void 0 : office.name}.
      Ouvrez votre tableau de bord ${host} pour plus d'informations.
      
      MERCI.`;
            (0, email_1.sendEmail)(chef === null || chef === void 0 ? void 0 : chef.email, 'Demande de décaissement', messageChefdep);
        }));
        //send email to requester
        let messageInitiateur = `Bonjour ${(_m = disbursement1['initiator'][0]) === null || _m === void 0 ? void 0 : _m.first_name} ${(_o = disbursement1['initiator'][0]) === null || _o === void 0 ? void 0 : _o.last_name}! 
    \nVotre demande de décaissement ${invoice_number} a été ${status === null || status === void 0 ? void 0 : status.name} par ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.first_name} ${connect_user === null || connect_user === void 0 ? void 0 : connect_user.last_name} votre chef de service.
    \nConsultez vos décaissements sur ${host} pour plus d'informations.`;
        (0, email_1.sendEmail)((_p = disbursement1['initiator'][0]) === null || _p === void 0 ? void 0 : _p.email, 'Demande de décaissement', messageInitiateur);
    }
    if (((_q = connect_user === null || connect_user === void 0 ? void 0 : connect_user.role[0]) === null || _q === void 0 ? void 0 : _q.level) === 3) { // cashier make validation 
        let messageInitiateur = `Bonjour ${disbursement1['initiator'][0].first_name}! 
    \nVotre demande de décaissement ${invoice_number} a été ${status.name} par ${connect_user.first_name} ${connect_user.last_name} votre caissier(e).
    \nConsultez vos décaissements sur ${host} pour plus d'informations.
    Veillez presenter votre Qrcode que vous avez recu en piece jointe pour valider le décaissement.
    `;
        let serverUrl = `https://cash-disbursement.onrender.com/template?user_id=${disbursement1['initiator'][0]['_id']}&disbursement_id=${disbursement1['_id']}&status_name_id=${body.status_name_id}`;
        console.log(serverUrl);
        try {
            let html = yield (0, generate_qrcode_1.createQrcode)(serverUrl, messageInitiateur);
            (0, email_1.sendEmail)(disbursement1['initiator'][0].email, 'Demande de décaissement', messageInitiateur, html, true);
        }
        catch (error) {
        }
        // send mail to cashier
        let messageCashier = `Bonjour ${(_r = cashier[0]) === null || _r === void 0 ? void 0 : _r.first_name} \n
    Vous venez de ${status.name} la demande de décaissement ${invoice_number} effectuée par ${disbursement1['initiator'][0].first_name} ${disbursement1['initiator'][0].last_name} du bureau de ${office.name}. \n
    Ouvrez votre tableau de bord sur ${host} pour plus d'informations.`;
        (0, email_1.sendEmail)((_s = cashier[0]) === null || _s === void 0 ? void 0 : _s.email, 'Demande de décaissement', messageCashier);
    }
    if (((_t = connect_user === null || connect_user === void 0 ? void 0 : connect_user.role[0]) === null || _t === void 0 ? void 0 : _t.level) === 4) { //initiator make validation
        // send email to department chief
        chefDepartment.forEach((chef, index) => __awaiter(void 0, void 0, void 0, function* () {
            var _x, _y;
            let messageChefdep = `Bonjour \n ${chef.first_name} ${chef.last_name}.\n
      ${connect_user.first_name} ${connect_user.last_name} a recu le montant de ${disbursement1['amount']} de la demande de decaissement ${invoice_number} de la part de ${(_x = cashier[0]) === null || _x === void 0 ? void 0 : _x.first_name} ${(_y = cashier[0]) === null || _y === void 0 ? void 0 : _y.last_name}, caissier(e) \n
      Ouvrez votre tableau de bord ${host} pour plus d'informations.
      
      MERCI.`;
            (0, email_1.sendEmail)(chef === null || chef === void 0 ? void 0 : chef.email, 'Demande de décaissement', messageChefdep);
        }));
    }
    const dStatus = yield models_1.Disbursementstatus.create(Object.assign({}, body));
    const disbursementID = body.disbursement_id;
    const query = { _id: disbursementID };
    let reason = '';
    if (body.reason) {
        reason = body.reason;
    }
    const disbursement = yield models_2.Disbursement.findOne(query);
    if (disbursement['disbursement_status_id']) {
        let arr = disbursement['disbursement_status_id'];
        arr.push(dStatus._id);
        yield (0, disbursement_1.updateDisbursement)(disbursementID, { disbursement_status_id: arr, reason: reason });
    }
    else {
        yield (0, disbursement_1.updateDisbursement)(disbursementID, { disbursement_status_id: [dStatus._id], reason: reason });
    }
    const newdisbursement = yield models_2.Disbursement.findOne(query)
        .populate('beneficiary_id')
        .populate('disbursement_status_id')
        .populate({
        path: 'disbursement_status_id',
        populate: [{ path: 'status_name_id' }, { path: 'user_id', populate: [{ path: 'role', populate: [{ path: 'status_name_id' }] }] }],
    })
        .populate('disbursement_current_status')
        .populate('payment_method_id')
        .populate({
        path: 'initiator',
        populate: [{ path: 'role', populate: [{ path: 'role_amount_id' }] }, { path: 'department_id' }, { path: 'role.role_amount_id' }],
    });
    return newdisbursement;
});
exports.addDisbursementStatus = addDisbursementStatus;
const updateDisbursementStatus = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const dStatus = yield models_1.Disbursementstatus.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return dStatus;
});
exports.updateDisbursementStatus = updateDisbursementStatus;
const deleteDisbursementStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const dStatus = yield models_1.Disbursementstatus.findByIdAndDelete(id);
    return dStatus;
});
exports.deleteDisbursementStatus = deleteDisbursementStatus;
