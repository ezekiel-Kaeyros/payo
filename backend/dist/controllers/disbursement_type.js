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
const DisbursementTypeController = {
    disbursementType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const dType = yield (0, db_1.getDisbursementTypeById)(id);
        return res.send(dType);
    }),
    getDisbursementTypes: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dTypes = yield (0, db_1.getDisbursementTypes)();
        return res.send(dTypes);
    }),
    createDisbursementType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const dType = yield (0, db_1.addDisbursementType)(name);
        return res.send(dType);
    }),
    updateDisbursementType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const dType = yield (0, db_1.updateDisbursementType)(req.params.id, fieldsToUpdate);
        return res.send(dType);
    }),
    deleteDisbursementType: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dTypeId = req.params.id;
        const dType = yield (0, db_1.deleteDisbursementType)(dTypeId);
        return res.send(dType);
    }),
};
exports.default = DisbursementTypeController;
