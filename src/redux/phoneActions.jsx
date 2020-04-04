import { actionType } from "./phoneConstants";
import { createAction } from "@reduxjs/toolkit";

export const recordAdd = createAction(actionType.ADD);
export const recordRemove = createAction(actionType.REMOVE);
export const changeFilter = createAction(actionType.CHANGE);
