import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {motion, AnimatePresence} from 'framer-motion'

export function MonthlyLineChart({expensesLastMonth, loadingLineCharts, convertFormat}) {
    
    const formattedData = expensesLastMonth.map(expense => ({
        ...expense,
        _id: expense._id.split("T")[0]
    })) 

    if (loadingLineCharts) {
        return (
            <div className="flex items-center justify-center h-full">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
            </div>
        )
    }


    return (
        <>
        <AnimatePresence>
        <motion.div
            layout
            initial={{opacity: 0, scale: 0.99}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.99}}
            transition={{duration: 0.2, ease: "easeIn"}}
        >
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" tick={{dy: 10}} />
                <YAxis dataKey="total" tickFormatter={(value) => convertFormat(value)} width={93}/>
                <Tooltip formatter={(value) => convertFormat(value)}/>
                <Line type="monotone" dataKey="total" stroke="#cc000a" />
            </LineChart>
        </ResponsiveContainer>
        </motion.div>
        </AnimatePresence>
        </>
    )
}