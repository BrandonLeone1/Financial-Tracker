import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'
export function TransactionCard ({transaction, deleteTransactionMethod, updateTransactionMethod}) {
    
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const [editingTransaction, setEditingTransaction] = useState(false);
    const [updatedTransaction, setUpdatedTransaction] = useState(transaction);

    async function handleDeleteClick () {
        await deleteTransactionMethod(transactionToDelete);
        setTransactionToDelete(null);
    }

    async function handleUpdateClick () {
        await updateTransactionMethod(updatedTransaction);
        setEditingTransaction(false)
    }
   
    return (
        <>

        <AnimatePresence>
        { confirmingDelete && (
            <motion.div 
            layout
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2, ease: "easeInOut"}}
            className="flex fixed inset-0 items-center justify-center bg-black/75 backdrop-blur-sm z-50">

                <motion.div 
                initial={{opacity: 0, scale: 0.98}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.98}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                className="bg-white p-6 rounded-lg max-w-[90%] mx-auto z-50 flex flex-col items-center gap-2 min-h-[30vh] md:min-h-[25vh] max-h-[80vh] justify-center text-center">  
                <i className="fa-solid fa-circle-exclamation text-xl text-rose-500"></i>
                <p className="text-xl font-medium">Are you sure you would like to delete this transaction?</p>
                
                <div className="flex gap-4 items-center justify-center">
                    <button onClick={() => {
                        setConfirmingDelete(false);
                        setTransactionToDelete(null);
                        }} className="cursor-pointer font-medium after:content-[''] after:block after:h-0.75 after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:duration-300">
                            Cancel</button>
                    <button onClick={handleDeleteClick}
                    className="cursor-pointer font-medium text-rose-500 after:content-[''] after:block after:h-0.75 after:w-full after:bg-rose-500 after:scale-x-0 hover:after:scale-x-100 after:duration-300"
                    >
                        Delete
                    </button>
                </div>
                
                </motion.div>
            </motion.div>
        )

        }
        </AnimatePresence>


            <div
            className="flex text-center flex-col bg-white gap-2 mx-auto shadow-md p-6 rounded-lg border border-white/0 hover:border-indigo-400 hover:shadow-lg duration-300 hover:-translate-y-1 w-full h-fit">
               
               
               { !editingTransaction ? (
                <>
               <div className="flex gap-2 ml-auto -mt-2">
               <i 
               onClick={() => setEditingTransaction(true)}
               className="fa-regular text-lg fa-pen-to-square text-gray-700 cursor-pointer hover:text-gray-950 duration-300"></i>

                <i 
                onClick={() => { 
                    setConfirmingDelete(true);
                    setTransactionToDelete(transaction._id);
                }
                }
                className="fa-solid fa-circle-minus text-red-500 text-lg cursor-pointer hover:text-red-800 duration-300"></i>
                </div>
                
                <p className="font-medium">{transaction.classification}</p>
                <p className="text-sm">${transaction.amount}</p>
                <p className="text-sm">{transaction.category}</p>
                <p className="text-sm text-gray-700">{transaction.date.split("T")[0].slice(5,7)}-{transaction.date.split("T")[0].slice(8)}-{transaction.date.split("T")[0].slice(0,4)}</p>
                { transaction.note.length >= 1 ? (
                    <p className="text-sm">{transaction.note}</p>
                ) : (
                    <p className="text-gray-400 text-sm">No notes</p>
                )

                }
            </>
            ): (
                <>
                <select
                className="border border-gray-300 p-2 rounded-lg cursor-pointer focus:border-indigo-400"
                value={updatedTransaction.classification}
                onChange={(e) => setUpdatedTransaction(prev => ({
                    ...prev,
                    classification: e.target.value
                }))}
                >
                    <option value={`Income`}>Income</option>
                    <option value={`Expense`}>Expense</option>
                </select>
                <input
                type="number"
                value={updatedTransaction.amount}
                onChange={(e) => setUpdatedTransaction(prev => ({
                    ...prev,
                    amount: e.target.value
                }))}
                className="border border-gray-300 p-2 rounded-lg focus:border-indigo-400"
                />
                <textarea 
                value={updatedTransaction.note}
                onChange={(e) => setUpdatedTransaction(prev => ({
                    ...prev,
                    note: e.target.value
                }))}
                className="border border-gray-300 p-2 rounded-lg focus:border-indigo-400"
                placeholder="New note contents..."
                />

                <button onClick={handleUpdateClick} className="border rounded-lg border-indigo-400 cursor-pointer hover:bg-indigo-400 hover:text-white duration-300 ">Update</button>
                </>
            )
            }
            </div>
        </>
    )
}