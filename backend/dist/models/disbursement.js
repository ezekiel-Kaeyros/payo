"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const Schema = mongoose_1.default.Schema;
const DisbursementSchema = new Schema({
    disbursement_status_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Disbursementstatus',
        },
    ],
    payment_method_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Paymentmethod',
        },
    ],
    beneficiary_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Beneficiary',
        },
    ],
    initiator: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    disbursement_current_status: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Disbursementstatustimestamp',
        },
    ],
    amount: {
        type: Number,
        required: true,
    },
    reject_note: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    invoice_number: {
        type: String,
        trim: true,
    },
    reason: {
        type: String,
    },
    user_office: {
        type: String,
    },
    user_department: {
        type: String,
    }
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Disbursement', DisbursementSchema);
