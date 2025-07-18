import React, { ChangeEvent, useEffect, useState } from "react";
import popularIngredients from "./popularIngredients";
import { Ingredient } from "../types/Ingredient";

interface SearchIngredientsProps {
    selectedIngredients: Ingredient[]; // Selected ingredients controlled by parent
    onSelectedIngredientsChange: (ingredients: Ingredient[]) => void; // Callback to update parent
}
export const SearchIngredients: React.FC<SearchIngredientsProps> = ({ selectedIngredients, onSelectedIngredientsChange }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(popularIngredients);

    useEffect(() => {
        // Filter the ingredients when searchTerm changes
        const results = popularIngredients.filter(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredIngredients(results);
    }, [searchTerm]);

    const toggleChipActive = (ingredient: Ingredient) => {
        // Check if the ingredient is already selected
        const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
    
        let updatedSelectedIngredients;
        if (isSelected) {
            // If the ingredient is already selected, remove it from the list
            updatedSelectedIngredients = selectedIngredients.filter(item => item.id !== ingredient.id);
        } else {
            // If the ingredient is not selected, add it to the list
            updatedSelectedIngredients = [...selectedIngredients, { ...ingredient, hasIngredient: !isSelected }];
            console.log(updatedSelectedIngredients)
        }
        
        // Notify the parent about the updated selection
        onSelectedIngredientsChange(updatedSelectedIngredients);
    };


    const groupedIngredients = filteredIngredients.reduce((groups, ingredient) => {
        if (!groups[ingredient.foodGroup]) {
            groups[ingredient.foodGroup] = [];
        }
        groups[ingredient.foodGroup].push(ingredient);
        return groups;
    }, {} as Record<string, Ingredient[]>);

    const hasIngredients = Object.keys(groupedIngredients).length > 0;

    return (
        <div className="search-container">
            <input
                className="search-bar"
                type="text"
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                placeholder="Search for ingredients..."
            />
            {selectedIngredients.length > 0 && (
                <div className="chip-container">
                    {selectedIngredients.map(ingredient => (
                        <button
                            key={ingredient.id}
                            className="hasIngredients"
                            style={{ color: "white", backgroundColor: '#001f54', display: 'flex', overflow: 'auto' }}
                            onClick={() => toggleChipActive(ingredient)}
                        >
                            <span>{ingredient.name}</span>
                        </button>
                    ))}
                </div>
            )}
            { searchTerm && (
                <div className="chips-container">
                    {hasIngredients ? (
                        Object.keys(groupedIngredients).map(foodGroup => (
                            <div key={foodGroup} className="food-group">
                                <h3>{foodGroup}</h3>
                                {groupedIngredients[foodGroup].map(ingredient => {
                                    return (
                                        <button
                                            key={ingredient.id}
                                            className="chip-button"
                                            style={{ color: selectedIngredients.some(item => item.id === ingredient.id) ? 'white' : 'black', backgroundColor: selectedIngredients.some(item => item.id === ingredient.id) ? '#001f54' : '#f1f1f1' }}
                                            onClick={() => toggleChipActive(ingredient)}
                                        >
                                            <span>{ingredient.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <p>No Ingredients Found...</p>
                    )}
                </div>
            )}
        </div>
    );
};