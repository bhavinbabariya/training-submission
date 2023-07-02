import mongoose, { Document, Model } from "mongoose";

interface EmailValidationProps {
    value: string;
}

export interface IUser extends Document {
    email: string;
    password: string;
}
export interface IUserWithoutPassword extends Document {
    email: string;
    password?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (val: string) {
                return /^\S+@\S+\.\S+$/.test(val);
            },
            message: (props: EmailValidationProps) =>
                `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        hide: true,
    },
});

const User: Model<IUser> = mongoose.model("User", UserSchema);

export default User;
