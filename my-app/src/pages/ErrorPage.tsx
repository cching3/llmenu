import React from "react";
import { useNavigate } from "react-router-dom";
import { PageFormat } from "../shared/PageFormat";

export const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    const mainContent = <>
        <h1>Error 404</h1>
        <p> The page you have requested is not found.</p>
        <button className='error-button' onClick={() => navigate("/")}>Go Back to Dashboard</button>
        </>
    return (
        <>
        <PageFormat mainContent={mainContent}/>
        </>
    );
};
