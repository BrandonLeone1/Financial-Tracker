import { useState } from "react"
import {Link} from 'react-router-dom'


export function LogIn ({logInUserMethod}) {
    
    
    const [existingUser, setExistingUser] = useState({
            email: "",
            password: ""
        })
    
        async function handleClick () {
            await logInUserMethod(existingUser);
    
            setExistingUser({
                email: "",
                password: ""
            })
        }
    
    
    
    return (
        <>
        
        <div className="flex justify-center items-center h-screen">

            <div className="bg-white p-6 rounded-lg flex flex-col gap-2 text-gray-700">
                <p className="font-medium text-xl text-gray-900">Sign into your account:</p>
                
                <label htmlFor="email-input" className="text-sm">Your email:
                <input 
                type="email"
                id="email-input"
                placeholder="Email..."
                className="border border-gray-300 rounded-lg mt-2 p-2 w-full"
                value={existingUser.email}
                onChange={(e) => setExistingUser(prev => ({
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
                value={existingUser.password}
                onChange={(e) => setExistingUser(prev => ({
                    ...prev,
                    password: e.target.value
                }))}
                />
                </label>

                <button 
                onClick={handleClick}
                className="bg-indigo-400 py-1 rounded-lg text-white cursor-pointer hover:bg-indigo-500 active:scale-95 duration-300">Log in</button>
            
                <p>Don't an account? <Link to={`/`} className="text-indigo-400 underline">Sign up</Link></p>
            </div>

        </div>
        
        </>
    )
}