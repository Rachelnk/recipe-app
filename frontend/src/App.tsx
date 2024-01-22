import { FormEvent, useEffect, useRef, useState } from 'react';
import "./App.css";
import * as api from "./api";
import { Recipe } from './types';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { AiOutlineSearch } from 'react-icons/ai';

type Tabs = "search" | 'favourites';

const App = () => {
  
  // state hooks
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setselectedRecipe] = useState<Recipe| undefined>(undefined)
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  const [favouriteRecipes, setFavouriteRecipe] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  // favourites tab content

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipe(favouriteRecipes.results);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchFavouriteRecipes();
  }, [])



  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try { 
      const recipes = await api.searchRecipes(searchTerm, 1)
      setRecipes(recipes.results);
      pageNumber.current = 1;


    } catch (e) {
      console.log(e);

    }
    };

    const handleViewMoreClick = async () => {
      const nextPage = pageNumber.current + 1;

      try {
        const nextRecipes = await api.searchRecipes(searchTerm, nextPage );
        setRecipes([...recipes, ...nextRecipes.results]);
        pageNumber.current = nextPage;

      } catch (error) {
      console.log(error);

      }

    };
     const addFavouriteRecipe = async (recipe: Recipe) => {
      try {
        
        await api.addFavouriteRecipe(recipe);
        setFavouriteRecipe([...favouriteRecipes, recipe])
      } catch (error) {
        console.log(error)
        
      }
     }

     const removeFavouriteRecipe = async (recipe: Recipe) => {
      try {
        await api.removeFavouriteRecipe(recipe);
        const updatedRecipes = favouriteRecipes.filter((favRecipe) => recipe.id !== favRecipe.id );
        setFavouriteRecipe(updatedRecipes);
        
      } catch (error) {
        console.log(error)        
      }
      
     };
    
  return (
    
    <div className='app-container' >
      <div className='header'>
        <img src='/hero-image.jpg'></img>
        <div className='title'>Recipes</div>
      </div>
      <div className="tabs">
        <h1 className={selectedTab === "search" ? "tab-active" : ""}
         onClick={()=> setSelectedTab("search")}>Recipe Search</h1>
        <h1 onClick={()=> setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === "search" && (<>
        <form onSubmit={(event) => handleSearchSubmit(event)}>
        <input type='text' 
        required 
        placeholder='Enter a search term...'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}></input>
      <button type="submit"><AiOutlineSearch size={40}/></button>
      </form>

      <div className='recipe-grid'>
      {recipes.map((recipe) => {
        const isFavourite = favouriteRecipes.some(
          (favRecipe) => recipe.id === favRecipe.id 
          );
        return (
          <RecipeCard
            recipe={recipe}
            onClick={() => setselectedRecipe(recipe)}
            onFavouriteButtonClick={
            isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
            }
            isFavourite={isFavourite}
             />
        );
      })}
      </div>
      
      
      <button  
      className='view-more-button'
      onClick={handleViewMoreClick}>View More </button>
      </>)}

      {selectedTab === "favourites" && (
        <div className='recipe-grid'>
          {favouriteRecipes.map((recipe) => (
          <RecipeCard 
          recipe={recipe} 
          onClick={() => setselectedRecipe(recipe)}
          onFavouriteButtonClick={removeFavouriteRecipe}
          isFavourite={true}
          />
          ))}
        </div>
      )}
      
      {selectedRecipe ? (
      <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={() => setselectedRecipe(undefined) }/>
      ) : null}

    </div> 
  );
}

export default App;