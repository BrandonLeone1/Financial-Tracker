import {motion} from 'framer-motion';

export function TransactionsFeed ({recentTransactions, convertFormat}) {
    return (
        <>
        
        <p className="font-medium text-3xl  w-fit mt-12">Transactions feed:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-6">
                
                <motion.div 
               
                className="lg:col-span-3 md:col-span-2 bg-white hover:-translate-y-1 duration-300 hover:shadow-lg flex shadow-md flex-col gap-4 w-full h-full p-6 rounded-lg text-center">
                        <i className="fa-solid fa-calendar-days text-2xl text-gray-700 opacity-80"></i>
                        <p className="text-center text-base text-gray-700 font-medium">{`${recentTransactions.length > 0 ? "Last 5 added transactions:" : "Add transactions to see the last 5 listed here"}`}</p>
                        <div className="flex flex-wrap gap-6 items-center justify-center mt-2">
                        { recentTransactions.map(((transaction,index) => (
                            <div key={transaction._id} className={`flex flex-col gap-4 shadow-md p-6 rounded-lg bg-white hover:-translate-y-1 duration-300 ${transaction.classification === "Income" ? "border-l-4 border-emerald-600" : "border-l-4 border-rose-600"}`}>
                            
                            <div className="flex gap-2">
                                <p className="text-sm text-gray-600">{index + 1}.</p>
                                <p className="text-sm text-gray-600">{transaction.classification}</p>
                            </div>
                            <p className='text-sm text-gray-600'>{transaction.category}</p>
                            <p className="text-base">{convertFormat(transaction.amount)}</p>
                            <p className="text-sm text-gray-600">{transaction.date.split("T")[0].slice(5,7)}-{transaction.date.split("T")[0].slice(8)}-{transaction.date.split("T")[0].slice(0,4)}</p>
                            </div>
                        )))

                        }
                        </div>
                </motion.div>

                </div>
            
        </>
    )
}