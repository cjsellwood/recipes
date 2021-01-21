import * as actionTypes from "./actionTypes";

// Handle input changes in form
export const setDetails = (key, value) => {
  return {
    type: actionTypes.SET_DETAILS,
    key: key,
    value: value,
  };
};

// Clear all previously entered inputs
export const resetRecipeForm = () => {
  return {
    type: actionTypes.RESET_RECIPE_FORM,
  };
};

// Add a new input field to the specified list (method or ingredients)
export const addListInput = (key) => {
  return {
    type: actionTypes.ADD_LIST_INPUT,
    key: key,
  };
};

// Set value of the currently focused list input field
export const setListInput = (key, index, value) => {
  return {
    type: actionTypes.SET_LIST_INPUT,
    key: key,
    index: index,
    value: value,
  };
};

// Remove a specified list input field from list
export const removeListInput = (key, index) => {
  return {
    type: actionTypes.REMOVE_LIST_INPUT,
    key: key,
    index: index,
  };
};

// Replace list so that it can be edited
export const replaceList = (key, array) => {
  return {
    type: actionTypes.REPLACE_LIST,
    key: key,
    array: array,
  };
};
