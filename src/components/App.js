import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid'

 export const RecipeContext = React.createContext()
 const LOCAL_STORAGE_KEY = 'reactRecipesApp.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeID] = useState()
  const [recipes, setRecipes] = useState(sampleRecipes)
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete, 
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeID(id)
  }

  function handleRecipeAdd() {
    const newRecipe  = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {
          id: uuidv4(), 
          name: '',
          amount: ''
        }
      ]
    }
    
    setSelectedRecipeID(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      selectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={ recipeContextValue }>
      <RecipeList recipes={ recipes } />
      {selectedRecipe && <RecipeEdit recipe={ selectedRecipe }/>}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Chicken',
    servings: 2,
    cookTime: '1:45',
    instructions: "1. Put Salt on the Chicken\n2. Put Chicken in the Oven\n3. Eat the Chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '1 Kg'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put Paprika on the Pork\n2. Put the Pork in Oven\n3. Eat the pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '2 Kg'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      }
    ]
  }
]

export default App;