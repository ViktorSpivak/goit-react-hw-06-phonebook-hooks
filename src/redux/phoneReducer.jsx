import { actionType } from "./phoneConstants";
const initialState = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  { id: "id-5", name: "ennie kopeland", number: "227-91-26" }
];
export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD:
      return [...state, action.payload];
    case actionType.REMOVE:
      return [...state].filter(elem => elem.id !== action.payload);
    default:
      return state;
  }
};
export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case actionType.CHANGE:
      return action.payload;

    default:
      return state;
  }
};
