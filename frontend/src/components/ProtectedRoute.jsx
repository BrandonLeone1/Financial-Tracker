import { Navigate } from "react-router-dom";

export function ProtectedRoute ({currentUser, children, isLoading}) {
    
    if (isLoading) {
        return
    }
    
    if (!currentUser) {
       return <Navigate to={`/login`} />
    }

    return children
}