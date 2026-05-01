import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { CustomToolTip } from "./CustomToolTip";
import { Link } from "react-router";

export function ExpenseWeeklyComparisonBarChart ({expenseComparisonData, convertFormat}) {
    
    const formatted = expenseComparisonData.map(expense => ({
        ...expense,
        thisWeek: expense.total,
        lastWeek: expense.previousWeeksTotal,
        percentChange: expense.total === 0 ? 0 : expense.previousWeeksTotal === 0 ? 0 : ((expense.total - expense.previousWeeksTotal) / expense.previousWeeksTotal) * 100
    }))
    console.log(formatted)

    if (formatted.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <p>No info yet. Head over to <Link to={`/transactions`} className='underline text-indigo-400 font-medium hover:text-indigo-500 duration-300'>/transactions to unlock insights</Link></p>
            </div>
        )
    }
    return (
        <>
       
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={formatted}>
        <XAxis dataKey="_id" />
        <YAxis tickFormatter={(value) => convertFormat(value)} width={93}/>
        <Tooltip content={<CustomToolTip />}/>
        <Legend />
        
        <Bar dataKey="thisWeek" fill="#7c86ff" />
        <Bar dataKey="lastWeek" fill="#4D4D4D" />
        
        
      </BarChart>
    </ResponsiveContainer>
  
        
        </>
    )
}