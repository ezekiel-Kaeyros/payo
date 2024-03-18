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
const UserController = {
    user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield (0, db_1.getUserById)(id);
        return res.send(user);
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, db_1.getUsers)();
        // users.forEach((user: any)=>{
        //   let res = deleteUser(user._id)
        //   console.log(res);
        // })
        return res.send(users);
    }),
    getUsersByDepartment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { department_id } = req.params;
        const users = yield (0, db_1.getUsersByDepartment)(department_id);
        return res.send(users);
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, first_name, last_name, department_id, office_id, role, companyId } = req.body;
        const user = yield (0, db_1.createUser)(email, password, first_name, last_name, department_id, office_id, role, companyId);
        if (user) {
            return res.send(user);
        }
        else {
            return res.status(500).send('An error occurred while creating the user, user with this role exist');
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const fieldsToUpdate = req.body;
        const user = yield (0, db_1.updateUser)(req.params.id, fieldsToUpdate);
        return res.send(user);
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const user = yield (0, db_1.deleteUser)(userId);
        return res.send(user);
    }),
};
exports.default = UserController;
