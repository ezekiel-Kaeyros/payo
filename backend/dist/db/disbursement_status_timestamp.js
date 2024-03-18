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
exports.deleteDisbursementStatusTimestamp = exports.updateDisbursementStatusTimestamp = exports.addDisbursementStatusTimestamp = exports.getDisbursementStatusTimestamp = exports.getDisbursementStatusTimestampById = void 0;
// @ts-nocheck
const models_1 = require("../models");
const getDisbursementStatusTimestampById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const dStatus = yield models_1.Disbursementstatustimestamp.findOne(query)
        .populate('user_id')
        .populate('status_name_id');
    return dStatus;
});
exports.getDisbursementStatusTimestampById = getDisbursementStatusTimestampById;
const getDisbursementStatusTimestamp = () => __awaiter(void 0, void 0, void 0, function* () {
    const dStatuss = models_1.Disbursementstatustimestamp.find({})
        .populate('user_id')
        .populate('status_name_id');
    return dStatuss;
});
exports.getDisbursementStatusTimestamp = getDisbursementStatusTimestamp;
const addDisbursementStatusTimestamp = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const dStatus = yield models_1.Disbursementstatustimestamp.create(Object.assign({}, body));
    return dStatus;
});
exports.addDisbursementStatusTimestamp = addDisbursementStatusTimestamp;
const updateDisbursementStatusTimestamp = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const dStatus = yield models_1.Disbursementstatustimestamp.findOneAndUpdate({ _id: id }, Object.assign({}, body), { new: true });
    return dStatus;
});
exports.updateDisbursementStatusTimestamp = updateDisbursementStatusTimestamp;
const deleteDisbursementStatusTimestamp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const dStatus = yield models_1.Disbursementstatustimestamp.findByIdAndDelete(id);
    return dStatus;
});
exports.deleteDisbursementStatusTimestamp = deleteDisbursementStatusTimestamp;
