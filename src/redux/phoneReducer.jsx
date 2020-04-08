import { actionType } from "./phoneConstants";
import { createReducer } from "@reduxjs/toolkit";
let initialState = JSON.parse(localStorage.getItem("contacts")) || [];
const upDateLocalStorage = (state) => {
  localStorage.setItem("contacts", `${JSON.stringify(state)}`);
};
export const contactsReducer = createReducer(initialState, {
  [actionType.ADD]: (state, action) => {
    const newState = [...state, action.payload];
    upDateLocalStorage(newState);
    return newState;
  },
  [actionType.REMOVE]: (state, action) => {
    const newState = [...state].filter((elem) => elem.id !== action.payload);
    upDateLocalStorage(newState);
    return newState;
  },
});
export const filterReducer = createReducer("", {
  [actionType.CHANGE]: (state, action) => action.payload,
});
