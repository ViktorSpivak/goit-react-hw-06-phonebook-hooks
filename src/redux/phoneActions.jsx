import { actionType } from "./phoneConstants";
export const recordAdd = value => ({
  type: actionType.ADD,
  payload: value
});
export const recordRemove = value => ({
  type: actionType.REMOVE,
  payload: value
});
export const changeFilter = value => ({
  type: actionType.CHANGE,
  payload: value
});
