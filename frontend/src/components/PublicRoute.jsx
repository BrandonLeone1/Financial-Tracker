import { Navigate } from "react-router-dom";

export function PublicRoute ({currentUser, children, isLoading}) {
    
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center p-6 mx-auto text-center">
                <p>Waking up the server… this may take up to 30 seconds</p>
            </div>
        )
    }
    
    if (currentUser) {
       return <Navigate to={`/dashboard`} />
    }

    return children
}