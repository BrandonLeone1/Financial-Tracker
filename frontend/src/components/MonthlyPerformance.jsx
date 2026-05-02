export function MonthlyPerformance ({totalIncomeVsTotalExpenseLastMonthPercent, previousMonthIncomeTotal, totalIncomeVsTotalExpensePreviousMonthPercent, previousMonthExpenseTotal, convertFormat, totalIncomeWithinLastMonth, totalExpensesWithinLastMonth}) {
    return (
        <>
        <p className="font-medium text-3xl w-fit  mt-12 mb-6">Monthly performance:</p>
        
        { totalIncomeWithinLastMonth || totalExpensesWithinLastMonth ? (
        <p className="font-medium text-sm w-fit px-2 bg-slate-200 py-1 rounded-lg mb-6">{totalIncomeWithinLastMonth > totalExpensesWithinLastMonth ? "You're managing your finances well this month" : "Your spending is exceeding your income this month"}</p>
        )  : (
          <p className="font-medium text-sm w-fit px-2 bg-slate-200 py-1 rounded-lg mb-6">No data yet</p>
        )
      }
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white/60 p-6 rounded-lg backdrop-blur-sm shadow-md">
                
                <div className={`${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "bg-linear-to-br from-emerald-50 to-white" : "bg-linear-to-br from-rose-50 to-white"} p-6 rounded-lg flex  hover:-translate-y-1 duration-300 hover:shadow-lg flex-col items-center justify-center gap-2 text-lg `}>
                    <i className={`fa-solid fa-piggy-bank text-2xl mr-auto ${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "text-emerald-700" : "text-rose-500"}`}></i>
                    <p className="text-sm text-gray-600 font-medium">Savings rate</p>
                   
                    <p className={`text-3xl ${totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "text-emerald-700" : "text-rose-500"}`}>{Math.abs(totalIncomeVsTotalExpenseLastMonthPercent)}%</p>
                    <p className="text-xs text-gray-500">{totalIncomeVsTotalExpenseLastMonthPercent > 0 ? "of income saved" : "overspent vs income"}
  </p>
  { totalIncomeVsTotalExpensePreviousMonthPercent < 0 ? (
  <>
  <div className="flex gap-2">
  
  <p className="text-gray-600 text-sm">Δ: {(totalIncomeVsTotalExpenseLastMonthPercent - totalIncomeVsTotalExpensePreviousMonthPercent).toFixed(2)} PP</p>
  
  { totalIncomeVsTotalExpenseLastMonthPercent > totalIncomeVsTotalExpensePreviousMonthPercent ? (
  <i className="fa-solid fa-arrow-trend-up text-emerald-800"></i>
  ) : (
    <i className="fa-solid fa-arrow-trend-down text-rose-500"></i>
  )
    }
  </div>
  <p className="text-xs text-gray-600 text-center">Previous month: you spent {Math.abs(totalIncomeVsTotalExpensePreviousMonthPercent)}% more than your income</p>
  
  </>
  )
   : (
    <>
    <div className="flex gap-2">
    
    <p className="text-gray-600 text-sm">Δ: {(totalIncomeVsTotalExpenseLastMonthPercent - totalIncomeVsTotalExpensePreviousMonthPercent).toFixed(2)} PP</p>
    { totalIncomeVsTotalExpenseLastMonthPercent > totalIncomeVsTotalExpensePreviousMonthPercent ? (
  <i className="fa-solid fa-arrow-trend-up text-emerald-800"></i>
  ) : (
    <i className="fa-solid fa-arrow-trend-down text-rose-500"></i>
  )
    }


    </div>
    
    <p className="text-xs text-gray-600 text-center">Previous month: you saved {Math.abs(totalIncomeVsTotalExpensePreviousMonthPercent)}% of your income</p>
    </>
  )
}
  
                </div>

                <div className="bg-gray-100/70 hover:-translate-y-1 duration-300 p-6 hover:shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 text-base relative">
                    
                    <p className="text-sm text-gray-600 font-medium">Simple overview</p>
                    
                   <div className="flex gap-6 text-center justify-between w-full">
                    <div className="flex flex-col gap-2">
                    <i className="fa-solid fa-dollar-sign absolute top-4 left-2 text-emerald-700 text-2xl"></i>
                    <p className="text-xs text-emerald-700">Income:</p>
                    <p className="text-2xl">{convertFormat(totalIncomeWithinLastMonth)}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                    <i className="fa-solid fa-file-invoice absolute top-4 right-2 text-rose-500 text-2xl"></i>
                    <p className="text-xs text-rose-500">Expenses:</p>
                    <p className="text-2xl">{convertFormat(totalExpensesWithinLastMonth)}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 w-full h-5 rounded-lg">
                    <div style={{width: `${ (totalExpensesWithinLastMonth/totalIncomeWithinLastMonth * 100) > 100 ? "100%" : (totalExpensesWithinLastMonth / totalIncomeWithinLastMonth) * 100}%`}} className="bg-rose-500 h-5 rounded-lg"></div>
                  </div>
                  <p className="text-rose-500">{totalExpensesWithinLastMonth === 0 ? 0 : ((totalExpensesWithinLastMonth / totalIncomeWithinLastMonth) * 100).toFixed(2)}%</p>
                </div>

                <div className="bg-gray-300/35 p-6 rounded-lg flex hover:shadow-lg flex-col items-center hover:-translate-y-1 duration-300 justify-center gap-2 text-base">
                    <p className="text-sm text-gray-600 font-medium">Net Monthly Result</p>
                    <p className={`text-2xl ${totalIncomeWithinLastMonth - totalExpensesWithinLastMonth > 0 ? "text-emerald-700" : "text-rose-500"}`}>{convertFormat(totalIncomeWithinLastMonth - totalExpensesWithinLastMonth)}</p>
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