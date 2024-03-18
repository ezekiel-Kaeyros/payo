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
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const AuthController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        let user = yield (0, db_1.getUserByEmail)(email);
        if (!user) {
            return res
                .status(constants_1.ErrorCodes.Bad_Request)
                .send('Your email and password combination does not match an account.');
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return res
                .status(constants_1.ErrorCodes.Bad_Request)
                .send('Your email and password combination does not match an account.');
        }
        const token = (0, utils_1.createToken)(user);
        return res.send({ user, token });
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.cookies['token']) {
            return res.clearCookie('token').send('You have been successfully logged out.');
        }
        else {
            return res.send('You have been successfully logged out.');
        }
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
    resetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }),
};
exports.default = AuthController;
