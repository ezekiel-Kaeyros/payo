"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const Schema = mongoose_1.default.Schema;
const DisbursementStatusSchema = new Schema({
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    status_name_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Statusname',
        },
    ],
    reason: {
        type: String,
    },
    date_disbursement_status: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Disbursementstatus', DisbursementStatusSchema);
