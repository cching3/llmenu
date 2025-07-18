import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/clerk-react";

function Home() {
    return (<div>
        <SignInButton/>
    </div>
)};

export default Home;