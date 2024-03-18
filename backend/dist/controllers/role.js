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
const RoleController = {
    role: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const role = yield (0, db_1.getRoleById)(id);
        return res.send(role);
    }),
    getRoles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roles = yield (0, db_1.getRoles)();
        return res.send(roles);
    }),
    createRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const role = yield (0, db_1.addRoleUser)(req.body);
        return res.send(role);
    }),
    updateRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const role = yield (0, db_1.updateRole)(req.params.id, fieldsToUpdate);
        return res.send(role);
    }),
    deleteRole: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const roleId = req.params.id;
        const role = yield (0, db_1.deleteRole)(roleId);
        return res.send(role);
    }),
};
exports.default = RoleController;
