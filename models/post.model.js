const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    comments: [{}],
})

const PostModel = mongoose.model("post", postSchema)
module.exports = { PostModel }