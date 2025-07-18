# LLMenu

## Inspiration

Many of us have found ourselves with random ingredients or leftovers, unsure of how to use them; so, I created a tool that makes it easy for anyone to turn those ingredients into something delicious.

## What it does

LLMenu is an AI-powered recipe engine that takes the ingredients you have on hand and generates several meal suggestions. Our project provides recipes that make the most of your ingredients, helping you reduce food waste, save money, and encourage sustainable cooking.

## How I built it

I started by designing the user interface in Figma. For the development, I used React, TypeScript, and Convex to make our full-stack app deployment seamless. For user log-in, I integrated Clerk, providing a secure and easy way for users to sign in.


<!-- npm install convex
npm install @clerk/clerk-react
npm install react-router-dom
npm install openai
npm install axios

add this key to .env.local:
to run the app: npm run dev


LLM Prompt: 
Come up with as many popular recipe using a combination of some of these ingredients: <ingredients>garlic, butter, chives, onions, pasta, lobster, chicken, shrimp </ingredients>. You do not need to use every ingredient given, especially if the combination is not well-known. Return in the format. 

"Recipe Title: 

Time to Cook:

Ingredients: 

How to Make: 

Number of Servings:

Ingredients used from <ingredients>:

Ingredients not used from <ingredients>:

Ingredients needed not in <ingredients>:
" -->
