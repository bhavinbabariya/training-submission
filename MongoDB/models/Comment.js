const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});
const Comment = mongoose.model("Comment", commentSchema);
Comment.collection.createIndex({ body: "text" });
module.exports = Comment;
