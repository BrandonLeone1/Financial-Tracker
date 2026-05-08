import { useState } from "react"
import {Link} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'

export function SignUp ({addUserMethod, signedUpSuccessfully, signUpFailed}) {
    
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function handleClick () {
        await addUserMethod(newUser);

        setNewUser({
            name: "",
            email: "",
            password: ""
        })
    }
  
    return (
        <>
        <AnimatePresence>
        { signedUpSuccessfully && (
            <motion.div 
            initial={{opacity: 0, scale: 0.98, y: 40}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.98, y: 40}}
            transition={{duration: 0.25, ease: "easeInOut"}}
            className="bg-white shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] translate-x-[-50%] text-center z-100">    
                <div className="flex gap-2 items-center text-lg font-medium">
                   <i className="fa-solid fa-square-check text-emerald-700"></i>
                   <p>Added user!</p>
                </div>
            </motion.div>
        )

        }
        </AnimatePresence>

        <AnimatePresence>
        { signUpFailed && (
            <motion.div 
            initial={{opacity: 0, scale: 0.98, y: 40}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.98, y: 40}}
            transition={{duration: 0.25, ease: "easeInOut"}}
            className="bg-white shadow-md w-fit p-6 rounded-lg fixed bottom-15 left-[50%] translate-x-[-50%] text-center z-100">    
                <div className="flex gap-2 items-center text-lg font-medium">
                    <p>Failed. Please enter all info and use a proper email address.</p>
                </div>
            </motion.div>
        )

        }
        </AnimatePresence>

        <div className="flex justify-center items-center h-screen">

            <div className="bg-white p-6 rounded-lg flex flex-col gap-2 text-gray-700">
                <p className="font-medium text-xl text-gray-900">Create an account:</p>
                
                <label htmlFor="name-input" className="text-sm">Your name:
                <input 
                type="text"
                id="name-input"
                placeholder="Name..."
                className="border border-gray-300 rounded-lg mt-2 p-2 w-full"
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    name: e.target.value
                }))}
                />
                </label>
                
                <label htmlFor="email-input" className="text-sm">Your email:
                <input 
                type="email"
                id="email-input"
                placeholder="Email..."
                className="border border-gray-300 rounded-lg mt-2 p-2 w-full"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    email: e.target.value
                }))}
                />
                </label>
                <label htmlFor="password-input" className="text-sm">Your password:
                <input 
                type="password"
                id="password-input"
                placeholder="Password..."
                className="border border-gray-300 rounded-lg mt-2 p-2 w-full"
                value={newUser.password}
                onChange={(e) => setNewUser(prev => ({
                    ...prev,
                    password: e.target.value
                }))}
                />
                </label>

                <button 
                type="submit"
                onClick={handleClick}
                className="bg-indigo-400 py-1 rounded-lg text-white cursor-pointer hover:bg-indigo-500 active:scale-95 duration-300">Sign up</button>
            
                <p>Have an account? <Link to={`/login`} className="text-indigo-400 underline">Log in</Link></p>
            </div>

        </div>
        
        </>
    )
}