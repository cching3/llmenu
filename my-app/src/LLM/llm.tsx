import React, { useState } from 'react';
import axios from 'axios';
import './../App.css';
import { Ingredient } from '../types/Ingredient';

interface LLMProps {
  selectedIngredients: Ingredient[]
}

export const LLM: React.FC<LLMProps> = ( { selectedIngredients } ) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const SINGLE_INPUT = (ingredients: String) => {

    return(
      `Come up with as many popular recipe using a combination of some of these ingredients: <ingredients> ${ingredients} </ingredients>. You do not need to use every ingredient given, especially if the combination is not well-known. Return in this format: 

      "---
      Recipe Title: 
      
      Time to Cook:
      
      Ingredients: 
      
      How to Make: 
      
      Number of Servings:
      
      Ingredients used from <ingredients>:
      
      Ingredients not used from <ingredients>:
      
      Ingredients needed not in <ingredients>:"
      `
    )
  };

  const ingredients: Ingredient[] = selectedIngredients

  const ingredientNames = ingredients.map(ingredient => ingredient.name).join(", ");
  interface Recipe {
    "Recipe Title": string;
    "Time to Cook": string;
    "Ingredients": string[];
    "How to Make": string[];
    "Number of Servings": string;
    "Ingredients used from <ingredients>": string;
    "Ingredients not used from <ingredients>": string;
    "Ingredients needed not in <ingredients>": string;
  }
  
  function parseRecipeText(text: string): Recipe[] {
    const recipes: Recipe[] = [];
    const recipeTexts: string[] = text.split('---').slice(1); // Split by '---' and remove the first empty element
  
    for (const recipeText of recipeTexts) {
      const recipe: Partial<Recipe> = {};
      const lines: string[] = recipeText.trim().split('\n');
  
      let currentKey: keyof Recipe | null = null;
  
      for (let i = 0; i < lines.length; i++) {
        const line: string = lines[i].trim();
        
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(part => part.trim());
          currentKey = key as keyof Recipe;
          
          switch (currentKey) {
            case "Recipe Title":
            case "Time to Cook":
            case "Number of Servings":
            case "Ingredients used from <ingredients>":
            case "Ingredients not used from <ingredients>":
            case "Ingredients needed not in <ingredients>":
              recipe[currentKey] = value;
              break;
            case "Ingredients":
            case "How to Make":
              recipe[currentKey] = [];
              if (value) {
                recipe[currentKey]!.push(value);
              }
              break;
          }
        } else if (currentKey) {
          if (currentKey === "Ingredients" && line.startsWith('-')) {
            recipe[currentKey]!.push(line.substring(1).trim());
          } else if (currentKey === "How to Make" && /^\d+\./.test(line)) {
            recipe[currentKey]!.push(line.replace(/^\d+\.\s*/, '').trim());
          }
        }
      }
  
      recipes.push(recipe as Recipe);
    }
  
    return recipes;
  }


  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "" },
            { role: "user", content: SINGLE_INPUT(ingredientNames) }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setResponse(result.data.choices[0].message.content);
      response.replace(/\*/g, "");
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setResponse(`Error ${error.response.status}: ${error.response.data.error.message}`);
        } else if (error.request) {
          setResponse('No response received from the server. Please check your internet connection.');
        } else {
          setResponse('An error occurred while setting up the request.');
        }
      } else {
        setResponse('An unexpected error occurred.');
      }
    }

    setIsLoading(false);
  };

  const printRecipes = (recipes: Recipe[]) => {
    return recipes.map((recipe, index) => (
      <div key={index}>
        <h3>{recipe["Recipe Title"]}</h3>
        <p>Time to Cook: {recipe["Time to Cook"]}</p>
        <p>Ingredients: {recipe["Ingredients"].join(", ")}</p>
        <p>How to Make:</p>
        <ol>
          {recipe["How to Make"].map((step, stepIndex) => (
            <li key={stepIndex}>{step}</li>
          ))}
        </ol>
        <p>Number of Servings: {recipe["Number of Servings"]}</p>
        <p>Ingredients used: {recipe["Ingredients used from <ingredients>"]}</p>
        <p>Ingredients not used: {recipe["Ingredients not used from <ingredients>"]}</p>
        <p>Additional ingredients needed: {recipe["Ingredients needed not in <ingredients>"]}</p>
      </div>
    ));
  };

  const recipes: Recipe[] = response ? parseRecipeText(response) : [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleRowClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    // <div style={{alignItems: 'right'}}>
    //   <button className='generating-button' onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Generate Recipes'}</button>

    //   {recipes && recipes.length > 0 ? (
    //     <div>
    //       {printRecipes(recipes)}
    //     </div>
    //   ) : (
    //     <p>No recipes generated yet.</p>
    //   )}
    // </div>
    <div>
      <button className='generating-button' onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Generate Recipes'}
      </button>
      {recipes.length > 0 ? (
        <table className='recipe-table'>
          <thead>
            <tr>
              <th>Recipe Title</th>
              <th>Time to Cook</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleRowClick(index)} className='recipe-row'>
                  <td>{recipe["Recipe Title"]}</td>
                  <td>{recipe["Time to Cook"]}</td>
                </tr>
                {expandedIndex === index && (
                  <tr>
                    <td colSpan={2}>
                      <div>
                        <p><strong>Ingredients:</strong> {recipe["Ingredients"].join(", ")}</p>
                        <p><strong>How to Make:</strong></p>
                        <ol>
                          {recipe["How to Make"].map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                        <p><strong>Number of Servings:</strong> {recipe["Number of Servings"]}</p>
                        <p><strong>Ingredients used:</strong> {recipe["Ingredients used from <ingredients>"]}</p>
                        <p><strong>Ingredients not used:</strong> {recipe["Ingredients not used from <ingredients>"]}</p>
                        <p><strong>Additional ingredients needed:</strong> {recipe["Ingredients needed not in <ingredients>"]}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Recipes Found...</p>
      )}
    </div>
  );
}