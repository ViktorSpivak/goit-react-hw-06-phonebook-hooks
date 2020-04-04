import { configureStore } from "@reduxjs/toolkit";
import * as phoneReducer from "./phoneReducer";

const store = configureStore({
  reducer: {
    contacts: phoneReducer.contactsReducer,
    filter: phoneReducer.filterReducer,
  },
});

export default store;
