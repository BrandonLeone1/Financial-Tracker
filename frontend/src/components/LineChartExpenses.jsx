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

export function LineChartExpenses({expensesLastWeek, loadingLineCharts}) {
    
    const formattedData = expensesLastWeek.map(expense => ({
        ...expense,
        _id: expense._id.split("T")[0]
    })) 
    console.log(formattedData, "formatted")
    
    if (loadingLineCharts) {
        return (
            <div className="flex items-center justify-center h-full">
            <div class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
            </div>
        )
    }

    if (formattedData.length === 0) {
        return (
            <div>
                <p className="text-center">Add expenses to unlock weekly and monthly charts to help you track overtime!</p>
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
        <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis dataKey="total" />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#cc000a" />
            </LineChart>
        </ResponsiveContainer>
        </motion.div>
        </AnimatePresence>
        </>
    )
}