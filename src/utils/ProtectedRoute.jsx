import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.score.isAuthenticated)

    return (isAuthenticated ? children : <Navigate to="/" />)
}

export default ProtectedRoute;
