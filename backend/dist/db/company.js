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
exports.deleteCompany = exports.updateCompany = exports.addCompany = exports.getAllCompanies = exports.getCompanyById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getCompanyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const company = yield models_1.Company.findOne(query);
    return company;
});
exports.getCompanyById = getCompanyById;
const getAllCompanies = () => __awaiter(void 0, void 0, void 0, function* () {
    const companies = models_1.Company.find({});
    return companies;
});
exports.getAllCompanies = getAllCompanies;
const addCompany = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield models_1.Company.create(body);
    return company;
});
exports.addCompany = addCompany;
const updateCompany = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield models_1.Company.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return company;
});
exports.updateCompany = updateCompany;
const deleteCompany = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield models_1.Company.findByIdAndDelete(id);
    return company;
});
exports.deleteCompany = deleteCompany;
