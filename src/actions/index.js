import restaurantsService from '../apis/restaurantsService';
import lodash from 'lodash';

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const UPDATE_TYPES = 'UPDATE_TYPES';
export const FETCH_FAVOURITES = 'FETCH_FAVOURITES';
export const FILTER_RESTAURANTS = 'FILTER_RESTAURANTS';
export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
export const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';

export const fetchRestaurants = () => async dispatch => {
  const response = await restaurantsService.get('/restaurants');
  const payload = response.data;

  dispatch({ type: FETCH_RESTAURANTS, payload });

  const types = lodash.uniqBy(response.data, (restaurant) => restaurant.type).map((restaurant) => restaurant.type);

  dispatch({ type: UPDATE_TYPES, payload: types });
  dispatch({ type: FILTER_RESTAURANTS, payload });
};

export const fetchFavourites = () => async dispatch => {
  const response = await restaurantsService.get('/favourites');

  dispatch({ type: FETCH_FAVOURITES, payload: response.data });
};

export const filterRestaurants = (type) => (dispatch, getState) => {
  const payload = type === "All" ? getState().restaurants : getState().restaurants.filter((restaurant) => { return restaurant.type === type });

  dispatch({ type: FILTER_RESTAURANTS, payload });
};

export const selectRestaurant = (id) => (dispatch, getState) => {
  const payload = getState().restaurants.find((restaurant) => { return restaurant.id === id });

  dispatch({ type: SELECT_RESTAURANT, payload });
};

export const addToFavourites = (id) => (dispatch, getState) => {
  let payload = getState().restaurants.find((restaurant) => { return restaurant.id === id });
  payload = [...getState().favourites, payload]
  payload = lodash.uniqBy(payload, (restaurant) => restaurant.id);
  dispatch({ type: ADD_TO_FAVOURITES, payload });
};
