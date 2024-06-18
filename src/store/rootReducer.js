import { combineReducers } from "redux";
import eventsReducer from "./Events/Event.reducer";

const rootReducer = combineReducers({ events: eventsReducer });
export default rootReducer;
