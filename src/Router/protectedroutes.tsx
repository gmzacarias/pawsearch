import React from "react"
import { Outlet, Navigate } from "react-router-dom";
import { useAppValue } from "Hooks";

export function ProtectedRoutes() {
    const { isLogged } = useAppValue();
    if (!isLogged) {
        return <Navigate to="/auth" />;
    }
    return <Outlet />;
}



