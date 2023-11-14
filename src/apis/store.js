import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import registerReducer from "../modules/AdminLearning/Register/redux/registerSlice";

const reducer = combineReducers({
  registerReducer: registerReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
