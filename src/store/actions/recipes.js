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
  };
};

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
  };
};

export const deleteRecipe = (index) => {
  return {
    type: actionTypes.DELETE_RECIPE,
    index,
  };
};

// Set loading to false
export const loadingOff = () => {
  return {
    type: actionTypes.LOADING_OFF,
  };
};

// Set loading to true
export const loadingOn = () => {
  return {
    type: actionTypes.LOADING_ON,
  };
};

// Upon data fetched set as true
export const dataFetched = () => {
  return {
    type: actionTypes.DATA_FETCHED,
  };
};

// Fetch recipes from firebase and update state with them
export const fetchRecipes = () => {
  return (dispatch) => {
    fetch("https://recipes-f31ef-default-rtdb.firebaseio.com/recipes.json")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log("fetched", response);
        const newRecipes = [];
        // Create recipes array
        for (let key in response) {
          newRecipes.push({ ...response[key] });
        }
        dispatch(replaceRecipes(newRecipes));
        dispatch(dataFetched());
        dispatch(updateCategories(newRecipes));
        dispatch(loadingOff());
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// Store newly added recipe to firebase and state
export const storeRecipe = (addedRecipe, history) => {
  return (dispatch) => {
    dispatch(loadingOn())
    // Add to firebase database
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${addedRecipe.id}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Added", data);

        // Add new recipe and update categories
        dispatch(addRecipe(addedRecipe));
        dispatch(updateCategories());
        dispatch(loadingOff());

        // Redirect to home page
        history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
};

// Get data from edit form and store in firebase and state
export const editStoredRecipe = (editedRecipe, index, history) => {
  return (dispatch) => {
    dispatch(loadingOn())
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${editedRecipe.id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRecipe),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Updated", data);

        // Save edited recipes and update categories
        dispatch(editRecipe(editedRecipe, index));
        dispatch(updateCategories());
        dispatch(loadingOff());

        // Redirect to home page
        history.push("/");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
};

// Delete a recipe from firebase
export const deleteStoredRecipe = (recipes, index, history) => {
  return (dispatch) => {
    dispatch(loadingOn())
    fetch(
      `https://recipes-f31ef-default-rtdb.firebaseio.com/recipes/${recipes[index].id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Deleted", data);

        // Delete recipe and update categories
        dispatch(deleteRecipe(index));
        dispatch(updateCategories());
        dispatch(loadingOff());
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
};
