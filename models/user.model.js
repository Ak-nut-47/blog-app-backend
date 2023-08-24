const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    avatar: String,
})

const UserModel = mongoose.model("user", userSchema)
module.exports = { UserModel }