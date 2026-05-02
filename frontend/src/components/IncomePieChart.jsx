import { Link } from "react-router";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function IncomePieChart ({incomeInfo, loadingPieCharts, convertFormat}) {
   
const COLORS = [
  "#5B8FF9", // soft blue (primary income)
  "#61DDAA", // teal green (growth)
  "#65789B", // slate blue-gray
  "#7262FD", // muted purple
  "#78D3F8", // light sky blue
  "#9661BC", // soft violet
  "#2FB8A0", // deep aqua
  "#4C9F70", // muted success green
  "#8FB8D8", // dusty blue
  "#A29BFE"  // soft lavender
];
   
   const coloredData = incomeInfo.map((datapoint,index) => ({
    ...datapoint,
    fill: COLORS[index % COLORS.length]
   } 
   ))
console.log(coloredData, "colored")
   
if (loadingPieCharts) {
    return (
        <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
        </div>
    )
   }

   if (coloredData.length === 0) {
    return (
        <>
        <div className="flex flex-col gap-2 items-center justify-center h-75">
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>No info</p>
        <p><Link to="/transactions" className="underline text-indigo-400 hover:text-indigo-500 duration-300">Head to /transactions</Link> to add some!</p>
        </div>
        </>
    )
   }
    return (
        <>
        <ResponsiveContainer width={"100%"} height={350}>
        <PieChart>
            <Pie
            
            data={coloredData}
            dataKey={"total"}
            nameKey={"_id"}
            cx="50%"
            cy="50%"
            outerRadius={window.innerWidth < 768 ? 80 : 100}
            labelLine={false}
            innerRadius={40}
            label={({percent, name}) => {
                if (!percent || !name) {
                    return `${0}%`
                }
                return (
                    window.innerWidth < 768 ? `${(percent * 100).toFixed(2)}%` : `${name}: ${(percent * 100).toFixed(2)}%`
                )
            }}
            >
            </Pie>
            

            <Tooltip formatter={(value) => convertFormat(value)} />
            <Legend/>
        </PieChart>
        </ResponsiveContainer>
        </>
    )
}