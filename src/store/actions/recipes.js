import * as actionTypes from "../actions/actionTypes";


export const updateCategories = () => {
  return {
    type: actionTypes.UPDATE_CATEGORIES,
  };
};


export const toggleCategory = (name) => {
  return {
    type: actionTypes.TOGGLE_CATEGORY,
    name,
  };
};


export const replaceRecipes = (newRecipes) => {
  return {
    type: actionTypes.REPLACE_RECIPES,
    newRecipes,
  }
} 


export const addRecipe = (newRecipe) => {
  return {
    type: actionTypes.ADD_RECIPE,
    newRecipe: newRecipe,
  };
};


export const editRecipe = (editedRecipe, index) => {
  return {
    type: actionTypes.EDIT_RECIPE,
    editedRecipe,
    index,
  }
}

export const deleteRecipe = (index) => {
  return {
    type: actionTypes.DELETE_RECIPE,
    index,
  }
}
