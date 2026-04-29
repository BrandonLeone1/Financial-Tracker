import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { IncomePieChart } from "../components/IncomePieChart";
import { ExpensePieChart } from "../components/ExpensePieChart";
import { LineChartExpenses } from "../components/LineChartExpenses";
import { useState } from "react";
import { MonthlyLineChart } from "../components/MonthlyLineChart";
import {motion, AnimatePresence} from 'framer-motion'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';

export function Dashboard ({currentUser, expensesLastWeek, loadingPieCharts, loadingLineCharts, expensesLastMonth, monthlyExpenseData, getExpensesOverTime, transactions, getTransactions, budgets, getIncomeInfo, getExpenseInfo, incomeInfo, expenseInfo, getBudgetRisks, budgetRiskInfo}) {
    
    useEffect(() => {
        getTransactions()
        getIncomeInfo();
        getExpenseInfo();
        getExpensesOverTime();
        monthlyExpenseData();
        getBudgetRisks();
    }, []
)
console.log(budgetRiskInfo, "RISK INFO")

    
    const incomeList = transactions.filter(transaction => transaction.classification === "Income");
    let incomeAmountList = [];

    for (let i = 0; i < incomeList.length; i++) {
        const current = incomeList[i];

        let currentsAmount = current.amount;
        incomeAmountList.push(currentsAmount);
    }
    
    
    let totalIncome = incomeAmountList.reduce((a,b) => a + b, 0 )

    const expensesList = transactions.filter(transaction => transaction.classification === "Expense");
    let expensesAmountList = [];
    for (let x = 0; x < expensesList.length; x++) {
        const current = expensesList[x];

        const currentsAmount = current.amount;
        expensesAmountList.push(currentsAmount);

    }

    let totalExpenses = expensesAmountList.reduce((a,b) => a + b, 0);

    const recentTransactions = [];
    for (let j = transactions.length + 1; j >= transactions.length - 5; j--) {
        let recentTransaction = transactions[j];

        if (!recentTransaction) {
            continue
        }
        recentTransactions.push(recentTransaction)
    }

    console.log(recentTransactions);

    const [showingMoreBudgetInfo, setShowingMoreBudgetInfo] = useState({});

    return (
        <>
        <Navbar />
        <p className="text-3xl mt-12 p-6 text-center font-semibold">Hello {currentUser.name}!</p>

        <div className="max-w-5xl mx-auto p-6">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <motion.div 
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.2, ease: "easeIn", delay: 0.15}}
                className="bg-linear-to-br from-emerald-500/90 to-teal-600/90 text-white hover:-translate-y-1 duration-300 flex flex-col gap-4 w-full h-full p-6 shadow-md rounded-lg text-center">
                    
                    <p className="font-medium text-xl">Total income:</p>
                    <p className="text-base">$
                        { 
                            totalIncome
                        }
                    </p>
                </motion.div>

                <motion.div 
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.2, ease: "easeIn", delay: 0.2}}
                className="bg-linear-to-br from-rose-400/90 to-red-500/90 text-white hover:-translate-y-1 duration-300 flex flex-col gap-4 w-full h-full p-6 shadow-md rounded-lg text-center">
                    <p className="font-medium text-xl">Total expenses:</p>
                    <p className="text-base">$
                        { 
                           totalExpenses
                        }
                    </p>
                </motion.div>

                <motion.div 
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.2, ease: "easeIn", delay: 0.25}}
                className={`${totalIncome - totalExpenses > 0 && "bg-linear-to-br from-emerald-400/80 to-teal-600/90"} ${totalIncome - totalExpenses === 0 && "bg-linear-to-br from-slate-400/70 to-slate-600/80"} ${totalIncome - totalExpenses < 0 && "bg-gradient-to-br from-orange-400/70 to-rose-500/80"} hover:-translate-y-1 text-white duration-300 flex md:col-span-2 col-span-1 lg:col-span-1 flex-col gap-4 w-full h-full shadow-md p-6 rounded-lg text-center`}>
                    <p className="font-medium text-xl">Net balance:</p>
                    <p className={`text-base`}>
                        ${totalIncome - totalExpenses}
                    </p>
                </motion.div>

            </div>


                <p className="mt-6 text-base font-medium text-gray-900">Per category:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <motion.div 
                initial={{opacity: 0, scale: 0.98}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.25}}
                className="mx-auto w-full  p-2 rounded-xl shadow-md bg-white hover:-translate-y-1 duration-200 outline-2 outline-white/0 hover:outline-2 hover:outline-emerald-700">
                    <p className="text-center text-xs text-gray-700 mt-2">Income:</p>
                    <IncomePieChart incomeInfo={incomeInfo} loadingPieCharts={loadingPieCharts}/>
                </motion.div>

                <motion.div 
                 initial={{opacity: 0, scale: 0.98}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.25}}
                className="mx-auto w-full  p-2 rounded-xl shadow-md bg-white hover:-translate-y-1 duration-200 outline-2 outline-white/0 hover:outline-2 hover:outline-rose-500">
                    <p className="text-center text-xs text-gray-700 mt-2">Expenses:</p>
                    <ExpensePieChart expenseInfo={expenseInfo} loadingPieCharts={loadingPieCharts} />
                </motion.div>

            </div>

            <p className="mt-6 text-base font-medium text-gray-900"
            >Expenses overtime</p>
            
           
           { 
         
            <Splide  options={{speed: 1000, drag: true, wheel: true, waitForTransition: true, classes: {arrows:'splide__arrows my-arrows'}}}>
                <SplideSlide>
                        <AnimatePresence>
                    
                            <motion.div 
                            layout
                            initial={{opacity: 0, scale: 0.99}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.99}}
                            transition={{duration: 0.2, ease: "easeIn"}}
                            className="rounded-xl mt-6 shadow-md w-full bg-white p-2 hover:-translate-y-1 duration-300">
                            <p className=" mb-6 text-gray-700 text-center text-xs mt-2">Expenses within the last week:</p>
                            
                            
                            <LineChartExpenses expensesLastWeek={expensesLastWeek} loadingLineCharts={loadingLineCharts}/>
                            
                            
                            </motion.div>
                    
                        </AnimatePresence>
                </SplideSlide>

                <SplideSlide>
                        <AnimatePresence>
                    
                            <motion.div 
                            layout
                            initial={{opacity: 0, scale: 0.99}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.99}}
                            transition={{duration: 0.2, ease: "easeIn"}}
                            className="rounded-xl mt-6 shadow-md w-full bg-white p-2 hover:-translate-y-1 duration-300">
                            <p className=" mb-6 text-gray-700 text-center text-xs mt-2">Expenses within the last month:</p>
                            
                            
                            <MonthlyLineChart expensesLastMonth={expensesLastMonth} loadingLineCharts={loadingLineCharts}/>
                            
                            
                            </motion.div>
                    
                        </AnimatePresence>
                </SplideSlide>
            </Splide>
  
            }


            

            
            <p className="font-medium mt-6 text-gray-900 text-base mb-6">Buget risk:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="mx-auto w-full">
                        <p className="mb-6 font-medium text-sm">Within budget:</p>
                        <div className="flex flex-col gap-6">
                        { budgetRiskInfo.filter(budget => budget.percentUsed <= 100)
                          .toSorted((a,b) => b.percentUsed - a.percentUsed)
                          .map(budget => (
                            <div key={budget._id} className={` ${budget.percentUsed < 75 ? "hover:border hover:border-emerald-700" : budget.percentUsed >= 75 && budget.percentUsed <= 100 ? "hover:border hover:border-yellow-500" : ""} flex border border-white/0 text-sm relative w-full text-gray-800 flex-col gap-2 bg-white p-6 rounded-lg hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg`}>
                                { budget.percentUsed < 75 && (
                                    <i className="fa-solid fa-square-check top-3 right-3 text-base! absolute text-emerald-700 hover:rotate-10 duration-300"></i>
                                )

                                }
                                { budget.percentUsed >= 75 && budget.percentUsed <= 100 && (
                                    <i className="fa-solid fa-triangle-exclamation top-3 right-3 text-base! absolute text-yellow-500 hover:rotate-10 duration-300"></i>
                                ) 

                                }
                                <p className="text-black! font-medium">{budget.category}</p>
                                <p>Limit: ${budget.limit}</p>
                                <div className="w-full h-[20px] bg-gray-800 rounded-xl">
                                    <motion.div
                                    initial={{width: 0}}
                                    whileInView={{width: `${budget.percentUsed <= 100 ? budget.percentUsed : 100 }%`}}
                                    viewport={{once: true, amount: 0.6}}
                                    transition={{duration: 0.3, ease: "easeIn"}} 
                                    className={`max-w-full h-[20px] ${budget.percentUsed < 75 ? "bg-emerald-700" : "bg-yellow-500"} rounded-xl`}>

                                    </motion.div>
                                </div>


                                <div className="flex justify-between">
                                <p
                                onMouseEnter={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: true
                                }))}
                                onMouseLeave={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: false
                                }))}
                                
                                >${budget.limit - budget.amountAlreadySpent} under</p>
                                
                                <AnimatePresence>
                                { showingMoreBudgetInfo[budget._id] && (
                                    <motion.div 
                                    initial={{opacity: 0, scale: 0.98, y: 20}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.98, y: 20}}
                                    transition={{duration: 0.25, ease: "easeInOut"}}
                                    className="bg-gray-100 py-1 px-2 rounded-lg absolute bottom-3 left-[50%] -translate-x-[50%]">
                                        ${budget.amountAlreadySpent} total
                                    </motion.div>
                                )

                                }
                                </AnimatePresence>
                           
                                <p className={`${budget.percentUsed < 75 ? "text-emerald-700" : "text-yellow-500"}`}>{budget.percentUsed.toFixed(2)}%</p>
                                </div>
                            </div>
                          ))

                        }
                        </div>
                    </div>

                    <div className="mx-auto w-full">
                        <p className="mb-6 font-medium text-sm">Over budget:</p>
                        <div className="flex flex-col gap-6">
                        { budgetRiskInfo.filter(budget => budget.percentUsed > 100)
                          .toSorted((a,b) => b.percentUsed - a.percentUsed)
                          .map(budget => (
                            <div key={budget._id} className="flex relative text-sm flex-col gap-2 bg-white p-6 rounded-lg hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg hover:border hover:border-rose-500 border border-white/0">
                                <i className="fa-solid fa-fire text-rose-500 top-3 right-3 text-base! absolute hover:rotate-10 duration-300"></i>
                                <p className="text-black! font-medium">{budget.category}</p>
                                <p>Limit: ${budget.limit}</p>
                                <div className="w-full h-[20px] bg-gray-800 rounded-xl">
                                    <motion.div 
                                    initial={{width: 0}}
                                    whileInView={{width: `${budget.percentUsed <= 100 ? budget.percentUsed : 100 }%`}}
                                    viewport={{once: true, amount: 0.6}}
                                    transition={{duration: 0.3, ease: "easeIn"}} 
                                    className="max-w-full bg-rose-500 h-[20px] rounded-xl">

                                    </motion.div>
                                </div>

                                <div className="flex justify-between">
                                <p onMouseEnter={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: true
                                }))}
                                onMouseLeave={() => setShowingMoreBudgetInfo(prev => ({
                                    ...prev,
                                    [budget._id]: false
                                }))}
                                >${budget.amountAlreadySpent - budget.limit} over</p>
                                <AnimatePresence>
                                { showingMoreBudgetInfo[budget._id] && (
                                    <motion.div 
                                    initial={{opacity: 0, scale: 0.98, y: 20}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={{opacity: 0, scale: 0.98, y: 20}}
                                    transition={{duration: 0.25, ease: "easeInOut"}}
                                    className="bg-gray-100 py-1 px-2 rounded-lg absolute bottom-3 left-[50%] -translate-x-[50%]">
                                        ${budget.amountAlreadySpent} total
                                    </motion.div>
                                )

                                }
                                </AnimatePresence>
                                <p className="text-rose-700">{budget.percentUsed.toFixed(2)}%</p>
                                </div>
                            </div>
                          ))

                        }
                        </div>
                    </div>

                </div>
                
                
                <p className="font-medium mt-6 text-gray-900 text-base">Last 5 added transactions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-6">
                
                <motion.div 
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{duration: 0.25, ease: "easeIn"}}
                className="lg:col-span-3 md:col-span-2 bg-white hover:-translate-y-1 duration-300 flex shadow-md flex-col gap-4 w-full h-full p-6 rounded-lg text-center">
                        
                        <div className="flex flex-wrap gap-6 items-center justify-center mt-2">
                        { recentTransactions.map(((transaction,index) => (
                            <div key={transaction._id} className={`flex flex-col gap-4 shadow-md p-6 rounded-lg bg-white hover:-translate-y-1 duration-300 ${transaction.classification === "Income" ? "border-l-4 border-emerald-600" : "border-l-4 border-rose-600"}`}>
                            
                            <div className="flex gap-2">
                                <p className="text-sm">{index + 1}.</p>
                                <p className="text-sm">{transaction.classification}</p>
                            </div>
                            <p className="text-sm">${transaction.amount}</p>
                            <p className="text-sm text-gray-600">{transaction.date.split("T")[0].slice(5,7)}-{transaction.date.split("T")[0].slice(8)}-{transaction.date.split("T")[0].slice(0,4)}</p>
                            </div>
                        )))

                        }
                        </div>
                </motion.div>

                </div>
                    
                
                

            </div>



            
    
        
        </>
    )
}