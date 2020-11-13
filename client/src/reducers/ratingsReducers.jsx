import makeActionCreator from '../utils/makeActionCreator.jsx';
import { createSelector } from 'reselect';

export const setRating = makeActionCreator('SET_RATING', 'rating');
export const setReview = makeActionCreator('SET_REVIEW', 'review');

const initialState = {
  rating: 1.5,
  review: 'I am pretty dissapointed, it broke the second time I\'ve used it! '
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_RATING': {
    console.log('setting rating', action.rating);
    return action.rating;
  }
  case 'SET_REVIEW': {
    return action.review;
  }
  default: {
    return state;
  }
  }
};

export const selectRating = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.ratings,
  //This needs to map to whatever is defined in this file
  ratings => ratings.rating
);

export const selectReview = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.ratings,
  //This needs to map to whatever is defined in this file
  ratings => ratings.review
);