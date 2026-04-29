import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import {motion, AnimatePresence} from 'framer-motion';
import { useEffect } from "react";

export function Navbar () {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
  document.body.style.overflow = isOpen ? "hidden" : "auto";
}, [isOpen]);

    
    
    return (
        <>
        <header className="w-full bg-white/80 border-b border-gray-300 sticky top-0 backdrop-blur-sm z-10">
            <nav className="flex justify-between p-6 max-w-6xl mx-auto">
            <div>
                <Link to={`/dashboard`} className="text-2xl">Finance Tracker</Link>
            </div>
            
            <div className="md:flex gap-2 items-center text-lg hidden">
                <NavLink to={`/dashboard`} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Dashboard</NavLink>
                
                <NavLink to={`/transactions`} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Transactions</NavLink>

                <NavLink to={`/budgets`} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Budgets</NavLink>
            </div>
            </nav>
            
            
            
        </header>
        <div 
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-2 items-center justify-center cursor-pointer z-40 fixed top-8 right-6">
                <div className={`${isOpen && "rotate-20 translate-y-1"} font-semibold duration-300 text-black bg-black h-[4px] w-[25px]`}></div>
                <div className={`${isOpen && "-rotate-20 -translate-y-1"} font-semibold duration-300 text-black bg-black h-[4px] w-[25px]`}></div>
            </div>
<AnimatePresence>
        { isOpen && (
            <>
                <motion.div 
                
                className="bg-black/75 fixed inset-0 backdrop-blur md:hidden z-20">

                </motion.div>
                <motion.div 
                layout
                initial={{opacity: 0, x: 300}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity:0, x: 300}}
                transition={{duration: 0.3, ease: "easeInOut"}}
                className="flex font-medium text-lg flex-col gap-4 items-center justify-center md:hidden px-6 pb-6 bg-white backdrop-blur-sm z-30 fixed right-0 top-0 h-full w-[75%] overflow-x-hidden">
               
                
                <NavLink to={`/dashboard`} onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Dashboard</NavLink>
                
                <NavLink to={`/transactions`} onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Transactions</NavLink>

                <NavLink to={`/budgets`} onClick={() => setIsOpen(false)} className={({isActive}) => isActive ? `after:scale-x-100 after:content-[''] after:w-[full] after:h-[3px] after:bg-indigo-400 after:block` : "after:content-[''] after:w-[full] after:scale-x-0 after:h-[3px] after:bg-indigo-400 after:block hover:after:scale-x-100 duration-300 after:duration-300"}>Budgets</NavLink>
                </motion.div>
                </>
            )

            }
        </AnimatePresence>
        </>
    )
}