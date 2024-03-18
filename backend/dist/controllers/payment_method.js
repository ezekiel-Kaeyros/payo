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
const PaymentMethodController = {
    getPaymentMethodById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const payment = yield (0, db_1.getPaymentMethodById)(id);
        return res.send(payment);
    }),
    getPaymentsMethod: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const payments = yield (0, db_1.getPaymentsMethod)();
        return res.send(payments);
    }),
    createMethodPayment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const payment = yield (0, db_1.addPaymentMethod)(name);
        return res.send(payment);
    }),
    updatePaymentMethod: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        // console.log("88888888", fieldsToUpdate)
        const payment = yield (0, db_1.updatePaymentMethod)(req.params.id, fieldsToUpdate);
        return res.send(payment);
    }),
    deletePaymentMethod: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Id = req.params.id;
        const payment = yield (0, db_1.deletePaymentMethod)(Id);
        return res.send(payment);
    }),
};
exports.default = PaymentMethodController;
