const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const apiRouter = Router();



apiRouter.post("/signup", async (req, res) => {
    try {
        const email = req.body.email;
        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(400).json({ msg: "User Already Registered" })
        } else {
            bcrypt.hash(req.body.password, 10, async (error, hash) => {
                if (hash) {
                    const newUser = new UserModel({
                        ...req.body,
                        password: hash,
                    })
                    await newUser.save()
                    res.status(200).json({ msg: "User Registered Successfully" })
                }
            })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

apiRouter.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (result) {
                    try {
                        const token = jwt.sign({ userID: existingUser._id }, process.env.SECRET);
                        return res
                            .status(200)
                            .send({ msg: "Login Successful!", token });
                    } catch (error) {
                        return res.status(400).send({ error: error.message });
                    }
                }
                res.status(400).send({ error: "Login Failed! Wrong Password Provided" });
            });
        } else {
            res.status(400).send({ error: "Login Failed! User not found" });
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = { apiRouter }