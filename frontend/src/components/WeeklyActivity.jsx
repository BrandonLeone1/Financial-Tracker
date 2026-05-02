import {motion, AnimatePresence} from 'framer-motion';
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import { ExpenseWeeklyComparisonBarChart } from './ExpenseWeeklyComparisonBarChart';
import { LineChartExpenses } from './LineChartExpenses';
import { MonthlyLineChart } from './MonthlyLineChart';


export function WeeklyActivity ({expenseComparisonData, convertFormat, dailySpendingThisWeek, dailySpendingChangePrevWeekVsThisWeek, top, expensesLastWeek, loadingLineCharts, expensesLastMonth }) {
    return (
        <>
        <p className="text-3xl font-medium  w-fit  mt-12 mb-6">Weekly activity:</p>
            
             
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 h-full w-full bg-white rounded-xl shadow-md hover:-translate-y-1 duration-200 hover:shadow-lg">
               
               { expenseComparisonData.length > 0 && (
                <p className="text-center text-sm text-gray-800 mt-2 font-medium">This week's vs previous' expenses</p>
               )    
            }
                <ExpenseWeeklyComparisonBarChart expenseComparisonData={expenseComparisonData} convertFormat={convertFormat}/>
            </div>
            
            <div className='flex flex-col gap-2 justify-center'>
                 
            <div className="flex flex-col lg:gap-2 gap-6 bg-slate-100/50 p-6 rounded-lg shadow-md border border-slate-200/70 hover:shadow-lg duration-300">
            <p className="font-medium text-sm w-fit mb-2">Weekly insights:</p>
            <div className="mx-auto text-center flex flex-col gap-4 bg-linear-to-br from-emerald-50 to-white duration-200 hover:shadow-lg hover:-translate-y-1 p-6 w-full h-full lg:row-span-1 rounded-lg shadow-md">
                    <i className="fa-solid fa-money-bill text-2xl text-emerald-700"></i>
                    <p className='text-sm text-gray-600 font-medium'>Avg. Daily spending (last 7 days)</p>
                    { 

                    }
                    <p className="text-2xl">{convertFormat(dailySpendingThisWeek)}</p>
                  
                { !Number.isNaN(dailySpendingChangePrevWeekVsThisWeek) ? (
                    <div className="flex flex-col mx-auto text-center text-sm">
                        <span className='text-sm text-gray-600'>{dailySpendingChangePrevWeekVsThisWeek > 0 ? "Spending increased vs last week" : dailySpendingChangePrevWeekVsThisWeek === 0 ? "No change vs last week" : "Spending decreased vs last week"}</span>
                        <p className={`${dailySpendingChangePrevWeekVsThisWeek > 0 ? "text-rose-500" : dailySpendingChangePrevWeekVsThisWeek === 0 ? "" : "text-emerald-700"} text-sm`}>{dailySpendingChangePrevWeekVsThisWeek.toFixed(2) }%</p>
                    </div>
                ) : (
                    <div className="flex flex-col mx-auto text-center text-sm">
                        <p>No data yet</p>
                    </div>
                )    
            }
            
            </div>
                <div 
                    className="bg-linear-to-br from-yellow-50 to-white text-gray-900 hover:-translate-y-1 hover:shadow-lg duration-200 flex flex-col gap-4 w-full h-full p-6 shadow-md rounded-lg text-center">
                       <i className="fa-solid fa-bell text-2xl text-yellow-500"></i>
                        <p className="text-gray-700 text-sm font-medium">This week you're spending the most on:</p>
                    
                    <div className="flex gap-2 items-center justify-center text-2xl">
                    
                    { top ? (
                        <>
                    <p>
                        
                        {top._id}:
                        
                        </p>

                        <p>
                        
                        {convertFormat(top.total)}
                        </p>
                </>
                    ): (
                        <p>no data yet</p>
                    )
                    }
                        </div>
                          
                    </div>
                
                </div>
                </div>
                
                { expensesLastMonth.length > 0 && expensesLastWeek.length > 0 ? (
                <>
                <p className="font-medium text-sm w-fit px-2 bg-slate-200 py-1 rounded-lg">What your spending looks like on a day-to-day basis:</p>
               
             
                <div className="lg:col-span-3 h-full w-full rounded-xl shadow-md hover:-translate-y-1 duration-200 hover:shadow-lg bg-gray-100">
               
               
                <Splide  options={{speed: 1000, drag: true, wheel: true, waitForTransition: true, classes: {arrows:'splide__arrows my-arrows'}}}>
                <SplideSlide>
                        <AnimatePresence>
                    
                            <motion.div 
                            layout
                            initial={{opacity: 0, scale: 0.99}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.99}}
                            transition={{duration: 0.2, ease: "easeIn"}}
                            className="rounded-xl mt-6 shadow-md w-full bg-gray-100 p-2 ">
                            <p className=" mb-6 text-gray-700 text-center text-xs font-medium ">Expenses within the last week:</p>
                                               
                            <LineChartExpenses expensesLastWeek={expensesLastWeek} loadingLineCharts={loadingLineCharts} convertFormat={convertFormat}/>
                                                 
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
                            className="rounded-xl mt-6 shadow-md w-full bg-gray-100 p-2">
                            <p className=" mb-6 text-gray-700 text-center text-xs font-medium">Expenses within the last month:</p>
                                                  
                            <MonthlyLineChart expensesLastMonth={expensesLastMonth} loadingLineCharts={loadingLineCharts} convertFormat={convertFormat}/>
                                                       
                            </motion.div>
                    
                        </AnimatePresence>
                </SplideSlide>
            </Splide>
            
            </div>
            </>
               ) : (
                ""
               )
            }
            
            </div>
        
        </>
    )
}