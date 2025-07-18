import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import logo from '../assets/LLMenu_logo.png'

export const HeaderSignedIn: React.FC = () => {
    return (
        <>
        <header className="navbar">
        <div className="nav-left">
            <div className="logo">
            <img src={logo} alt="LLMenu Logo" />
            </div>
            <SignedIn>
            <nav>
                <a href="/search-recipes">
                    <button className="button-search">Search New Recipe</button>
                </a>
            </nav>
            </SignedIn>
        </div>
        
        <div className="nav-right">
            <SignedOut>
            <SignInButton />
            </SignedOut>
            <SignedIn>
                <div>
                    <UserButton />
                </div>
            </SignedIn>
        </div>
        </header>
        </>
    );
};