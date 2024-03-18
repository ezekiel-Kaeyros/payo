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
exports.deleteUserRoleTimestamp = exports.updateUserRoleTimestamp = exports.addUserRoleTimestamp = exports.getAllUserRoleTimestamp = exports.getUserRoleTimestamp = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getUserRoleTimestamp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const user_role_timestamp = yield models_1.UserRoleTimestamp.findOne(query)
        .populate('user_id')
        .populate('user_role');
    return user_role_timestamp;
});
exports.getUserRoleTimestamp = getUserRoleTimestamp;
const getAllUserRoleTimestamp = () => __awaiter(void 0, void 0, void 0, function* () {
    const users_role_timestamps = models_1.UserRoleTimestamp.find({})
        .populate('user_id')
        .populate('user_role');
    return users_role_timestamps;
});
exports.getAllUserRoleTimestamp = getAllUserRoleTimestamp;
const addUserRoleTimestamp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user_role_timestamp = yield models_1.UserRoleTimestamp.create(Object.assign({}, data));
    return user_role_timestamp;
});
exports.addUserRoleTimestamp = addUserRoleTimestamp;
const updateUserRoleTimestamp = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user_role_timestamp = yield models_1.UserRoleTimestamp.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return user_role_timestamp;
});
exports.updateUserRoleTimestamp = updateUserRoleTimestamp;
const deleteUserRoleTimestamp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_role_timestamp = yield models_1.UserRoleTimestamp.findByIdAndDelete(id);
    return user_role_timestamp;
});
exports.deleteUserRoleTimestamp = deleteUserRoleTimestamp;
