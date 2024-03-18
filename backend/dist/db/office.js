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
exports.deleteOffice = exports.updateOffice = exports.addOffices = exports.getOffices = exports.getOfficeById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getOfficeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    // return
    try {
        const office = yield models_1.Office.findOne(query)
            .populate('companyId')
            .populate('department');
        return office;
    }
    catch (error) {
        return error;
    }
});
exports.getOfficeById = getOfficeById;
const getOffices = () => __awaiter(void 0, void 0, void 0, function* () {
    const offices = models_1.Office.find({})
        .populate('companyId')
        .populate('department');
    return offices;
});
exports.getOffices = getOffices;
const addOffices = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const office = yield models_1.Office.create(body)
        .populate('companyId');
    return office;
});
exports.addOffices = addOffices;
const updateOffice = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const office = yield models_1.Office.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return office;
});
exports.updateOffice = updateOffice;
const deleteOffice = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const office = yield models_1.Office.findByIdAndDelete(id);
    return office;
});
exports.deleteOffice = deleteOffice;
