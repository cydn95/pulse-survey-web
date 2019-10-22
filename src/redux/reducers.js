import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import survey from './survey/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  survey
});

export default reducers;