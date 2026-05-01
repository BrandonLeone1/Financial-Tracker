import { useEffect } from "react";
import { useState } from "react"
import { Navbar } from "../components/Navbar";
import { TransactionCard } from "../components/TransactionCard";
import {motion, AnimatePresence} from 'framer-motion'

export function Transactions ({transactions, deletedTransaction, addTransactionMethod, addedTransactionSuccessfully, getTransactions, deleteTransactionMethod, updateTransactionMethod}) {
    
    const [addingTransaction, setAddingTransaction] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        classification: "",
        amount: 0,
        category: "",
        date: "",
        note: ""
    })

    useEffect(() => {
        getTransactions();
    }, []
)

   async function handleClick () {
        await addTransactionMethod(newTransaction);

        setNewTransaction({
            classification: "",
            amount: 0,
            category: "",
            date: "",
            note: ""
        })

        setAddingTransaction(false)
    }

    const [showingOnlyIncome, setShowingOnlyIncome] = useState(false);
    const [showingOnlyExpenses, setShowingOnlyExpenses] = useState(false);
    
    return (
        <>
        <Navbar />

        <AnimatePresence>
        { addedTransactionSuccessfully && (
            <motion.div 
            initial={{opacity: 0, scale: 0.98, y: 40}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.98, y: 40}}
            transition={{duration: 0.25, ease: "easeInOut"}}
            className="bg-slate-100 shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] -translate-x-[50%] text-center z-100">
                
                <div className="flex gap-2 items-center text-lg font-medium">
                    <i className="fa-solid fa-square-check text-emerald-700"></i>
                    <p>Added new transaction!</p>
                </div>
                

            </motion.div>
        )

        }

        <AnimatePresence>
        { deletedTransaction && (
            <motion.div 
            initial={{opacity: 0, scale: 0.98, y: 40}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.98, y: 40}}
            transition={{duration: 0.25, ease: "easeInOut"}}
            className="bg-slate-100 shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] -translate-x-[50%] text-center z-100">
                
                <div className="flex gap-2 items-center text-lg font-medium">
                    <i className="fa-solid fa-square-check text-emerald-700"></i>
                    <p>Deleted transaction!</p>
                </div>
                

            </motion.div>
        )
            
        }
        </AnimatePresence>

        </AnimatePresence>
        <div className="flex flex-col max-w-5xl mx-auto p-6">
        <p className="text-center text-3xl mt-12 font-semibold">Transactions</p>
        { transactions.length < 1 ? (
            <p className="text-center mt-6 font-medium text-xl">No current transactions logged, <button onClick={() => setAddingTransaction(true)} className="underline cursor-pointer text-indigo-400 hover:text-indigo-500 duration-300">click to add one!</button></p>
        ) : (
            <p className="text-center mt-6 font-medium text-xl">Total: ({transactions.length}), <button onClick={() => setAddingTransaction(true)} className="underline cursor-pointer text-indigo-400 hover:text-indigo-500 duration-300"> click to add another!</button></p>
        )

        }

        <AnimatePresence>
        { addingTransaction && (
            <motion.div 
                layout
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2, ease: "easeInOut"}}
            className="flex h-screen items-center justify-center bg-black/75 fixed inset-0 backdrop-blur-sm z-50">

                <motion.div 
                layout
                initial={{opacity: 0, scale: 0.98}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.98}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                className="bg-white max-h-[85vh] max-w-[90%] mx-auto overflow-y-auto p-6 rounded-lg flex flex-col gap-4 text-gray-700 z-50">
                    
                    <div className="flex justify-between items-center">
                        <p className="text-xl text-black font-medium">New transaction:</p>
                        <i onClick={() => setAddingTransaction(false)} className="fa-solid fa-arrow-right-from-bracket text-xl text-rose-500 hover:text-rose-800 duration-300 cursor-pointer"></i>
                    </div>

                    <label htmlFor="category-select"><span className="font-medium">Select a classification:</span>
                    <select 
                    id="category-select"
                    value={newTransaction.classification}
                    onChange={(e) => setNewTransaction(prev => ({
                        ...prev,
                        classification: e.target.value 
                    }))}
                    className="w-full border border-gray-300 mt-2 rounded-xl p-2 cursor-pointer focus:border-indigo-400">
                        <option defaultValue className="">Income or expense?</option>
                        <option value={`Income`}>Income</option>
                        <option value={`Expense`}>Expense</option>
                    </select>
                    </label>
                    
                    <label htmlFor="amount-input"><span className="font-medium">Enter amount:</span>
                    <input 
                    id="amount-input"
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction(prev => ({
                        ...prev,
                        amount: Number(e.target.value)
                    }))}
                    className="w-full border mt-2 border-gray-300 rounded-xl p-2 focus:border-indigo-400"
                 
                    />
                    </label>
                    
                    <label htmlFor="category-select"><span className="font-medium">Choose a related category:</span>
                    <select 
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction(prev => ({
                        ...prev,
                        category: e.target.value
                    }))}
                    id="category-select" className="w-full border mt-2 border-gray-300 focus:border-indigo-400 rounded-xl p-2 cursor-pointer">
                        <option defaultValue>Choose a category</option>
                        <option value={`Food`}>Food</option>
                        <option value={`Rent`}>Rent</option>
                        <option value={`Transportation`}>Transportation</option>
                        <option value={`Utilities`}>Utilities</option>
                        <option value={`Shopping`}>Shopping</option>
                        <option value={`Salary`}>Salary</option>
                        <option value={`Freelance`}>Freelance</option>
                        <option value={`Investments`}>Investments</option>
                        <option value={`Other`}>Other</option>
                    </select>
                    </label>

                    <label htmlFor="date-input" className=""><span className="font-medium">Date:</span>
                    <input 
                    id="date-input"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({
                        ...prev,
                        date: e.target.value
                    }))}
                    type="date"
                    className="w-full border cursor-pointer border-gray-300 mt-2 rounded-xl p-2 focus:border-indigo-400"
                    
                    />
                    </label>

                    <label htmlFor="note-input"><span className="font-medium">Note for transaction? (Optional):</span>
                    <textarea
                    id="note-input" 
                    value={newTransaction.note}
                    onChange={(e) => setNewTransaction(prev => ({
                        ...prev,
                        note: e.target.value
                    }))}
                    placeholder="Note contents..."
                    className="w-full border border-gray-300 mt-2 rounded-xl p-2 focus:border-indigo-400"
                    />
                    </label>
                    
                    <button 
                    onClick={handleClick}
                    className="border border-indigo-400 cursor-pointer font-medium hover:bg-indigo-400 duration-300 hover:text-white py-1 rounded-lg">Add transaction</button>
                </motion.div>

            </motion.div>
        )

        }
        </AnimatePresence>

      { transactions.length > 1 && (
        <div className="flex gap-2 justify-center items-center mt-12">
        <button 
        className={`${showingOnlyIncome && "text-indigo-400"} font-medium mb-6 cursor-pointer underline hover:text-indigo-400 duration-300`}
        onClick={() => setShowingOnlyIncome(prev => !prev)}>{!showingOnlyIncome ? "Show only income" : "Showing only income"}</button>
        <button 
        className={`${showingOnlyExpenses && "text-indigo-400"} font-medium mb-6 cursor-pointer underline hover:text-indigo-400 duration-300`}
        onClick={() => setShowingOnlyExpenses(prev => !prev)}>{!showingOnlyExpenses ? "Show only expenses" : "Showing only expenses"}</button>
        </div>
      )    
}

        <AnimatePresence>
        { !showingOnlyIncome && !showingOnlyExpenses ? (
        <motion.div 
        layout
        initial={{opacity: 0, scale: 1}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 1}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        { transactions.map((transaction => (
                <TransactionCard key={transaction._id} updateTransactionMethod={updateTransactionMethod} transaction={transaction} deleteTransactionMethod={deleteTransactionMethod} />
        )))

        }
        </motion.div>
        ) : ( 
            ""
        )
        }
        </AnimatePresence>

        <AnimatePresence>
        { showingOnlyExpenses && (
            <motion.div 
            layout
            initial={{opacity: 0, scale: 1}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 1}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                { transactions.filter(transaction => transaction.classification === "Expense")
                  .map(transaction => (
                    <TransactionCard key={transaction._id} updateTransactionMethod={updateTransactionMethod} transaction={transaction} deleteTransactionMethod={deleteTransactionMethod} />
                  ))

                }
            </motion.div>
        )
        }
        </AnimatePresence>

        <AnimatePresence>
        { showingOnlyIncome && (
        <motion.div 
        layout
        initial={{opacity: 0, scale: 1}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 1}}
        transition={{duration: 0.3, ease: "easeInOut"}}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
            transactions.filter(transaction => transaction.classification === "Income")
            .map(transaction => (
                <TransactionCard key={transaction._id} updateTransactionMethod={updateTransactionMethod} transaction={transaction} deleteTransactionMethod={deleteTransactionMethod} />
            ))
            }
        </motion.div>
        ) 
       
        }
        </AnimatePresence>
        </div>
        </>
    )
}