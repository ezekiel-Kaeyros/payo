"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CompanySchema = new Schema({
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
    phone: {
        type: Number,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('Company', CompanySchema);
