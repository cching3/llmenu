import React from "react";
import { HeaderSignedIn } from "./HeaderSignedIn";
import { Footer } from "./Footer";

interface FooterProps {
    mainContent: any,
}
export const PageFormat: React.FC<FooterProps> = ({ mainContent }) => {
    return (
        <>
        <div className="page-format">
            <HeaderSignedIn/>
            <main className="main-content">
                { mainContent }
            </main>
            
            <Footer/>
        </div>
        </>


    );
};
