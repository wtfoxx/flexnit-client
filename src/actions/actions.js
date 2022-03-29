export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_INPUT = 'UPDATE_INPUT';
export const UPDATE_FAVORITE = 'ADD_FAVORITE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUser(value) {
  return { type: SET_USER, value };
}

export function updateInput(
  value = {Username: '', Password: '', Email: '', Birthday: '' },
  field = null
) {
  return { type: UPDATE_INPUT, value, field };
}

export function updateFavorite(value, field='Favorites') {
  return { type: UPDATE_FAVORITE, value, field };
}
