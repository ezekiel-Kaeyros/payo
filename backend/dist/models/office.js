"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const Schema = mongoose_1.default.Schema;
const OfficeSchema = new Schema({
    companyId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company',
        },
    ],
    department: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Department',
        },
    ],
    name: {
        type: String,
        trim: true,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Office', OfficeSchema);
