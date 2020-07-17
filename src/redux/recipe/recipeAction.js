import {
  FETCH_ALL_RECIPES,

  ADD_NEW_INGREDIENT,
  ADD_NEW_DIRECTION,
  ADD_NEW_NAME,
  POST_AND_RESET,

  GET_FULL_RECIPE,
  DELETE_INGREDIENT_FROM_RECIPE,
  DELETE_DIRECTION_FROM_RECIPE,
  ADD_INGREDIENT_TO_RECIPE,
  ADD_DIRECTION_TO_RECIPE,
} from "./recipeTypes";

import axios from "axios";
import {v4 as uuidv4} from 'uuid';

export const fetchAllRecipes = () => {
  return (dispatch) => {
    axios.get("https://mernrecipeapi.herokuapp.com/recipes/")
      .then(res => dispatch(fetchedRecipes(res.data)));
  };
};

export const fetchedRecipes = (data) => {
  return {
    type: FETCH_ALL_RECIPES,
    payload: data
  };
};

export const createNewRecipe = (recipeName, ingredients, directions) => {
  return (dispatch) => {
    axios.post("https://mernrecipeapi.herokuapp.com/recipes/add",
      {
        "_id": uuidv4(),
        "directions": [...directions],
        "ingredients": [...ingredients],
        "prevVersions": [],
        "recipeName": recipeName,
        "time": (new Date()).getTime(),
        "_v": undefined
      })
      .then(() => dispatch(resetNewRecipe()));
  };
};

export const resetNewRecipe = () => {
  return {
    type: POST_AND_RESET
  };
};

export const deleteRecipe = (id) => {
  return () => {
    axios.delete(`https://mernrecipeapi.herokuapp.com/recipes/${id}`);
  };
};

export const addNewName = (data) => {
  return {
    type: ADD_NEW_NAME,
    payload: data
  };
};

export const addNewIngredient = (data) => {
  return {
    type: ADD_NEW_INGREDIENT,
    payload: data
  };
};


export const addNewDirection = (data) => {
  return {
    type: ADD_NEW_DIRECTION,
    payload: data
  };
};


export const getFullRecipe = (id) => {
  return {
    type: GET_FULL_RECIPE,
    payload: id
  };
};

export const deleteIngredientFromRecipe = (id, index) => {
  return {
    type: DELETE_INGREDIENT_FROM_RECIPE,
    payload: {
      id: id,
      index: index
    }
  };
};

export const deleteDirectionFromRecipe = (id, index) => {
  return {
    type: DELETE_DIRECTION_FROM_RECIPE,
    payload: {
      id: id,
      index: index
    }
  };
};

export const addIngredientToRecipe = (data) => {
  return {
    type: ADD_INGREDIENT_TO_RECIPE,
    payload: data
  };
};


export const addDirectionToRecipe = (data) => {
  return {
    type: ADD_DIRECTION_TO_RECIPE,
    payload: data
  };
};

export const addNewRecipeVersion = (ingredients, directions, id) => {

  return () => {
    axios.post(`https://mernrecipeapi.herokuapp.com/recipes/update/${id}`,
      {
        "ingredients": [...ingredients],
        "directions": [...directions],
      });
  };
};