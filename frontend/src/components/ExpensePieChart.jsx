import { Link } from "react-router";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function ExpensePieChart ({expenseInfo, loadingPieCharts, convertFormat}) {
   
const COLORS = [
  "#E07A5F", // coral
  "#F28482", // soft salmon
  "#C97C5D", // clay orange
  "#B56576", // muted rose
  "#A44A3F", // brick red
  "#E29578", // terracotta
  "#D4A373", // warm sand
  "#8D6E63", // earthy brown
  "#F2CC8F", // soft beige accent
  "#D66A6A"  // dusty red
];

    const coloredData = expenseInfo.map((datapoint, index) => ( {
        ...datapoint,
        fill: COLORS[index % COLORS.length]
    }))

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
            labelLine={false}
            outerRadius={window.innerWidth < 768 ? 80 : 100}
            innerRadius={40}
            
            label={({percent, name}) => {
                if (!percent || !name) {
                    return (
                        `${0}%`
                    )
                }
                return (
                    window.innerWidth < 768 ? `${(percent * 100).toFixed(2)}%` : `${name}: ${(percent * 100).toFixed(2)}%`
                )
            }}
            >

            </Pie>
            

            <Tooltip formatter={(value) => convertFormat(value)}/>
            <Legend />
        </PieChart>
        </ResponsiveContainer>
        </>
    )
}