import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import { services } from "../services";
import profile from "./profile";
import section from "./section";

const reducer = combineReducers({
  auth,
  profile,
  section,
  ...services,
});

export default reducer;
