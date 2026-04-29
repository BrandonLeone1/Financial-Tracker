import { Navigate } from "react-router-dom";

export function PublicRoute ({currentUser, children, isLoading}) {
    
    if (isLoading) {
        return
    }
    
    if (currentUser) {
       return <Navigate to={`/dashboard`} />
    }

    return children
}