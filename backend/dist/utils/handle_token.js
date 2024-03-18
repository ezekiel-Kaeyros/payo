"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorCodes_1 = require("../constants/ErrorCodes");
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ user: user }, process.env.SECRET, { expiresIn: '1h' });
};
exports.createToken = createToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET);
};
exports.verifyToken = verifyToken;
const isAuthenticate = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(ErrorCodes_1.ErrorCodes.Un_Authorized).send('Access Denied. No token provided.');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(ErrorCodes_1.ErrorCodes.Bad_Request).send('Invalid Token.');
    }
};
exports.isAuthenticate = isAuthenticate;
