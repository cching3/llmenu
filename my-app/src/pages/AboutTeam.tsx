import React from "react";
import { PageFormat } from "../shared/PageFormat";
import ProfileGrid from "../shared/ProfileGrid";
import team from '../assets/team2.png';

export const AboutTeamPage: React.FC = () => {
    const mainContent = <>
    <div className="about">
        <div className='left'>
            <h1>Meet the LLMenu Team</h1>
            <p> At LLMenu, we're passionate about making your cooking experience 
            both delightful and sustainable. Here's a peek behind the scenes 
            at the team dedicated to helping you reduce food waste and create 
            delicious meals:</p>
        </div>
        <div className='right'>
        <img src={team} alt="Team" className='img' style={{margin: '100px'}}/>
        </div>
            <ProfileGrid></ProfileGrid>
            </div>
        
    </>
    return (
        <>
            <PageFormat mainContent={mainContent}/>
        </>
    );
};
