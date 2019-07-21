import { UPDATE_TYPES } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_TYPES:
      return action.payload;
    default:
      return state;
  }
};
