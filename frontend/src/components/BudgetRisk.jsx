import {motion, AnimatePresence} from 'framer-motion'
import { Link } from 'react-router'

export function BudgetRisk ({budgetRiskInfo, showingMoreBudgetInfo, setShowingMoreBudgetInfo, convertFormat}) {
    return (
        <>
        <p className="font-medium text-3xl  w-fit mt-6 mb-6">Budget risk:</p>
            {    budgetRiskInfo.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="mx-auto w-full">
                        <p className="mb-6 font-medium text-sm w-fit px-2">Within budget:</p>
                        <div className="flex flex-col gap-6">
                        { budgetRiskInfo.filter(budget => budget.percentUsed <= 100)
                          .toSorted((a,b) => b.percentUsed - a.percentUsed)
                          .map(budget => (
                            <div key={budget._id} className={` ${budget.percentUsed < 75 ? "hover:border hover:border-emerald-700" : budget.percentUsed >= 75 && budget.percentUsed <= 100 ? "hover:border hover:border-yellow-500" : ""} flex border border-white/0  relative w-full text-gray-800 flex-col gap-2 bg-white p-6 rounded-lg hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg`}>
                                { budget.percentUsed < 75 && (
                                    <i className="fa-solid fa-square-check top-3 right-3 text-base! absolute text-emerald-700 hover:rotate-10 duration-300"></i>
                                )

                                }
                                { budget.percentUsed >= 75 && budget.percentUsed <= 100 && (
                                    <i className="fa-solid fa-triangle-exclamation top-3 right-3 text-base! absolute text-yellow-500 hover:rotate-10 duration-300"></i>
                                ) 

                                }
                                <p className="text-black! font-medium text-lg">{budget.category}</p>
                                <p className='text-sm'>Limit: {convertFormat(budget.limit)}</p>
                                <div className="w-full h-5 bg-gray-800 rounded-xl">
                                    <motion.div
                                    initial={{width: 0}}
                                    whileInView={{width: `${budget.percentUsed <= 100 ? budget.percentUsed : 100 }%`}}
                                    viewport={{once: true, amount: 0.6}}
                                    transition={{duration: 0.3, ease: "easeIn"}} 
                                    className={`max-w-full h-5 ${budget.percentUsed < 75 ? "bg-emerald-700" : "bg-yellow-500"} rounded-xl`}>

                                    </motion.div>
                                </div>


                                <div className="flex justify-between items-center">
                                <p
                                onMouseEnter={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: true
                                }))}
                                onMouseLeave={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: false
                                }))}
                                className='text-base'
                                >{convertFormat(budget.limit - budget.amountAlreadySpent)} under</p>
                                
                                <AnimatePresence>
                                { showingMoreBudgetInfo[budget._id] && (
                                    <motion.div 
                                    initial={{opacity: 0, scale: 0.98, y: 20}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.98, y: 20}}
                                    transition={{duration: 0.25, ease: "easeInOut"}}
                                    className="bg-gray-100 py-1 px-2 rounded-lg absolute bottom-3 left-[50%] translate-x-[-50%] text-sm">
                                        {convertFormat(budget.amountAlreadySpent)} total
                                    </motion.div>
                                )

                                }
                                </AnimatePresence>
                           
                                <p className={`${budget.percentUsed < 75 ? "text-emerald-700" : "text-yellow-500"} text-base`}>{budget.percentUsed.toFixed(2)}%</p>
                                </div>
                            </div>
                          ))

                        }
                        </div>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="mb-6 font-medium text-sm w-fit px-2 ">Over budget:</p>
                        <div className="flex flex-col gap-6">
                        { budgetRiskInfo.filter(budget => budget.percentUsed > 100)
                          .toSorted((a,b) => b.percentUsed - a.percentUsed)
                          .map(budget => (
                            <div key={budget._id} className="flex relative flex-col gap-2 bg-white p-6 rounded-lg hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg hover:border hover:border-rose-500 border border-white/0">
                                <i className="fa-solid fa-fire text-rose-500 top-3 right-3 text-base! absolute hover:rotate-10 duration-300"></i>
                                <p className="text-black! font-medium text-lg">{budget.category}</p>
                                <p className='text-sm'>Limit: {convertFormat(budget.limit)}</p>
                                <div className="w-full h-5 bg-gray-800 rounded-xl">
                                    <motion.div 
                                    initial={{width: 0}}
                                    whileInView={{width: `${budget.percentUsed <= 100 ? budget.percentUsed : 100 }%`}}
                                    viewport={{once: true, amount: 0.6}}
                                    transition={{duration: 0.3, ease: "easeIn"}} 
                                    className="max-w-full bg-rose-500 h-5 rounded-xl">

                                    </motion.div>
                                </div>

                                <div className="flex justify-between items-center">
                                <p onMouseEnter={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: true
                                }))}
                                onMouseLeave={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: false
                                }))}
                                className='text-base'
                                >{convertFormat(budget.amountAlreadySpent - budget.limit)} over</p>
                                <AnimatePresence>
                                { showingMoreBudgetInfo[budget._id] && (
                                    <motion.div 
                                    initial={{opacity: 0, scale: 0.98, y: 20}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.98, y: 20}}
                                    transition={{duration: 0.25, ease: "easeInOut"}}
                                    className="bg-gray-100 py-1 px-2 rounded-lg absolute bottom-3 text-sm left-[50%] -ranslate-x-[-50%]">
                                        {convertFormat(budget.amountAlreadySpent)} total
                                    </motion.div>
                                )

                                }
                                </AnimatePresence>
                                <p className="text-rose-700 text-base">{budget.percentUsed.toFixed(2)}%</p>
                                </div>
                            </div>
                          ))

                        }
                        </div>
                    </div>

                </div>
            ) : (
                <p>Add budgets on <Link to={`/budgets`} className='underline text-indigo-400 font-medium hover:text-indigo-500 duration-300'>/budgets</Link> to track your all-time expenses and compare to what you would like to spend for each category.</p>
            )
}
        </>
    )
}