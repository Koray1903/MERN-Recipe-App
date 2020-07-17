import {combineReducers} from "redux";
import recipeReducer from "./recipe/recipeReducer";

const rootReducer = combineReducers({
  reducerRecipe: recipeReducer
});

export default rootReducer;