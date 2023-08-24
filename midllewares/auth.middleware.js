const jwt = require("jsonwebtoken")
require("dotenv").config();
const { BlacklistModel } = require("../models/blacklist.model")

const auth = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]


    try {
        let existingToken = await BlacklistModel.find({
            blacklist: { $in: token },
        })
        if (existingToken.length > 0) {
            res.status(200).json("Please Login")
        } else {
            const decoded = jwt.verify(token, process.env.SECRET);

            req.body.userID = decoded.userID;

            next();
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { auth }