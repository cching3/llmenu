import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider } from '@clerk/clerk-react'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
      </ClerkProvider>
    </ConvexProvider>

  </React.StrictMode>,
);