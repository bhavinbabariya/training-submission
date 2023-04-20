const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
