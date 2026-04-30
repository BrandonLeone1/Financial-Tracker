export function CustomToolTip ({active, payload, label}) {
    if (!active || !payload || !label) {
        return null
    }

    const data = payload[0]?.payload;

    return (
        <>
        <div className="bg-white p-6 border border-gray-300">
            <p className="semi-bold">{label}</p>
            <p>This week: ${data.thisWeek}</p>
            <p>Last week: ${data.lastWeek}</p>

            <p className={`${data.percentChange >= 0 ? "text-rose-500" : "text-emerald-700"}`}>
                Change: {data.percentChange >= 0 ? "+" : ""}{data.percentChange.toFixed(2)}%
            </p>
        </div>
        
        </>
    )
}