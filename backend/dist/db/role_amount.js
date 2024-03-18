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
exports.deleteRoleAmount = exports.updateRoleAmount = exports.addRoleAmount = exports.getRolesAmount = exports.getRoleAmountById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getRoleAmountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const roleAmount = yield models_1.RoleAmount.findOne(query);
    return roleAmount;
});
exports.getRoleAmountById = getRoleAmountById;
const getRolesAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const rolesAmount = models_1.RoleAmount.find({});
    return rolesAmount;
});
exports.getRolesAmount = getRolesAmount;
const addRoleAmount = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    const rAmount = yield models_1.RoleAmount.create({
        amount
    });
    return rAmount;
});
exports.addRoleAmount = addRoleAmount;
const updateRoleAmount = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const rAmount = yield models_1.RoleAmount.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return rAmount;
});
exports.updateRoleAmount = updateRoleAmount;
const deleteRoleAmount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rAmount = yield models_1.RoleAmount.findByIdAndDelete(id);
    return rAmount;
});
exports.deleteRoleAmount = deleteRoleAmount;
