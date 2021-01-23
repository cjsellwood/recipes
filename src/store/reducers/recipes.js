import * as actionTypes from "../actions/actionTypes";

const initialState = {
  recipes: [],
  categories: [],
  dataFetched: false,
  loading: true,
};

// Create new categories from stored recipes
const updateCategories = (state, action) => {
  const newCategories = {};
  for (let i = 0; i < state.recipes.length; i++) {
    newCategories[state.recipes[i].category.toLowerCase()] = true;
  }
  return {
    ...state,
    categories: newCategories,
  };
};

// Toggle checked category for filtering
const toggleCategory = (state, action) => {
  return {
    ...state,
    categories: {
      ...state.categories,
      [action.name]: !state.categories[action.name],
    },
  };
};

// Function to duplicate recipes deeply
const duplicateRecipes = (state) => {
  const newRecipes = [];
  for (let i = 0; i < state.recipes.length; i++) {
    const recipeObj = {
      name: state.recipes[i].name,
      category: state.recipes[i].category,
      time: state.recipes[i].time,
      ingredients: [...state.recipes[i].ingredients],
      method: [...state.recipes[i].method],
    };
    newRecipes.push(recipeObj);
  }
  return newRecipes;
};

// Replace all recipes with new ones
const replaceRecipes = (state, action) => {
  return {
    ...state,
    recipes: action.newRecipes,
  };
};

// Add new recipe to state
const addRecipe = (state, action) => {
  return {
    ...state,
    recipes: duplicateRecipes(state).concat(action.newRecipe),
  };
};

// Edit one specified recipe
const editRecipe = (state, action) => {
  const newRecipes = duplicateRecipes(state);
  newRecipes.splice(action.index, 1, action.editedRecipe);
  return {
    ...state,
    recipes: newRecipes,
  };
};

// Delete specified recipe
const deleteRecipe = (state, action) => {
  const newRecipes = duplicateRecipes(state);
  newRecipes.splice(action.index, 1);
  return {
    ...state,
    recipes: newRecipes,
  };
};

const loadingOff = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const loadingOn = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const dataFetched = (state, action) => {
  return {
    ...state,
    dataFetched: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CATEGORIES:
      return updateCategories(state, action);
    case actionTypes.TOGGLE_CATEGORY:
      return toggleCategory(state, action);
    case actionTypes.REPLACE_RECIPES:
      return replaceRecipes(state, action);
    case actionTypes.ADD_RECIPE:
      return addRecipe(state, action);
    case actionTypes.EDIT_RECIPE:
      return editRecipe(state, action);
    case actionTypes.DELETE_RECIPE:
      return deleteRecipe(state, action);
    case actionTypes.LOADING_OFF:
      return loadingOff(state, action);
    case actionTypes.LOADING_ON:
      return loadingOn(state, action);
    case actionTypes.DATA_FETCHED:
      return dataFetched(state, action);
    default:
      return state;
  }
};

export default reducer;
