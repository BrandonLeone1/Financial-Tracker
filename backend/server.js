import express from 'express';
import connectDB from './db.js';
import User from './User.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser'
import generateTokenAndSetCookie from './generateTokenAndSetCookie.js';
import verifyToken from './verifyToken.js';
import checkAuth from './checkAuth.js';
import Transaction from './Transaction.js';
import Budget from './Budget.js';
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv';
import cors from 'cors'
const app = express();
dotenv.config();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    message: 'You are sending requests too fast, Try again later',
    standardHeaders: true
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'You are sending requests too fast, Try again later',
    standardHeaders: true
})

app.use(limiter);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://financial-tracker-w7rv.onrender.com",
        "http://localhost:5173"
    ],
    credentials: true
}))

app.post("/api/auth/signup", authLimiter, async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if (!name || !email || !password || typeof name !== "string" || typeof email !== "string" || typeof password !== "string" ){
            return res.status(401).json({success: false, message: "Failed to sign up. Please fill in all fields or enter proper data type."});
        };
        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists) {
            return res.status(401).json({success: false, message: `Account with email ${email} already exists`});
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({success: true, message: "Added user successfully", user: {
            ...user._doc,
            password: null
        }})

    } catch (error) {
        return res.status(401).json({success: false, message: "Failed to sign up"})
    }
})

