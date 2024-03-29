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
const db_1 = require("../db");
const DisbursementController = {
    getOneDisbursement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const disbursement = yield (0, db_1.getDisbursementById)(id);
        return res.send(disbursement);
    }),
    getAllDisbursement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const disbursements = yield (0, db_1.getAllDisbursement)(req.user);
        console.log('all', disbursements.length);
        return res.send(disbursements);
    }),
    createDisbursement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const disbursement = yield (0, db_1.addDisbursement)(req.body, req.user);
        return res.send(disbursement);
    }),
    updateDisbursement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const disbursement = yield (0, db_1.updateDisbursement)(req.params.id, fieldsToUpdate);
        return res.send(disbursement);
    }),
    deleteDisbursement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const disbursement = yield (0, db_1.deleteDisbursement)(req.params.id);
        return res.send(disbursement);
    }),
};
exports.default = DisbursementController;
