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
const StatusNameController = {
    getStatusNameById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const statusname = yield (0, db_1.getStatusNameById)(id);
        return res.send(statusname);
    }),
    getStatusNames: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const statusnames = yield (0, db_1.getStatusNames)();
        return res.send(statusnames);
    }),
    createStatusName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const { name } = req.body;
        const statusname = yield (0, db_1.addStatusName)(req.body);
        return res.send(statusname);
    }),
    updateStatusName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const statusname = yield (0, db_1.updateStatusName)(req.params.id, fieldsToUpdate);
        return res.send(statusname);
    }),
    deleteStatusName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Id = req.params.id;
        const statusname = yield (0, db_1.deleteStatusName)(Id);
        return res.send(statusname);
    }),
};
exports.default = StatusNameController;
