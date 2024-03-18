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
exports.deletePaymentMethod = exports.updatePaymentMethod = exports.addPaymentMethod = exports.getPaymentsMethod = exports.getPaymentMethodById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getPaymentMethodById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const paymentM = yield models_1.PaymentMethod.findOne(query);
    return paymentM;
});
exports.getPaymentMethodById = getPaymentMethodById;
const getPaymentsMethod = () => __awaiter(void 0, void 0, void 0, function* () {
    const payments = models_1.PaymentMethod.find({});
    return payments;
});
exports.getPaymentsMethod = getPaymentsMethod;
const addPaymentMethod = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield models_1.PaymentMethod.create({
        name
    });
    return payment;
});
exports.addPaymentMethod = addPaymentMethod;
const updatePaymentMethod = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield models_1.PaymentMethod.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return payment;
});
exports.updatePaymentMethod = updatePaymentMethod;
const deletePaymentMethod = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield models_1.PaymentMethod.findByIdAndDelete(id);
    return payment;
});
exports.deletePaymentMethod = deletePaymentMethod;
