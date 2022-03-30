import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, UPDATE_FAVORITE } from "../actions/actions";

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;

    default:
      return state;
  }
}

function user(
  state = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    Favorites: []
  }, 
  action
  ) {
    const { field, value } = action;
    switch (action.type) {
      case SET_USER:
        return value;

      case UPDATE_USER:
        return {
          ...state,
          [field]: value
        };

      case UPDATE_FAVORITE:
        return {
          ...state,
          [field]: [...value]
        };
      default:
        return state;
    } 
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;