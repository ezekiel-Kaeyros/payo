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
const BeneficiaryController = {
    oneBeneficiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const beneficiary = yield (0, db_1.getBeneficiaryById)(id);
        return res.send(beneficiary);
    }),
    getAllBeneficiaries: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const beneficiarys = yield (0, db_1.getAllBeneficiaries)();
        return res.send(beneficiarys);
    }),
    createBeneficiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const beneficiary = yield (0, db_1.addBeneficiary)(Object.assign({}, req.body));
        return res.send(beneficiary);
    }),
    updateBeneficiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const beneficiary = yield (0, db_1.updateBeneficiary)(req.params.id, fieldsToUpdate);
        return res.send(beneficiary);
    }),
    deleteBeneficiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const beneficiaryId = req.params.id;
        const beneficiary = yield (0, db_1.deleteBeneficiary)(beneficiaryId);
        return res.send(beneficiary);
    }),
};
exports.default = BeneficiaryController;
