import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { useEffect } from "react";
import { BudgetCard } from "../components/BudgetCard";
import {motion, AnimatePresence} from 'framer-motion'
export function Budgets({budgets, getBudgets, addBudgetMethod, deletedBudget, addedBudgetSuccessfully, deleteBudget, editBudget, budgetInfo, getBudgetInfo}) {
    

    useEffect(() => {
        getBudgets()
    }, []
    )

    useEffect(() => {
        getBudgetInfo();
    }, []
    )

    const [addingBudget, setAddingBudget] = useState(false);
    
    const [newBudget, setNewBudget] = useState({
        category: "",
        limit: 0
    })

    async function handleAddClick () {

        await addBudgetMethod(newBudget);

        setNewBudget({
            category: "",
            limit: 0
        })
        setAddingBudget(false)
    }

    const hasFood = budgets.some(budget => budget.category === "Food")
    const hasRent = budgets.some(budget => budget.category === "Rent")
    const hasTransportation = budgets.some(budget => budget.category === "Transportation")
    const hasShopping = budgets.some(budget => budget.category === "Shopping")
    const hasUtilities = budgets.some(budget => budget.category === "Utilities")
    const hasInvestments = budgets.some(budget => budget.category === "Investments")
    const hasOther = budgets.some(budget => budget.category === "Other")

    const budgetMap = Object.fromEntries(budgetInfo.map(item => {
    return [item._id, item.total]
}))

    
    return (
        <>
            <Navbar />
            <AnimatePresence>
            { addedBudgetSuccessfully && (
                <motion.div 
                initial={{opacity: 0, scale: 0.98, y: 40}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.98, y: 40}}
                className="bg-slate-100 shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] -translate-x-[50%] text-center z-100">
                
                <div className="flex gap-2 items-center text-lg font-medium">
                    <i className="fa-solid fa-square-check text-emerald-700"></i>
                    <p>Added new budget!</p>
                </div>
                

            </motion.div>
            )

            }

            <AnimatePresence>
            { deletedBudget && (
                <motion.div 
                initial={{opacity: 0, scale: 0.98, y: 40}}
                animate={{opacity: 1, scale: 1, y: 0}}
                exit={{opacity: 0, scale: 0.98, y: 40}}
                className="bg-slate-100 shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] -translate-x-[50%] text-center z-100">
                
                <div className="flex gap-2 items-center text-lg font-medium">
                    <i className="fa-solid fa-square-check text-emerald-700"></i>
                    <p>Deleted budget!</p>
                </div>
                

            </motion.div>
            )

            }
            </AnimatePresence>

            </AnimatePresence>
            <div>
                <p className="text-center mt-12 text-3xl font-semibold p-6">Your budgets:</p>
                { budgets.length < 1 ? (
                    <p className="text-center text-xl font-medium">No budgets found! <button onClick={() => setAddingBudget(true)} className="text-indigo-400 underline  hover:text-indigo-500 duration-300 cursor-pointer">Click to add one!</button></p>
                ): (
                    <p className="text-center text-xl font-medium">Total: ({budgets.length}), <button onClick={() => setAddingBudget(true)} className="text-indigo-400 underline hover:text-indigo-500 duration-300 cursor-pointer">click to add another!</button></p>
                )
                }

                <AnimatePresence>
                { addingBudget && (
                    <motion.div 
                    layout
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2, ease: "easeInOut"}}
                    className="flex fixed inset-0 h-screen bg-black/75 backdrop-blur-sm items-center justify-center z-50">

                        <motion.div 
                        layout
                        initial={{opacity: 0, scale: 0.98}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.98}}
                        transition={{duration: 0.2, ease: "easeInOut"}}
                        className="bg-white p-6 max-w-[90%] mx-auto rounded-lg flex flex-col gap-4 z-50">
                            
                            <div className="flex gap-2 justify-between items-center">
                            <p className="text-xl font-medium">Adding a budget</p>
                            <i onClick={() => setAddingBudget(false)} className="fa-solid fa-arrow-right-from-bracket text-xl text-rose-500 hover:text-rose-800 duration-300 cursor-pointer"></i>
                            </div>

                            <label htmlFor="budget-category"><span className="font-medium">Category for budget:</span>
                            <select 
                            id="budget-category"
                            value={newBudget.category}
                            onChange={(e) => setNewBudget(prev => ({
                                ...prev,
                                category: e.target.value
                            }))}
                            className="border p-2 w-full mt-2 rounded-xl border-gray-300 cursor-pointer focus:border-indigo-400">
                                <option defaultValue>Choose a category</option>
                                
                                { hasFood ? (
                                <option value={`Food`} disabled>Food</option>
                                ) : (
                                <option value={`Food`}>Food</option>
                                )
                                }

                                { hasRent ? (
                                <option value={`Rent`} disabled>Rent</option>
                                ) : (
                                <option value={`Rent`}>Rent</option>
                                )
                                }

                                {hasTransportation ? (
                                    <option value={`Transportation`} disabled>Transportation</option>
                                ) : (
                                <option value={`Transportation`}>Transportation</option>
                                )
                                }

                                { hasUtilities ? (
                                <option value={`Utilities`} disabled>Utilities</option>
                                ) : (
                                <option value={`Utilities`}>Utilities</option>
                                )
                                }

                                {hasShopping ? (
                                    <option value={`Shopping`} disabled>Shopping</option>
                                ) : (
                                    <option value={`Shopping`}>Shopping</option>
                                )
                                 }

                                { hasInvestments ? (
                                <option value={`Investments`} disabled>Investments</option>
                                ) : (
                                <option value={`Investments`}>Investments</option>
                                )
                                }

                                { hasOther ? (
                                <option value={`Other`} disabled>Other</option>
                                ) : (
                                <option value={`Other`}>Other</option>  
                                )
                                }
                            </select>
                            </label>

                            <label htmlFor="limit-input"><span className="font-medium">Budget limit</span>
                            <input 
                            id="limit-input"
                            value={newBudget.limit}
                            onChange={(e) => setNewBudget(prev => ({
                                ...prev,
                                limit: Number(e.target.value)
                            }))}
                            type="number"
                            
                            className="border p-2 mt-2 w-full rounded-xl border-gray-300 focus:border-indigo-400"
                            />
                            </label>
                            <button className="cursor-pointer border border-indigo-400 rounded-lg py-1 hover:bg-indigo-400 font-medium duration-300 hover:text-white" onClick={handleAddClick}>Add budget</button>
                        </motion.div>
                    </motion.div>
                )

                }
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl p-6 mx-auto mt-6">
                { budgets.map(((budget,index) => (
                    <BudgetCard key={budget._id} budgetMap={budgetMap} index={index} budget={budget} deleteBudget={deleteBudget} editBudget={editBudget} budgetInfo={budgetInfo}/>
                )))

                }
                
                </div>

                

            </div>
        </>
    )
}