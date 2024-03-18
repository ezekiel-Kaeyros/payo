"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DepartmentSchema = new Schema({
    office_id: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
    },
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
exports.default = mongoose_1.default.model('Department', DepartmentSchema);