app.post("/api/auth/login", authLimiter, async (req, res) => {
    const {email, password} = req.body;

    try {

        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return res.status(401).json({success: false, message: "Failed to log in. Did not receive all credentials or received wrong data format"})
        }

        const isUser = await User.findOne({email});
        if (!isUser) {
            return res.status(401).json({success: false, message: "Invalid email or password"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, isUser.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({success: false, message: "Invalid email or password"})
        }

        generateTokenAndSetCookie(isUser._id, res);
        res.status(200).json({success: true, message: "Signed in successfully", user: {
            ...isUser._doc,
            password: null
        }})

    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid email or password"})
    }
})

app.get("/api/auth/check", verifyToken, checkAuth);

app.post("/api/transactions", verifyToken, async (req, res) => {
    const {classification, amount, category, date, note} = req.body;
    
    try {
    
        if (!classification || !amount || !category || !date || typeof classification !== "string" || typeof amount !== "number" || typeof category !== "string") {
        return res.status(400).json({success: false, message: "Failed to add transaction. Please fill in all fields or send the correct data type"})
    }

    const transaction = new Transaction({
        userID: req.userID,
        classification: classification,
        amount: amount,
        category: category,
        date: date,
        note: note
    })

    await transaction.save();
    res.status(200).json({success: true, message: "Added transaction successfully", data: transaction})  
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to add transaction"})
    }
    }
    
)

app.get("/api/transactions", verifyToken, async (req, res) => {
    try {
        const usersTransactions = await Transaction.find({userID: req.userID})
        if (!usersTransactions) {
            return res.status(400).json({success: false, message: "Failed to retreive tasks"})
        }
        res.status(200).json({success:true, message: "Received tasks", data: usersTransactions});
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to retreive tasks"})
    }
})

app.put("/api/transactions/:id", verifyToken, async(req, res) => {
    const {id} = req.params;
    const updated = req.body;

    try {
        if (!id || !updated) {
            return res.status(400).json({success: false, message: "Not provided an ID or contents to update with"})
        }

        const updatedTransaction = await Transaction.findOneAndUpdate({userID: req.userID, _id: id}, updated, {new: true})

        if (!updatedTransaction) {
            return res.status(400).json({success: false, message: "Could not update transaction due to not finding one"})
        }

        res.status(200).json({success: true, message: "Updated transaction", data: updatedTransaction});
    } catch (error) {
        return res.status(400).json({success: false, message: "Could not update transaction"})
    }
})

app.delete("/api/transactions/:id", verifyToken, async(req, res) => {
    const {id} = req.params;

    try {
      if (!id) {
        return res.status(400).json({success: false, message: "Not provided an ID to delete"})
    }  

    const deletedTransaction = await Transaction.findOneAndDelete({userID: req.userID, _id: id});

    if (!deletedTransaction) {
        return res.status(400).json({success: false, message: "Failed to find transaction"})
    }

    res.status(200).json({success: true, message: "Deleted transaction", data: deletedTransaction})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to delete transaction"})
    }
    
})

app.post("/api/budgets", verifyToken, async(req, res) => {
    const {category, limit} = req.body;

    try {
        if (!category || !limit || typeof category !== "string" || typeof limit !== "number") {
            return res.status(400).json({success: false, message: "Failed to add budget, please fill in all fields"})
        }

        const alreadyHaveABudgetForCategory = await Budget.findOne({userID: req.userID, category: category})
        if (alreadyHaveABudgetForCategory) {
            return res.status(400).json({success: false, message: "Already have a budget for this category. Please edit the budget if you wish to change the amount"})
        }

        const budget = new Budget({
            userID: req.userID,
            category: category,
            limit: limit
        })

        await budget.save();
        res.status(200).json({success: true, message: "Added budget", data: budget});
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to add budget"})
    }
})

app.get("/api/budgets", verifyToken, async (req, res) => {
    try {
        const usersBudgets = await Budget.find({userID: req.userID});
        if (!usersBudgets) {
            return res.status(400).json({success: false, message: "Failed to get budgets"})
        }
        res.status(200).json({success: true, message: "Got budgets", data: usersBudgets})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to get budgets"})
    }
})

app.put("/api/budgets/:id", verifyToken, async (req, res) => {
    const {id} = req.params;
    const updated = req.body;

    try {
        if (!id || !updated) {
            return res.status(400).json({success: false, message: "Didn't receive ID or content to update with"})
        }

        const updatedBudget = await Budget.findOneAndUpdate({userID: req.userID, _id: id}, updated, {new: true})
        if (!updatedBudget) {
            return res.status(400).json({success: false, message: "Couldn't find budget to update"})
        }

        res.status(200).json({success: true, message: "Updated budget", data: updatedBudget})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to update budget"})
    }
})

app.delete("/api/budgets/:id", verifyToken, async (req,res) => {
    const {id} = req.params;

    try {
        if (!id) {
            return res.status(400).json({success: false, message: "Not provided an ID to delete with"})
        }

        const deletedBudget = await Budget.findOneAndDelete({userID: req.userID, _id: id});
        if (!deletedBudget) {
            return res.status(400).json({success: false, message: "Couldn't find budget to delete"})
        }

        res.status(200).json({success: true, message: "Deleted budget", data: deletedBudget});
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to delete budget"})
    }
})

app.get("/api/budgets/get-info", verifyToken, async (req, res) => {
   
    try {
      const budgetInfo = await Transaction.aggregate([
        {
            $match: {userID: req.userID, classification: "Expense"}
            
        },
        {
            $group: {_id: "$category", total: {$sum: "$amount"}}
        }
    ])
    if (!budgetInfo) {
        return res.status(400).json({success: false, message: "Failed to aggregate budget Info data. Search must be wrong"})
    }

    res.status(200).json({success: true, message: "Aggregated data", data: budgetInfo})  
    } catch (error) {
        return res.status(400).json({success: false, message: "Couldnt get data"})
    }
    
})

app.get("/api/transactions/get-income-info", verifyToken, async (req,res) => {
    
    try {
      const transactionSummary = await Transaction.aggregate([
        {
            $match: {userID: req.userID, classification: "Income"}
        },
        {
            $group: {_id: "$category", total: {$sum: "$amount"}}
        }
    ])  

    if (!transactionSummary) {
        return res.status(400).json({success: false, message: "Failed, must have searched wrong"})
    }
    res.status(200).json({success: true, message: "Got data", data: transactionSummary});
    } catch (error) {
       return res.status(400).json({success: false, message: "Failed to aggregate income data"})
    }

    
})

app.get("/api/transactions/get-expense-info", verifyToken, async (req, res) => {
    try {
        const expenseSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Expense"}
            },
            {
                $group: {_id: "$category", total: {$sum: "$amount"}}
            }
        ])
        if (!expenseSummary) {
           return res.status(400).json({success: false, message: "Failed must have searched wrong"})
        }
        res.status(200).json({success:true, message: "Got data", data: expenseSummary})
    } catch (error) {
       return  res.status(400).json({success: false, message: "Failed to aggregate data"})
    }
})

