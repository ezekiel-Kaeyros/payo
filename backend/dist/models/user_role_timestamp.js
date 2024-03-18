"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const Schema = mongoose_1.default.Schema;
const UserRoleTimestampSchema = new Schema({
    user_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    user_role: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role',
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('DisbursementStatus', UserRoleTimestampSchema);
