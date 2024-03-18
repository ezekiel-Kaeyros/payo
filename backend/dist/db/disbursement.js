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
exports.deleteDisbursement = exports.updateDisbursement = exports.addDisbursement = exports.getAllDisbursement = exports.getDisbursementById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const email_1 = require("../utils/email");
const getDisbursementById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const disbursement = yield models_1.Disbursement.findOne(query)
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
    return disbursement;
});
exports.getDisbursementById = getDisbursementById;
const getAllDisbursement = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let office_id = user === null || user === void 0 ? void 0 : user.office_id[0]['_id'];
    let department_id = user === null || user === void 0 ? void 0 : user.department_id[0]['_id'];
    let level = (_a = user === null || user === void 0 ? void 0 : user.role[0]) === null || _a === void 0 ? void 0 : _a.level;
    console.log(office_id);
    console.log(level);
    let filter = {};
    if (level == 4) {
        filter = { user_department: department_id, user_office: office_id, initiator: user._id };
    }
    if (level == 3) {
        filter = { user_office: office_id };
    }
    if (level == 2) {
        filter = { user_department: department_id, user_office: office_id };
    }
    // return
    const disbursements = models_1.Disbursement.find(filter)
        .populate('beneficiary_id')
        .populate('disbursement_status_id')
        // .populate('office_id')
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
    return disbursements;
});
exports.getAllDisbursement = getAllDisbursement;
const addDisbursement = (body, user) => __awaiter(void 0, void 0, void 0, function* () {
    let user_office = user === null || user === void 0 ? void 0 : user.office_id[0]['_id'];
    let user_department = user === null || user === void 0 ? void 0 : user.department_id[0]['_id'];
    body.user_office = user_office;
    body.user_department = user_department;
    const disbursement = yield models_1.Disbursement.create(Object.assign({}, body));
    (0, email_1.sendEmailAfterAddDisbursement)(disbursement._id, body);
    return disbursement;
});
exports.addDisbursement = addDisbursement;
const updateDisbursement = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const disbursement = yield models_1.Disbursement.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return disbursement;
});
exports.updateDisbursement = updateDisbursement;
const deleteDisbursement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const disbursement = yield models_1.Disbursement.findByIdAndDelete(id);
    return disbursement;
});
exports.deleteDisbursement = deleteDisbursement;
