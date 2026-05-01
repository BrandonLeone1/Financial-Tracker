import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'

export function BudgetCard ({budget, index, budgetMap, deleteBudget, editBudget}) {



const infoForThisBudget = budgetMap[budget.category] || 0;


    async function handleDeleteClick (id) {
        await deleteBudget(id)
    }
const progress = budget.limit > 0 ? Math.floor((infoForThisBudget/budget.limit) * 100) : 0;
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const [updatedBudget, setUpdatedBudget] = useState({
        limit: budget.limit
    });
    const [editingBudget, setEditingBudget] = useState(false);

    async function handleEditClick (id) {
        await editBudget(id, updatedBudget);

        setUpdatedBudget({
            limit: updatedBudget.limit
        })
        setEditingBudget(false)
    }



    return (
        <>
            <motion.div 
            
                        initial={{opacity: 0, scale: 0.98, y: 40}}
                        whileInView={{opacity: 1, scale: 1, y: 0}}
                        viewport={{once: true, amount: 0.25}}
                        transition={{duration: 0.25 + (index * 0.035)}}
            
            className="mx-auto flex flex-col gap-2 bg-white p-6 rounded-xl shadow-md hover:-translate-y-1 duration-300 w-full text-center">

               { !editingBudget ? (
               <>
                <div className={`flex gap-2 ml-auto text-lg ${progress > 100 && "justify-between w-full"}`}>
                     { progress > 100 && (
                        <div className="-mt-2 flex">
                        <i className="fa-solid fa-exclamation text-rose-500"></i>
                        <p className="text-rose-500 text-sm font-medium">Over budget!</p>
                        </div>
                        )

                }
                   
                   <div className="flex items-center gap-2">
                    <i 
                    onClick={() => setEditingBudget(true)}
                    className="fa-regular fa-pen-to-square text-gray-700 cursor-pointer hover:text-gray-950 duration-300 -mt-2"></i>
                    <i className="fa-solid fa-circle-minus text-rose-500 -mt-2 cursor-pointer hover:text-rose-800 duration-300" onClick={() => setConfirmingDelete(true)}></i>
                    </div>
                </div>
                <p className="font-medium">{budget.category}</p>
                <p className="text-sm">Limit: ${budget.limit}</p>
                <p className="text-sm">Current spending: ${infoForThisBudget > 0 ? infoForThisBudget : "0"}</p>
                <div className="w-full rounded-lg bg-gray-900 h-5">
                    <div
                    style={{width: `${progress}%`}}
                    className={`${progress > 100 && "bg-rose-500"} bg-emerald-700 h-5 max-w-full rounded-lg text-sm`}></div>
                </div>
                <p className={`${progress > 100 && "text-rose-500"} text-sm`}>{((infoForThisBudget/budget.limit) * 100).toFixed(2)}%</p>
               
               </>
               ): (
                <div className="flex flex-col gap-2 items-center justify-center h-full">
                    <label htmlFor="new-limit">New limit?
                    <input 
                    value={updatedBudget.limit}
                    onChange={(e) => setUpdatedBudget(prev => ({
                        ...prev,
                        limit: e.target.value
                    }))}
                    id="new-limit"
                    type="number"
                    className="border border-gray-300 p-2 mt-2 rounded-lg"
                    />
                    </label>
                    <button onClick={() => handleEditClick(budget._id)} className="font-medium border w-full rounded-lg border-indigo-400 hover:bg-indigo-400 hover:text-white duration-300 cursor-pointer">Finish</button>
                </div>
               )   
            }
                </motion.div>
            
            <AnimatePresence>
            { confirmingDelete && (
                <motion.div 
                layout
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                className="fixed inset-0 flex h-screen items-center justify-center bg-black/75 backdrop-blur-sm z-50">
                    <motion.div 
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.98}}
                    transition={{duration: 0.2, ease: "easeInOut"}}
                    className="bg-white p-6 rounded-lg z-50 flex flex-col gap-4 items-center justify-center text-center">
                        <i className="fa-solid fa-circle-exclamation  text-rose-500 text-xl"></i>
                        <p className="text-xl font-medium">Are you sure you would like to delete this budget?</p>
                        
                        <div className="flex gap-4 justify-center items-center">
                        <button 
                        
                        onClick={() => setConfirmingDelete(false)}
                        className="cursor-pointer font-medium after:content-[''] after:block after:h-0.75 after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:duration-300"
                        >Cancel</button>
                        <button 
                        className="cursor-pointer font-medium text-rose-500 after:content-[''] after:block after:h-0.75 after:w-full after:bg-rose-500 after:scale-x-0 hover:after:scale-x-100 after:duration-300"
                        onClick={() => handleDeleteClick(budget._id)}>Delete</button>
                        </div>
                    </motion.div>
                </motion.div>
            )

            }
            </AnimatePresence>
        </>
    )
}