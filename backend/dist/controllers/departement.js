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
const DepartmentController = {
    department: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const dep = yield (0, db_1.getDepartementById)(id);
        return res.send(dep);
    }),
    getDepartements: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deps = yield (0, db_1.getDepartements)();
        return res.send(deps);
    }),
    createDepartement: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, office_id } = req.body;
        const dep = yield (0, db_1.addDepartement)(name, office_id);
        return res.send(dep);
    }),
    updateDepartment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const dep = yield (0, db_1.updateDepartement)(req.params.id, fieldsToUpdate);
        return res.send(dep);
    }),
    deleteDepartment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const depId = req.params.id;
        const dep = yield (0, db_1.deleteDepartement)(depId);
        return res.send(dep);
    }),
};
exports.default = DepartmentController;
