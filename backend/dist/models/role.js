"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RoleSchema = new Schema({
    role_amount_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'RoleAmount',
        },
    ],
    status_name_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Statusname',
        },
    ],
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    name: {
        type: String,
        trim: true,
        // unique: true,
        required: true,
    },
    level: {
        type: Number,
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
// 1= validateur financier, 2= validateur administratif, 3= caisse, 4= initiator
exports.default = mongoose_1.default.model('Role', RoleSchema);
