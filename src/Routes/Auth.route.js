import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import RejesterPage from "../pages/Auth/Rejester.page";
import LoginPage from "../pages/Auth/Login.page";

function AuthRoute(props) {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RejesterPage />} />
            <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
    );
}

export default AuthRoute;