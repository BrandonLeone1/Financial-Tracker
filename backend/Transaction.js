import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, {timestamps: true})


const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;