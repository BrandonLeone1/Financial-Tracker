export function MonthlyPerformance ({totalIncomeVsTotalExpenseLastMonthPercent, convertFormat, totalIncomeWithinLastMonth, totalExpensesWithinLastMonth}) {
    return (
        <>
        <p className="font-medium text-3xl w-fit  mt-12 mb-6">Monthly performance:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className={`${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "bg-linear-to-br from-emerald-50 to-white" : "bg-linear-to-br from-rose-50 to-white"} p-6 rounded-lg flex  hover:-translate-y-1 duration-300 hover:shadow-lg flex-col items-center justify-center gap-2 text-lg `}>
                    <i className={`fa-solid fa-piggy-bank text-2xl mr-auto ${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "text-emerald-700" : "text-rose-500"}`}></i>
                    <p className="text-sm text-gray-500 font-medium">Savings rate</p>
                    <p className={`text-2xl ${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "text-emerald-700" : "text-rose-500"}`}>{Math.abs(totalIncomeVsTotalExpenseLastMonthPercent)}%</p>
                    <p className="text-xs text-gray-400">{totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "of income saved" : "overspent vs income"}
  </p>
                </div>

                <div className="bg-white hover:-translate-y-1 duration-300 p-6 hover:shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 text-base relative">
                    
                    <p className="text-sm text-gray-500 font-medium">Simple overview</p>
                    
                   <div className="flex gap-6 text-center justify-between w-full">
                    <div className="flex flex-col gap-2">
                    <i className="fa-solid fa-dollar-sign absolute top-4 left-2 text-emerald-700 text-2xl"></i>
                    <p className="text-xs text-gray-600">Monthly income:</p>
                    <p className="text-2xl">{convertFormat(totalIncomeWithinLastMonth)}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                    <i className="fa-solid fa-file-invoice absolute top-4 right-2 text-rose-500 text-2xl"></i>
                    <p className="text-xs text-gray-600">Monthly expenses:</p>
                    <p className="text-2xl">{convertFormat(totalExpensesWithinLastMonth)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-300/40 p-6 rounded-lg flex hover:shadow-lg flex-col items-center hover:-translate-y-1 duration-300 justify-center gap-2 text-base">
                    <p className="text-sm text-gray-600 font-medium">Net Monthly Result</p>
                    <p className={`text-2xl ${totalIncomeWithinLastMonth - totalIncomeWithinLastMonth > 0 ? "text-emerald-700" : "text-rose-500"}`}>{convertFormat(totalIncomeWithinLastMonth - totalExpensesWithinLastMonth)}</p>
                    { totalIncomeWithinLastMonth - totalExpensesWithinLastMonth > 0 ? (
                        <div className="flex gap-2 items-center justify-center">
                        <p className="text-sm opacity-80">You're saving money</p>
                        <i className="fa-solid fa-thumbs-up text-sm opacity-80 text-emerald-700"></i>
                        </div>
                    ) : totalIncomeWithinLastMonth - totalExpensesWithinLastMonth === 0 ? (
                        ""
                        
                    ) : (
                        <div className="flex gap-2 items-center justify-center">
                        <p className="text-sm opacity-80">You're overspending</p>
                        <i className="fa-solid fa-triangle-exclamation text-sm opacity-80 text-yellow-500"></i>
                        </div>
                    )

                    }
                </div>
            </div>
        </>
    )
}