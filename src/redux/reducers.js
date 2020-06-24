import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import survey from "./survey/reducer";
import notification from "./notification/reducer";
import common from "./common/reducer";
import kmap from "./map/reducer";
import aosurvey from "./aosurvey/reducer";
import account from "./account/reducer";
import tour from "./tour/reducer";

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  notification,
  survey,
  common,
  kmap,
  aosurvey,
  account,
  tour,
});

export default reducers;
