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
exports.deleteRole = exports.updateRole = exports.addRoleUser = exports.getRoles = exports.getRoleById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const role = yield models_1.Role.findOne(query)
        .populate('role_amount_id')
        .populate('status_name_id')
        .populate('user');
    return role;
});
exports.getRoleById = getRoleById;
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = models_1.Role.find({})
        .populate('role_amount_id')
        .populate('status_name_id')
        .populate('user');
    return roles;
});
exports.getRoles = getRoles;
const addRoleUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield models_1.Role.create(Object.assign({}, body));
    return role;
});
exports.addRoleUser = addRoleUser;
const updateRole = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Role.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    const query = { _id: id };
    const role = yield models_1.Role.findOne(query)
        .populate('role_amount_id')
        .populate('status_name_id')
        .populate('user');
    return role;
});
exports.updateRole = updateRole;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield models_1.Role.findByIdAndDelete(id);
    return role;
});
exports.deleteRole = deleteRole;
