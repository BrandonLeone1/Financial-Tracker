import { Navigate } from "react-router-dom";

export function PublicRoute ({currentUser, children, isLoading}) {
    
    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Waking up the server… this may take ~10 seconds</p>
            </div>
        )
    }
    
    if (currentUser) {
       return <Navigate to={`/dashboard`} />
    }

    return children
}