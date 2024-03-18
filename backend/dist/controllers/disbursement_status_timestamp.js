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
const DisbursementStatusTimeStampController = {
    disbursementStatusTimeStamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const dStatus = yield (0, db_1.getDisbursementStatusTimestampById)(id);
        return res.send(dStatus);
    }),
    getDisbursementStatusTimeStamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dStatuss = yield (0, db_1.getDisbursementStatusTimestamp)();
        return res.send(dStatuss);
    }),
    createDisbursementStatusTimeStamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const dStatus = yield (0, db_1.addDisbursementStatusTimestamp)(body);
        return res.send(dStatus);
    }),
    updateDisbursementStatusTimeStamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const dStatus = yield (0, db_1.updateDisbursementStatusTimestamp)(req.params.id, fieldsToUpdate);
        return res.send(dStatus);
    }),
    deleteDisbursementStatusTimeStamp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dStatusId = req.params.id;
        const dStatus = yield (0, db_1.deleteDisbursementStatusTimestamp)(dStatusId);
        return res.send(dStatus);
    }),
};
exports.default = DisbursementStatusTimeStampController;
