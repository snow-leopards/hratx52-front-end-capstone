import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setRating = makeActionCreator('SET_RATING', 'rating');
export const setReview = makeActionCreator('SET_REVIEW', 'review');
export const setReviewList = makeActionCreator('SET_REVIEW_LIST', 'reviewList');
export const setMetaData = makeActionCreator('SET_META_DATA', 'metaData');

const initialState = {
  rating: null,
  avgRating: null,
  reviewList: [],
  renderList: [],
  metaData: {},
  review: {},
  isVisible: false
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
  case 'SET_REVIEW_LIST': {
    return {
      ...state,
      reviewList: action.payload
    };
  }
  case 'SET_META_DATA': {
    return {
      ...state,
      metaData: action.payload
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

export const selectReviewList = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.ratings,
  //This needs to map to whatever is defined in this file
  ratings => ratings.reviewList
);

export const selectMetaData = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.ratings,
  //This needs to map to whatever is defined in this file
  ratings => ratings.metaData
);
//API call for ReviewList
export const fetchReviewList = (productId) => {
  return async(dispatch, getState) => {
    fetch(`http://3.21.164.220/reviews/?product_id=${productId}`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({ type: 'SET_REVIEW_LIST', payload: result.results });
        })
      .catch(console.log('Sofia --> error cannot fetch '));
  };
};
//API call for metaData
export const fetchMeta = (productId) => {
  return async(dispatch, getState) => {
    fetch(`http://3.21.164.220/reviews/meta/?product_id=${productId}`)
      .then(res => res.json())
      .then(
        (data) => {
          dispatch({ type: 'SET_META_DATA', payload: data });
        })
      .catch(console.log('error cannot fetch MetaData'));
  };
};
//API call to Add New Review