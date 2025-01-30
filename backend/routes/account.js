const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware, async (req, res) => {
    try {
        
        const account = await Account.findOne({ userId: req.userId })
        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ message: "Error fetching balance" });
    }
});

accountRouter.post("/transfer",authMiddleware,  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;

    try {
        
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

       
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

       
        await session.commitTransaction();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Transaction failed", error: error.message });
    } finally {
        session.endSession();
    }
});

module.exports = accountRouter;
