"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const StatusNameSchema = new Schema({
    name: {
        type: String,
        trim: true,
        // unique: true,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    flag: {
        type: Number,
        // unique: true,
        required: true,
        default: 0,
    },
    companyId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company',
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Statusname', StatusNameSchema);
