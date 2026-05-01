import {motion, AnimatePresence} from 'framer-motion'
import { IncomePieChart } from './IncomePieChart'
import { ExpensePieChart } from './ExpensePieChart'

export function AllTimeOverView({totalIncome, convertFormat, totalExpenses, incomeInfo, expenseInfo, loadingPieCharts}) {
    return (
        <>
        
        <p className="text-3xl font-medium w-">All-time overview:</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div 
                className="text-gray-900 justify-center items-center hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col gap-3 w-full h-full p-6 shadow-md rounded-lg text-center bg-linear-to-br from-emerald-50 to-white">
                    <i className="fa-solid fa-money-bill-trend-up text-emerald-700 text-2xl"></i>
                    <p className="font-medium text-sm text-gray-600">Total income:</p>
                    <p className="text-2xl">{convertFormat(totalIncome)}
                    </p>
                </div>

                <div 
                className="text-gray-900 bg-linear-to-br from-rose-50 to-white justify-center items-center hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col gap-3 w-full h-full p-6 shadow-md rounded-lg text-center ">
                    <i className="fa-solid fa-receipt text-2xl text-rose-500"></i>
                    <p className="font-medium text-sm text-gray-600">Total expenses:</p>
                    <p className="text-2xl">{convertFormat(totalExpenses)}
                    </p>
                </div>

                <div 
                className={`${totalIncome - totalExpenses > 0 && "bg-linear-to-br from-emerald-400/80 to-teal-600/90"} ${totalIncome - totalExpenses === 0 && "bg-linear-to-br from-slate-400/70 to-slate-600/80"} ${totalIncome - totalExpenses < 0 && "bg-linear-to-br from-orange-400/70 to-rose-500/80"} hover:-translate-y-1 text-white duration-300 flex flex-col gap-3 w-full col-span-1 md:col-span-2 lg:col-span-1  justify-center items-center h-full shadow-md p-6 rounded-lg text-center hover:shadow-lg`}>
                    <i className="fa-solid fa-scale-balanced text-2xl"></i>
                    <p className="font-medium text-sm text-white">Net balance:</p>
                    <p className={`text-2xl`}>{convertFormat(totalIncome - totalExpenses)}</p>
                </div>

            </div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div 
                
                className="mx-auto w-full flex flex-col opacity-90 justify-center items-center h-full  p-2 rounded-xl shadow-md bg-white hover:-translate-y-1 duration-200 outline-2 outline-white/0 hover:outline-2 hover:outline-emerald-700 ">
                    <p className="text-center text-sm text-gray-800 mt-2 font-medium">Total income breakdown:</p>
                    <IncomePieChart incomeInfo={incomeInfo} loadingPieCharts={loadingPieCharts} convertFormat={convertFormat}/>
                </div>
                     
                <div 
                 
                className="mx-auto w-full flex flex-col h-full opacity-90 justify-center items-center p-2 rounded-xl shadow-md bg-white hover:-translate-y-1 duration-200 outline-2 outline-white/0 hover:outline-2 hover:outline-rose-500">
                    <p className="text-center text-sm text-gray-800 mt-2 font-medium">Total expense breakdown:</p>
                    <ExpensePieChart expenseInfo={expenseInfo} loadingPieCharts={loadingPieCharts} convertFormat={convertFormat} />
                </div>
                </div>

        </>
    )
}