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
const UserRoleTimestampController = {
    getUserRoleTimestamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user_role_timestamp = yield (0, db_1.getUserRoleTimestamp)(id);
        return res.send(user_role_timestamp);
    }),
    getAllUserRoleTimestamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users_roles_timestamp = yield (0, db_1.getAllUserRoleTimestamp)();
        return res.send(users_roles_timestamp);
    }),
    createUserRoleTimestamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user_role_timestamp = yield (0, db_1.addUserRoleTimestamp)(Object.assign({}, req.body));
        return res.send(user_role_timestamp);
    }),
    updateUserRoleTimestamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const user_role_timestamp = yield (0, db_1.updateUserRoleTimestamp)(req.params.id, fieldsToUpdate);
        return res.send(user_role_timestamp);
    }),
    deleteUserRoleTimestamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const user_role_timestamp = yield (0, db_1.deleteUserRoleTimestamp)(id);
        return res.send(user_role_timestamp);
    }),
};
exports.default = UserRoleTimestampController;
