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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.updateUser = exports.signin = exports.newUser = exports.getOneUser = exports.getAllUsers = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "gotten all users",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all users",
            data: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
//get one user
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.findById(req.params.userId);
        return res.status(200).json({
            message: "gotten one user",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all users",
            data: error,
        });
    }
});
exports.getOneUser = getOneUser;
//create a user
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, businessName, businessContact, businessServices, } = req.body;
        const slt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, slt);
        const generateNumber = `${Math.floor(Math.random() * 100000)}`;
        const checkExist = yield UserModel_1.default.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: "This user already exist",
            });
        }
        else {
            const users = yield UserModel_1.default.create({
                fullName,
                email,
                password: hash,
                businessName,
                businessContact,
                businessServices,
                MembershipNumber: generateNumber,
            });
            return res.status(200).json({
                message: "user created",
                data: users,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get create user",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.newUser = newUser;
// signin user
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const findUser = yield UserModel_1.default.findOne({ email });
        if (!findUser) {
            return res.status(400).json({
                message: "user does not exist",
            });
        }
        else {
            const comparePassword = yield bcrypt_1.default.compare(password, findUser === null || findUser === void 0 ? void 0 : findUser.password);
            if (!comparePassword) {
                return res.status(400).json({
                    message: "incorrect password"
                });
            }
        }
        return res.status(200).json({
            message: "login successful"
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "login unsuccessful",
        });
    }
});
exports.signin = signin;
// update user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, businessName, businessContact, } = req.body;
        const getUser = yield UserModel_1.default.findById(req.params.userId);
        const users = yield UserModel_1.default.findByIdAndUpdate(getUser === null || getUser === void 0 ? void 0 : getUser._id, {
            fullName,
            businessName,
            businessContact,
        }, { new: true });
        return res.status(200).json({
            message: "updated a user",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all users",
            data: error,
        });
    }
});
exports.updateUser = updateUser;
// Search user
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryData = req.query;
        const searchOneUser = yield UserModel_1.default.find(queryData);
        return res.status(200).json({
            message: "user found",
            data: searchOneUser
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "error finding user",
            data: error,
        });
    }
});
exports.searchUser = searchUser;
