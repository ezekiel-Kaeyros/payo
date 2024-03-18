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
const CompanyController = {
    getCompanyById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const company = yield (0, db_1.getCompanyById)(id);
        return res.send(company);
    }),
    getAllCompanies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const companies = yield (0, db_1.getAllCompanies)();
        return res.send(companies);
    }),
    createCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const { name } = req.body;
        const company = yield (0, db_1.addCompany)(req.body);
        return res.send(company);
    }),
    updateCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const company = yield (0, db_1.updateCompany)(req.params.id, fieldsToUpdate);
        return res.send(company);
    }),
    deleteCompany: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const Id = req.params.id;
        const company = yield (0, db_1.deleteCompany)(Id);
        return res.send(company);
    }),
};
exports.default = CompanyController;
