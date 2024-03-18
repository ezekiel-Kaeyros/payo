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
exports.deleteAllDepartement = exports.deleteDepartement = exports.updateDepartement = exports.addDepartement = exports.getDepartements = exports.getDepartementById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getDepartementById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const department = yield models_1.Departement.findOne(query)
        .populate('office_id')
        .populate('user');
    return department;
});
exports.getDepartementById = getDepartementById;
const getDepartements = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = models_1.Departement.find({})
        .populate('office_id')
        .populate('user');
    return departments;
});
exports.getDepartements = getDepartements;
const addDepartement = (name, office_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dep = yield models_1.Departement.create({
            name, office_id
        });
        return dep;
    }
    catch (error) {
        console.log(error);
    }
});
exports.addDepartement = addDepartement;
const updateDepartement = (id, fieldsToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const dep = yield models_1.Departement.findOneAndUpdate({ _id: id }, Object.assign({}, fieldsToUpdate), { new: true });
    return dep;
});
exports.updateDepartement = updateDepartement;
const deleteDepartement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const dep = yield models_1.Departement.findByIdAndDelete(id);
    return dep;
});
exports.deleteDepartement = deleteDepartement;
const deleteAllDepartement = () => __awaiter(void 0, void 0, void 0, function* () {
    // const dep = await Departement.findByIdAndDelete(id);
    const res = yield models_1.Departement.deleteMany({});
    return res;
});
exports.deleteAllDepartement = deleteAllDepartement;
