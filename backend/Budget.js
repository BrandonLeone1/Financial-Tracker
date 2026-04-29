import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;