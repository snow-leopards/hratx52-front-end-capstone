import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setRating = makeActionCreator('SET_RATING', 'rating');
export const setReview = makeActionCreator('SET_REVIEW', 'review');
export const setReviewList = makeActionCreator('SET_REVIEW_LIST');

const initialState = {
  rating: 1,
  avgRating: null,
  review: 'I am pretty dissapointed, it broke the second time I\'ve used it! ',
  reviewList: []
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_RATING': {
    console.log('setting rating', action.rating);
    return {
      ...state,
      rating: action.rating
    };
  }
  case 'SET_REVIEW': {
    return {
      ...state,
      review: action.review
    };
  }
  case 'SET_REVIEW_LIST': {
    return {
      ...state,
      reviewList: action.payload
    };
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

export const selectReviewList = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.ratings,
  //This needs to map to whatever is defined in this file
  ratings => ratings.reviewList
);

export const fetchReviewList = (productId) => {
  return async(dispatch, getState) => {
    fetch(`http://3.21.164.220/reviews/?product_id=${productId}`)
      .then((res) => (res.json()))
      .then((result) => {
        console.log('fetch result: ', result);
      })
      .then((result) => {
        dispatch({ type: 'SET_REVIEW_LIST', payload: result });
      })
      .catch(console.log('error cannot fetch'));
  };
};