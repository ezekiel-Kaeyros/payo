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
exports.deleteStatusName = exports.updateStatusName = exports.addStatusName = exports.getStatusNames = exports.getStatusNameById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getStatusNameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const statusname = yield models_1.StatusName.findOne(query)
        .populate('companyId');
    return statusname;
});
exports.getStatusNameById = getStatusNameById;
const getStatusNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const statusnames = models_1.StatusName.find({})
        .populate('companyId');
    return statusnames;
});
exports.getStatusNames = getStatusNames;
const addStatusName = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const statusname = yield models_1.StatusName.create(body)
        .populate('companyId');
    return statusname;
});
exports.addStatusName = addStatusName;
const updateStatusName = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const statusname = yield models_1.StatusName.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true })
        .populate('companyId');
    return statusname;
});
exports.updateStatusName = updateStatusName;
const deleteStatusName = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const statusname = yield models_1.StatusName.findByIdAndDelete(id);
    return statusname;
});
exports.deleteStatusName = deleteStatusName;
