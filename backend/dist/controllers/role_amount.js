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
const RoleAmountController = {
    roleAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rAmount = yield (0, db_1.getRoleAmountById)(id);
        return res.send(rAmount);
    }),
    getRolesAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rAmount = yield (0, db_1.getRolesAmount)();
        return res.send(rAmount);
    }),
    createRoleAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { amount } = req.body;
        const rAmount = yield (0, db_1.addRoleAmount)(amount);
        return res.send(rAmount);
    }),
    updateRoleAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const rAmount = yield (0, db_1.updateRoleAmount)(req.params.id, fieldsToUpdate);
        return res.send(rAmount);
    }),
    deleteRoleAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roleId = req.params.id;
        const rAmount = yield (0, db_1.deleteRoleAmount)(roleId);
        return res.send(rAmount);
    }),
};
exports.default = RoleAmountController;
