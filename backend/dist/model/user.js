"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: { required: false, type: String },
    lastname: { required: false, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    confirmPassword: { type: String },
    name: { type: String },
    // timestamps: true,
});
const User = mongoose_1.default.model("userSchema", userSchema);
exports.default = User;
