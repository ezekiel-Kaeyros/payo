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
exports.deleteDisbursementType = exports.updateDisbursementType = exports.addDisbursementType = exports.getDisbursementTypes = exports.getDisbursementTypeById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getDisbursementTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const dType = yield models_1.DisbursementType.findOne(query);
    return dType;
});
exports.getDisbursementTypeById = getDisbursementTypeById;
const getDisbursementTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const dTypes = models_1.DisbursementType.find({});
    return dTypes;
});
exports.getDisbursementTypes = getDisbursementTypes;
const addDisbursementType = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const dtype = yield models_1.DisbursementType.create({
        name
    });
    return dtype;
});
exports.addDisbursementType = addDisbursementType;
const updateDisbursementType = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const dType = yield models_1.DisbursementType.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return dType;
});
exports.updateDisbursementType = updateDisbursementType;
const deleteDisbursementType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const dType = yield models_1.DisbursementType.findByIdAndDelete(id);
    return dType;
});
exports.deleteDisbursementType = deleteDisbursementType;
