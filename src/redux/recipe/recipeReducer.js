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

const initialState = {
  allRecipes: [],
  fullRecipe: {},
  newRecipe: {
    _id: 0,
    recipeName: "",
    ingredients: [],
    directions: [],
    prevVersions: [],
    time: 0
  }
};

const urlReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_ALL_RECIPES:
      return {
        ...state,
        allRecipes: [...action.payload],
      };

    case GET_FULL_RECIPE:
      let recipe = state.allRecipes.filter(recipe => recipe._id === action.payload)[0];

      return {
        ...state,
        fullRecipe: recipe
      };

    case DELETE_INGREDIENT_FROM_RECIPE: {
      state.fullRecipe.ingredients.splice(action.payload.index, 1);

      return {
        ...state,
        fullRecipe: {
          ...state.fullRecipe
        }
      };
    }

    case DELETE_DIRECTION_FROM_RECIPE: {
      state.fullRecipe.directions.splice(action.payload.index, 1);

      return {
        ...state,
        fullRecipe: {
          ...state.fullRecipe
        }
      };
    }

    case ADD_INGREDIENT_TO_RECIPE:
      state.fullRecipe.ingredients.push(action.payload);

      return {
        ...state,
        fullRecipe: {
          ...state.fullRecipe
        }
      };

    case ADD_DIRECTION_TO_RECIPE:
      state.fullRecipe.directions.push(action.payload);

      return {
        ...state,
        fullRecipe: {
          ...state.fullRecipe
        }
      };


    case ADD_NEW_NAME:
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe,
          recipeName: action.payload
        }
      };

    case ADD_NEW_INGREDIENT:
      state.newRecipe.ingredients.push(action.payload);
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe
        }
      };

    case ADD_NEW_DIRECTION:
      state.newRecipe.directions.push(action.payload);
      return {
        ...state,
        newRecipe: {
          ...state.newRecipe
        }
      };

    case POST_AND_RESET:
      return {
        ...state,
        newRecipe: {
          _id: 0,
          recipeName: "",
          ingredients: [],
          directions: [],
          prevVersions: [],
          time: 0
        }
      };


    default:
      return state;
  }
};
export default urlReducer;