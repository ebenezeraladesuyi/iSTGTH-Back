"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "please enter your name"],
    },
    password: {
        type: String,
        required: [true, "please enter your name"],
    },
    businessName: {
        type: String,
        required: [true, "please enter your business name"],
    },
    businessServices: {
        type: String,
        required: [true, "please, enter business services"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
    },
    businessContact: {
        type: String,
        required: [true, "please enter your business Contact"],
    },
    MembershipNumber: {
        type: Number,
    },
});
const UserModel = mongoose_1.default.model("AllUsers", userSchema);
exports.default = UserModel;
