const express = require('express');
const userData = require('../models/userData.jsx')
const { body, validationResult } = require('express-validator');
const router = express.Router();
router.use(express.json());
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const secret = "RESTAPI";
router.post("/register", async (req, res) => {

        try {
            const { email, password } = req.body;
            const user = await userData.findOne({ email });
            if (user) {
                return res.status(403).json({ error: "User already exists" })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
                const data = await userData.create({
                    email,
                    password: hash
                })
                return res.status(200).json({
                    message: "SignUp Successfully"
                })
            })
        } catch (err) {
            return res.status(400).json({
                status: "Failed",
                message: err.message
            })
        }

    })

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(403).json({
                error: "Enter valid details"
            })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                })
            }
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: user._id
                }, secret);
                return res.status(200).json({
                    message: "Login successfull",
                    token: token,
                    user : user.email
                })
            } else {
                return res.status(400).json({
                    error: "Invallid Password"
                })
            }
        })
    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})


module.exports = router;
