"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const qrCode = __importStar(require("qrcode"));
const models_1 = require("../models");
const db_1 = require("../db");
const QrcodeController = {
    getComfirmationTemplate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //   const evenLoopDelayHistogram = monitorEventLoopDelay();
        //   evenLoopDelayHistogram.enable()
        // console.log({
        //   min: evenLoopDelayHistogram.min,
        //   max: evenLoopDelayHistogram.max,
        //   mean: evenLoopDelayHistogram.mean,
        //   median: evenLoopDelayHistogram.percentile(50),
        // });
        let query = req.query;
        let status = yield (0, db_1.getStatusNameById)(query === null || query === void 0 ? void 0 : query.status_name_id);
        let disbursement1 = yield (0, db_1.getDisbursementById)(query === null || query === void 0 ? void 0 : query.disbursement_id);
        let initiator = yield (0, db_1.getUserById)(query === null || query === void 0 ? void 0 : query.user_id);
        console.log(initiator === null || initiator === void 0 ? void 0 : initiator.role[0]);
        let roles = initiator === null || initiator === void 0 ? void 0 : initiator.role[0].status_name_id;
        let validation = {};
        let rejection = {};
        roles.forEach((role) => {
            if (role.flag === 1) {
                validation = role;
            }
            if (role.flag === 0) {
                rejection = role;
            }
        });
        return res.render('index', { user: { "name": "cash app" }, validation: validation, rejection: rejection, disbursement: disbursement1, initiator: initiator });
    }),
    cashierConfirmation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const { email, password } = req.body;
        let body = req.body;
        body['app_url'] = 'https://cash-app-dusky.vercel.app/en/decaissements';
        //  {
        //   disbursement_id: '65c48a57da703603f800162b',
        //   status_name_id: '657aebb264009a5d542e8cad',
        //   user_id: '65a13b5cd1ecff00cbe9e941',
        //   app_url: 'https://cash-app-dusky.vercel.app/en/decaissements'
        // }
        let user = yield (0, db_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).render('404', { error: { "message": "Your email and password combination does not match an account" } });
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return res.status(404).render('404', { error: { "message": "Your email and password combination does not match an account" } });
        }
        yield (0, db_1.addDisbursementStatus)(body);
        return res.status(200).render('202');
    }),
    createQrcode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let body = {
            disbursement_id: req.query.disbursement_id,
            user_id: req.query.user_id,
            status_name_id: req.query.status_name_id
        };
        const dStatus = yield models_1.Disbursementstatus.create(Object.assign({}, body));
        const disbursementID = body.disbursement_id;
        const query = { _id: disbursementID };
        const disbursement = yield models_1.Disbursement.findOne(query);
        if (disbursement['disbursement_status_id']) {
            let arr = disbursement['disbursement_status_id'];
            arr.push(req.query.status_name_id);
            yield (0, db_1.updateDisbursement)(body.disbursement_id, { disbursement_status_id: arr });
        }
        else {
            yield (0, db_1.updateDisbursement)(body.disbursement_id, { disbursement_status_id: [dStatus._id] });
        }
        let url = req.hostname + "/template";
        qrCode.toDataURL(url, (err, qrCodeurl) => {
            if (err) {
                return res.status(500).send(err);
            }
            else {
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
    })
};
exports.default = QrcodeController;
