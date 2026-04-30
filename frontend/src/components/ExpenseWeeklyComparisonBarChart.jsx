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

export function ExpenseWeeklyComparisonBarChart ({expenseComparisonData, convertFormat}) {
    
    const formatted = expenseComparisonData.map(expense => ({
        ...expense,
        thisWeek: expense.total,
        lastWeek: expense.previousWeeksTotal,
        percentChange: expense.total === 0 ? 0 : expense.previousWeeksTotal === 0 ? 0 : ((expense.total - expense.previousWeeksTotal) / expense.previousWeeksTotal) * 100
    }))
    console.log(formatted)
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