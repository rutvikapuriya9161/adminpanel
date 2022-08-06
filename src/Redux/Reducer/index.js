import { combineReducers } from "redux";
import { counterReducer } from "../Reducer/Counter.Reducer";

export const rootReducer = combineReducers({
    counter: counterReducer
})