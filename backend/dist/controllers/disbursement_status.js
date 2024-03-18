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
const DisbursementStatusController = {
    disbursementStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const dStatus = yield (0, db_1.getDisbursementStatusById)(id);
        return res.send(dStatus);
    }),
    getDisbursementStatuss: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dStatuss = yield (0, db_1.getDisbursementStatuss)();
        return res.send(dStatuss);
    }),
    createDisbursementStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const dStatus = yield (0, db_1.addDisbursementStatus)(body);
        return res.send(dStatus);
    }),
    updateDisbursementStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const dStatus = yield (0, db_1.updateDisbursementStatus)(req.params.id, fieldsToUpdate);
        return res.send(dStatus);
    }),
    deleteDisbursementStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dStatusId = req.params.id;
        const dStatus = yield (0, db_1.deleteDisbursementStatus)(dStatusId);
        return res.send(dStatus);
    }),
};
exports.default = DisbursementStatusController;