app.get("/api/transactions/expenses-over-time", verifyToken, async (req, res) => {
    try {
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setUTCHours(0,0,0,0)

        const expensesOverTimeSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Expense", date: {$gte: sevenDaysAgo}}
            }, {
                $group: {_id: "$date", total: {$sum: "$amount"}}
            },
            {
                $sort: {_id: 1}
            }
        ])


        if (!expensesOverTimeSummary) {
            return res.status(400).json({success: false, message: "Failed, must have not searched properly"})
        }

        res.status(200).json({success: true, message: "Got expense info for last week", data: expensesOverTimeSummary})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to get expense data overtime"})
    }
})

app.get("/api/transactions/expenses-one-month", verifyToken, async (req, res) => {
    
    let oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
    oneMonthAgo.setUTCHours(0,0,0,0)
    
   try {
    const monthlySummary = await Transaction.aggregate([
        {
            $match: {userID: req.userID, classification: "Expense", date: {$gte: oneMonthAgo}}
        }, {
            $group: {_id: "$date", total: {$sum: "$amount"}}
        },
        {
            $sort: {_id: 1}
        }
    ]);
    if (!monthlySummary) {
        return res.status(400).json({success: false, message: "Failed to get monthly data, must have been wrong search"})
    }

    res.status(200).json({success: true, message: "Got expenses for last month", data: monthlySummary})
   } catch (error) {
    return res.status(400).json({success: false, message: "Failed to get monthly data"})
   }
   
    
})

app.get("/api/budgets/remaining-info", verifyToken, async (req, res) => {
    
    try {
      const budgetsAndTheirLimits = await Budget.aggregate([
        {
            $match: {userID: req.userID}
        }, {
            $project: {category: 1, limit: 1}
        }
      ])

      if (!budgetsAndTheirLimits) {
        return res.status(400).json({success: false, message: "Failed to aggregate budget data and their limits, search must be incorrect"})
      }

      const expensesAndTheirAmounts = await Transaction.aggregate([
        {
            $match: {userID: req.userID, classification: "Expense"}
        }, {
            $group: {_id: "$category", total: {$sum: "$amount"}}
        }
      ])

      if (!expensesAndTheirAmounts) {
        return res.status(400).json({success: false, message: "Failed to aggregate expense data and their amounts, search must be incorrect"})
      }

        const budgetsLimitsAndAmounts = budgetsAndTheirLimits.map(budget => {
                const match = expensesAndTheirAmounts.find(expense => expense._id === budget.category);

                if (match) {
                    return {
                        ...budget,
                        amountAlreadySpent: match.total,
                        percentUsed: (match.total / budget.limit) * 100
                    }
                } else {
                    return {
                        ...budget,
                        amountAlreadySpent: 0,
                        percentUsed: 0
                    }
                     
                }
            })

      res.status(200).json({success: true, message: "Got all budgets and their limits", data: budgetsLimitsAndAmounts})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to aggregate budget data and their limits"})
    }
    
    
    
})

