import { Link } from "react-router";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function IncomePieChart ({incomeInfo, loadingPieCharts}) {
   
   const COLORS = [
  "#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F",
  "#EDC948", "#B07AA1", "#FF9DA7", "#9C755F", "#BAB0AC",
  "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD",
  "#8C564B", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF"
];
   
   const coloredData = incomeInfo.map((datapoint,index) => ({
    ...datapoint,
    fill: COLORS[index % COLORS.length]
   } 
   ))

   if (loadingPieCharts) {
    return (
        <div className="flex items-center justify-center h-full">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
        </div>
    )
   }

   if (incomeInfo.length === 0) {
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
        <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
            <Pie
            data={coloredData}
            dataKey={"total"}
            nameKey={"_id"}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            >
            </Pie>
            

            <Tooltip />
            <Legend />
        </PieChart>
        </ResponsiveContainer>
        </>
    )
}