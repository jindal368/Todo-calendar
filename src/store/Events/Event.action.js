// src/redux/actions.js

import { ADD_EVENT, UPDATE_EVENT } from "./Event.constant";

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: event,
});
export const updateEvent = (data, hourLabel) => ({
  type: UPDATE_EVENT,
  payload: { data, hourLabel },
});
