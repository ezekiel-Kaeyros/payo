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
exports.deleteUser = exports.updateUser = exports.countUsers = exports.getUsers = exports.createUser = exports.updateUserResetPasswordToken = exports.getUserByUsername = exports.getUsersByOffice = exports.getUsersByDepartment = exports.getUserById = exports.getUserByEmail = void 0;
// @ts-nocheck
const models_1 = require("../models");
const email_1 = require("../utils/email");
const role_1 = require("./role");
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ email })
        .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
        .populate('office_id')
        .populate('department_id')
        .populate('companyId');
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { _id: id };
    const user = yield models_1.User.findOne(query)
        .select('-password')
        .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
        .populate('companyId')
        .populate('office_id')
        .populate('department_id');
    return user;
});
exports.getUserById = getUserById;
const getUsersByDepartment = (department_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(department_id);
    const users = yield models_1.User.find({ department_id })
        .populate({
        path: 'role',
        populate: [{ path: 'status_name_id' }]
    })
        .populate('office_id')
        .populate('department_id')
        .populate('companyId');
    return users;
});
exports.getUsersByDepartment = getUsersByDepartment;
const getUsersByOffice = (office_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(office_id);
    const users = yield models_1.User.find({ office_id })
        .populate('office_id')
        .populate('department_id')
        .populate('companyId')
        .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    });
    return users;
});
exports.getUsersByOffice = getUsersByOffice;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ username })
        .select('-password')
        .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
        .populate('department_id')
        .populate('companyId');
    return user;
});
exports.getUserByUsername = getUserByUsername;
const updateUserResetPasswordToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOneAndUpdate({ _id: userId }, { resetPasswordToken: token });
    return user;
});
exports.updateUserResetPasswordToken = updateUserResetPasswordToken;
const createUser = (email, password, first_name, last_name, department_id, office_id, role, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    let roles = yield (0, role_1.getRoleById)(role);
    let amount_exists = roles['role_amount_id'][0].amount;
    if (roles && roles.level == 1) {
        let flag = false;
        const exist_user = yield models_1.User.find({ role: role, office_id: office_id })
            .select('-password')
            .populate('department_id')
            .populate('office_id')
            .populate({
            path: 'role',
            populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
        });
        if (exist_user.length) {
            exist_user.forEach(user => {
                console.log(user);
                if (user === null || user === void 0 ? void 0 : user.role[0].role_amount_id[0].amount = amount_exists) {
                    flag = true;
                }
            });
        }
        if (flag) {
            return false;
        }
    }
    if (roles && roles.level == 2) {
        const exist_user = yield models_1.User.find({ role: role, office_id: office_id, department_id: department_id });
        if (exist_user.length) {
            return false;
        }
    }
    if (roles && roles.level == 3) {
        const exist_user = yield models_1.User.find({ role: role, office_id: office_id });
        if (exist_user.length) {
            return false;
        }
    }
    const user = yield models_1.User.create({
        email,
        password,
        first_name,
        last_name,
        department_id,
        office_id,
        role,
        companyId
    });
    (0, email_1.sendEmail)(email, 'Welcome to our platform', `Hello ${first_name} ${last_name} votre compte a été cree avec succes sur la plateforme cashapp`);
    return user;
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    let users = models_1.User.find({})
        .select('-password')
        .populate('department_id')
        .populate('office_id')
        .populate({
        path: 'role',
        populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    })
        .sort({ createdAt: 'desc' });
    return users;
});
exports.getUsers = getUsers;
const countUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield models_1.User.countDocuments({});
    const verified = yield models_1.User.countDocuments({ emailVerified: true });
    return { total, verified };
});
exports.countUsers = countUsers;
const updateUser = (id, fieldsToUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    // let us= await User.find({})
    // .select('-password')
    // .populate('department_id')
    // .populate('office_id')
    // .populate({
    //   path: 'role',
    //   populate: [{ path: 'role_amount_id' }, { path: 'status_name_id' }],
    // })
    const user = yield models_1.User.findOneAndUpdate({ _id: id }, Object.assign({}, fieldsToUpdate));
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await User.findOneAndUpdate(  );
    const user = yield models_1.User.findByIdAndDelete(id, { new: true });
    return user;
});
exports.deleteUser = deleteUser;
