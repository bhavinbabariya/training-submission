"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (val) {
                return /^\S+@\S+\.\S+$/.test(val);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        hide: true,
    },
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
