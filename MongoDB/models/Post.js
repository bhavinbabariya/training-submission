const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});
const Post = mongoose.model("Post", postSchema);
Post.collection.createIndex({ title: "text", body: "text" });

module.exports = Post;
