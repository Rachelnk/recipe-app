import { Recipe } from "./types";
// https://recipe-search-kx1b.onrender.com
export const searchRecipes = async (searchTerm: string, page:number) => {
  // const baseUrl = new URL ("http://localhost:5000/api/recipes/search");
  const baseUrl = new URL ("https://recipe-search-kx1b.onrender.com/api/recipes/search")

  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  // const fetch = require("node-fetch")
  const response = await fetch(baseUrl);
  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)

  }

  return response.json();
}

export const getRecipeSummary = async (recipeId: string) => {
  // const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const url = new URL(`https://recipe-search-kx1b.onrender.com/api/recipes/${recipeId}/summary`)
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();

};

export const getFavouriteRecipes = async() => {
  // const url = new URL('http://localhost:5000/api/recipes/favourite')
  const url = new URL('https://recipe-search-kx1b.onrender.com/api/recipes/favourite')
  const response = await fetch(url);

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);

  }

  return response.json();

};
 
export const addFavouriteRecipe = async (recipe: Recipe) => {
  // const url = new URL('http://localhost:5000/api/recipes/favourite')
  const url = new URL('https://recipe-search-kx1b.onrender.com/api/recipes/favourite')
  const body = {
    recipeId: recipe.id,
  };

  const response =  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)

  }
    
}

export const removeFavouriteRecipe = async(recipe: Recipe) => {
  const url = new URL('https://recipe-search-kx1b.onrender.com/api/recipes/favourite')
  const body = {
    recipeId: recipe.id,
  };

  const response =  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if(!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)

  }

}