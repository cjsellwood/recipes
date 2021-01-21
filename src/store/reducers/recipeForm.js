import * as actionTypes from "../actions/actionTypes";

const initialState = {
  details: {
    name: "",
    category: "",
    time: "",
  },
  ingredients: [""],
  method: [""],
};

const setDetails = (state, action) => {
  return {
    ...state,
    details: {
      ...state.details,
      [action.key]: action.value,
    },
  };
};

const resetRecipeForm = (state, action) => {
  return { ...initialState };
};

const addListInput = (state, action) => {
  return {
    ...state,
    [action.key]: [...state[action.key], ""],
  };
};

const removeListInput = (state, action) => {
  const arrayCopy = [...state[action.key]];
  arrayCopy.splice(action.index, 1);
  return {
    ...state,
    [action.key]: arrayCopy,
  };
};

const setListInput = (state, action) => {
  const arrayCopy2 = [...state[action.key]];
  arrayCopy2[action.index] = action.value;
  return {
    ...state,
    [action.key]: arrayCopy2,
  };
};

const replaceList = (state, action) => {
  return {
    ...state,
    [action.key]: [...action.array],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DETAILS:
      return setDetails(state, action);
    case actionTypes.RESET_RECIPE_FORM:
      return resetRecipeForm(state, action);
    case actionTypes.ADD_LIST_INPUT:
      return addListInput(state, action);
    case actionTypes.REMOVE_LIST_INPUT:
      return removeListInput(state, action);
    case actionTypes.SET_LIST_INPUT:
      return setListInput(state, action);
    case actionTypes.REPLACE_LIST:
      return replaceList(state, action);
    default:
      return state;
  }
};

export default reducer;
