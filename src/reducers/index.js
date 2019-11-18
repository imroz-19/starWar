import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import login from './login';
import planets from './planetList';

const rootReducer = combineReducers({
  form: formReducer,
  login: login,
  planets: planets
});

export default rootReducer;