app.get("/api/transactions/comparison", verifyToken, async (req, res) => {
    try {
        let thisWeekExpenses = new Date();
        thisWeekExpenses.setDate(thisWeekExpenses.getDate() - 7);
        thisWeekExpenses.setUTCHours(0,0,0,0)
        let previousWeekExpenses = new Date();
        previousWeekExpenses.setDate(previousWeekExpenses.getDate() - 14);
        previousWeekExpenses.setUTCHours(0,0,0,0)
        const thisWeekExpensesSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Expense", date: {$gte: thisWeekExpenses}}
            }, {
                $group: {_id: "$category", total: {$sum: "$amount"}}
            }
        ])

        if (thisWeekExpensesSummary.length === 0) {
            return res.status(400).json({success: false, message: "Failed to get expense summary for this current week. Search must be wrong"})
        }

        const previousWeekExpensesSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Expense", date: {$gte: previousWeekExpenses, $lte: thisWeekExpenses}}
            }, {
                $group: {_id: "$category", total: {$sum: "$amount"}}
            }
        ])

        if (previousWeekExpensesSummary.length === 0) {
            return res.status(400).json({success: false, message: "Failed to get expense summary for previous week. Search must be wrong"})
        }

        let comparisonArray = thisWeekExpensesSummary.map(expense => {
            const match = previousWeekExpensesSummary.find(exp => exp._id === expense._id);

            if (match) {
                return {
                    ...expense,
                    previousWeeksTotal: match.total,
                    changeFromPreviousWeek: (expense.total / match.total) * 100
                }
            } else {
                return {
                    ...expense,
                    previousWeeksTotal: 0,
                    changeFromPreviousWeek: 0
                }
            }
        })

        if (comparisonArray.length === 0 || !comparisonArray) {
            return res.status(400).json({success: false, message: "Failed to get expense summary for previous week. Search must be wrong"})
        }

        res.status(200).json({success:true, message: "Got data and successfully compared", data: comparisonArray})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to get expense summary for this current week"})
    }
})

app.get("/api/transactions/income-last-month", verifyToken, async (req, res) => {
    
    let withinLastMonth = new Date();
    withinLastMonth.setDate(withinLastMonth.getDate() - 30)
    withinLastMonth.setUTCHours(0,0,0,0);

    try {
        const incomeWithinLastMonth = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Income", date: {$gte: withinLastMonth}}
            }, {
                $group: {_id: "$category", total: {$sum: "$amount"}}
            }
        ])

        if (incomeWithinLastMonth.length === 0) {
            return res.status(400).json({success: false, message: "Failed to get income for the last month. Search must be wrong"})
        }

        res.status(200).json({success: true, message: "Got income data for the last month", data: incomeWithinLastMonth})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed to get income for the last month"})
    }
})

app.get("/api/transactions/income-and-expenses-previous-month", verifyToken, async (req, res) => {
    
    let thisMonth = new Date();
    thisMonth.setDate(thisMonth.getDate() - 30)
    thisMonth.setUTCHours(0,0,0,0)

    let previousMonth = new Date();
    previousMonth.setDate(previousMonth.getDate() - 60)
    previousMonth.setUTCHours(0,0,0,0)
    
    try {
        const previousMonthIncomeSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Income", date: {$gte: previousMonth, $lt: thisMonth}}
            },
            {
                $project: {amount: 1}
            }
        ])

        const previousMonthExpensesSummary = await Transaction.aggregate([
            {
                $match: {userID: req.userID, classification: "Expense", date: {$gte: previousMonth, $lt: thisMonth}}
            },
            {
                $project: {amount: 1}
            }
        ])

        const previousMonthIncomeTotal = previousMonthIncomeSummary.map(income => {
            return income.amount
        }).reduce((a,b) => a + b);

        const previousMonthExpensesTotal = previousMonthExpensesSummary.map(expense => {
            return expense.amount
        }).reduce((a,b) => a + b);

        res.status(200).json({success: true, message: "got data", incomeData: previousMonthIncomeTotal, expenseData: previousMonthExpensesTotal})
    } catch (error) {
        return res.status(400).json({success: false, message: "Failed"})
    }
})

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log("Started server on port 5000")
    
});