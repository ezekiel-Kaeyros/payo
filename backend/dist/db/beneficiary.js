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
exports.deleteBeneficiary = exports.updateBeneficiary = exports.addBeneficiary = exports.getAllBeneficiaries = exports.getBeneficiaryById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getBeneficiaryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const beneficiary = yield models_1.Beneficiary.findOne(query)
        .populate('disbursement_type_id');
    return beneficiary;
});
exports.getBeneficiaryById = getBeneficiaryById;
const getAllBeneficiaries = () => __awaiter(void 0, void 0, void 0, function* () {
    const beneficiarys = models_1.Beneficiary.find({})
        .populate('disbursement_type_id');
    return beneficiarys;
});
exports.getAllBeneficiaries = getAllBeneficiaries;
const addBeneficiary = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const beneficiary = yield models_1.Beneficiary.create(Object.assign({}, data));
    return beneficiary;
});
exports.addBeneficiary = addBeneficiary;
const updateBeneficiary = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const beneficiary = yield models_1.Beneficiary.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return beneficiary;
});
exports.updateBeneficiary = updateBeneficiary;
const deleteBeneficiary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beneficiary = yield models_1.Beneficiary.findByIdAndDelete(id);
    return beneficiary;
});
exports.deleteBeneficiary = deleteBeneficiary;
