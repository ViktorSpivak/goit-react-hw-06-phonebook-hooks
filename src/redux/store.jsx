import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import * as phoneReducer from "./phoneReducer";

const rootReducers = combineReducers({
  contacts: phoneReducer.contactsReducer,
  filter: phoneReducer.filterReducer
});
const store = createStore(rootReducers, devToolsEnhancer());

export default store;
