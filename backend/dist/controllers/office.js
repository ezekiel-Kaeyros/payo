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
const OfficeController = {
    office: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const office = yield (0, db_1.getOfficeById)(id);
        return res.send(office);
    }),
    getOffices: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const offices = yield (0, db_1.getOffices)();
        return res.send(offices);
    }),
    createOffice: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        const office = yield (0, db_1.addOffices)(req.body);
        return res.send(office);
    }),
    updateOffice: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const office = yield (0, db_1.updateOffice)(req.params.id, fieldsToUpdate);
        return res.send(office);
    }),
    deleteOffice: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const officeId = req.params.id;
        const office = yield (0, db_1.deleteOffice)(officeId);
        return res.send(office);
    }),
};
exports.default = OfficeController;
