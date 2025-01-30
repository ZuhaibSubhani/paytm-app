const express = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {Account} = require("../db");
const {User} = require("../db");
const zod = require("zod");
const userRouter = express.Router();

// Zod schema for signup validation
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

// Signup route
userRouter.post("/signup", async (req, res) => {
    try {
        const { success } = signupSchema.safeParse(req.body);
        console.log(success)
        if (!success) {
            return res.json({ message: "invalid values" });
        }
        const { username, password, firstName, lastName } = req.body;
        console.log(req.body)
        const user = await User.findOne({ username });
        if (user) {
            return res.json({ message: "username already exists" });
        }
        const dbUser = await User.create({ username, password, firstName, lastName });
        console.log(dbUser)
        const account=await Account.create({
            userId: dbUser._id,
            balance: 0,
        });console.log(account)
        const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);
        res.json({ message: "user created", token });
    } catch (error) {
        res.json({ message: 'error' });
    }
});

// Zod schema for signin validation
const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

// Signin route
userRouter.post("/signin", async (req, res) => {
    try {
        const { success } = signinSchema.safeParse(req.body);
        if (!success) {
            return res.json({ message: "incorrect creds" });
        }
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });
        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            res.json({ message: "user found", token });
        } else {
            res.status(411).json({ message: "user not found" });
        }
    } catch (error) {
        res.json({ message: "error" });
    }
});

// Bulk users route
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter } },
            { lastName: { "$regex": filter } },
        ],
    });
    res.json({
        users: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

module.exports = userRouter;
