import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { AllTimeOverView } from "../components/AllTimeOverView";
import { MonthlyPerformance } from "../components/MonthlyPerformance";
import { WeeklyActivity } from "../components/WeeklyActivity";
import { TransactionsFeed } from "../components/TransactionsFeed";
import { BudgetRisk } from "../components/BudgetRisk";

export function Dashboard ({currentUser, convertFormat, getExpenseComparison, incomeWithinLastMonth, getIncomeWithinLastMonth, expenseComparisonData, expensesLastWeek, loadingPieCharts, loadingLineCharts, expensesLastMonth, monthlyExpenseData, getExpensesOverTime, transactions, getTransactions, budgets, getIncomeInfo, getExpenseInfo, incomeInfo, expenseInfo, getBudgetRisks, budgetRiskInfo}) {
    
    useEffect(() => {
        getTransactions();
        getIncomeInfo();
        getExpenseInfo();
        getExpensesOverTime();
        monthlyExpenseData();
        getBudgetRisks();
        getExpenseComparison();
        getIncomeWithinLastMonth();
    }, []
)

    const incomeList = transactions.filter(transaction => transaction.classification === "Income")
    .map(income => {
        return income.amount
    }).reduce((a,b) => a + b,0) || [];
    
    const totalIncome = incomeList

    const expensesList = transactions.filter(transaction => transaction.classification === "Expense")
    .map(expense => {
        return expense.amount
    }).reduce((a,b) => a + b, 0) || [];

    const totalExpenses = expensesList

    const recentTransactions = [];
    for (let j = transactions.length + 1; j >= transactions.length - 5; j--) {
        let recentTransaction = transactions[j];

        if (!recentTransaction) {
            continue
        }
        recentTransactions.push(recentTransaction)
    }

    const [showingMoreBudgetInfo, setShowingMoreBudgetInfo] = useState({});

    const top = expenseComparisonData ? expenseComparisonData.toSorted((a,b) => b.total - a.total)[0] : null;
    
    let expensesTotalForThisWeek = expenseComparisonData.map(expense => {
        return expense.total
    }) || [];
  
    const dailySpendingThisWeek = ((expensesTotalForThisWeek.reduce((a, b) => a + b, 0)) / 7).toFixed(2);
  
    let AllExpensesLastWeek = expenseComparisonData.map(expense => {
        return expense.previousWeeksTotal
    }) || [];
   
    const dailySpendingLastWeek = (AllExpensesLastWeek.reduce((a,b) => a + b, 0) / 7).toFixed(2);
    
    const dailySpendingChangePrevWeekVsThisWeek = dailySpendingLastWeek === 0 ? 0 : ((dailySpendingThisWeek - dailySpendingLastWeek) / dailySpendingLastWeek) * 100
    
    let totalIncomeWithinLastMonth = incomeWithinLastMonth.map(income => {
        return income.total
    }).reduce((a,b) => a + b, 0);

    let totalExpensesWithinLastMonth = expensesLastMonth.map(expense => {
        return expense.total
    }).reduce((a,b) => a + b, 0);
  
    const totalIncomeVsTotalExpenseLastMonthPercent = totalExpensesWithinLastMonth === 0 ? 0 : (((totalIncomeWithinLastMonth - totalExpensesWithinLastMonth) / totalIncomeWithinLastMonth) * 100).toFixed(2)
   
    return (
        <>
        <Navbar />
        <p className="text-xl mt-12 p-6 text-center font-semibold">Hello {currentUser.name}!</p>

        <div className="max-w-350 mx-auto p-6 grid grid-cols-1">
            
            <div>

            <AllTimeOverView convertFormat={convertFormat} totalIncome={totalIncome} totalExpenses={totalExpenses} incomeInfo={incomeInfo} expenseInfo={expenseInfo} loadingPieCharts={loadingPieCharts}/>

            <MonthlyPerformance convertFormat={convertFormat} totalIncomeVsTotalExpenseLastMonthPercent={totalIncomeVsTotalExpenseLastMonthPercent} totalIncomeWithinLastMonth={totalIncomeWithinLastMonth} totalExpensesWithinLastMonth={totalExpensesWithinLastMonth}/>
            
            <WeeklyActivity expenseComparisonData={expenseComparisonData} convertFormat={convertFormat} dailySpendingThisWeek={dailySpendingThisWeek} dailySpendingChangePrevWeekVsThisWeek={dailySpendingChangePrevWeekVsThisWeek} top={top} expensesLastWeek={expensesLastWeek} loadingLineCharts={loadingLineCharts} expensesLastMonth={expensesLastMonth}/>

            <TransactionsFeed recentTransactions={recentTransactions} convertFormat={convertFormat}/>

            <BudgetRisk budgetRiskInfo={budgetRiskInfo} convertFormat={convertFormat} showingMoreBudgetInfo={showingMoreBudgetInfo} setShowingMoreBudgetInfo={setShowingMoreBudgetInfo} />
                
        </div>

            </div>        
        </>
    )
}