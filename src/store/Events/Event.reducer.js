import { isEmpty } from "lodash";
import { ADD_EVENT, UPDATE_EVENT } from "./Event.constant";

const initialState = {
  events: {},
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      const { time, event } = action.payload;
      return {
        ...state,
        events: {
          ...state.events,
          [time]: event,
        },
      };
    case UPDATE_EVENT:
      const { data = {}, hourLabel } = action.payload;
      if (!isEmpty(data)) {
        const { time } = data;
        if (state.events[hourLabel]) {
          delete state.events[hourLabel];
          state.events[time] = data;
        }
      }
      return state;

    default:
      return state;
  }
};

export default eventsReducer;
