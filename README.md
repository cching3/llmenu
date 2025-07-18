# LLMenu

## Inspiration

Many of us have found ourselves with random ingredients or leftovers, unsure of how to use them; so, we created a tool that makes it easy for anyone to turn those ingredients into something delicious.

## What it does

LLMenu is an AI-powered recipe engine that takes the ingredients you have on hand and generates several meal suggestions. Our project provides recipes that make the most of your ingredients, helping you reduce food waste, save money, and encourage sustainable cooking.

## How we built it

We started by designing the user interface in Figma. For the development, we used React, TypeScript, and Convex to make our full-stack app deployment seamless. For user log-in, we integrated Clerk, providing a secure and easy way for users to sign in.

## Challenges we ran into

We faced a couple of key challenges throughout the hackathon, including the fact that none of us had prior hackathon or full-stack development experience. We had to quickly come together as a team, leverage our individual strengths, and learn new skills within the 24 hours. Additionally, we encountered issues with the LLM producing inconsistent results. We had to dive into prompt engineering to fine-tune the outputs and ensure that the recipe suggestions were relevant, which took much trial and error.

## Accomplishments that we're proud of

We built an efficient and user-friendly interface to ensure the best user experience. We also successfully integrated the LLM into our platform.


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