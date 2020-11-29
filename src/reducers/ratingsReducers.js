import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setRating = makeActionCreator('SET_RATING', 'rating');
export const setReview = makeActionCreator('SET_REVIEW', 'review');
export const setReviewList = makeActionCreator('SET_REVIEW_LIST', 'reviewList');
export const setMetaData = makeActionCreator('SET_META_DATA', 'metaData');

const initialState = {
  rating: null,
  reviewList: [],
  renderList: [],
  metaData: {
    characteristics: {},
    'product_id': null,
    ratings: {},
    recommended: {}
  },
  review: {
    body: '',
    date: '',
    helpfullness: 0,
    photos: [],
    ratings: null,
    recommend: null,
    'review_id': null,
    'reviewer_name': '',
    summary: '',
  },
  isVisible: false,
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_RATING': {
    return {
      ...state,
      rating: action.rating
    };
  }
  case 'SET_REVIEW': {
    return {
      ...state,
      review: action.payload
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

export const selectReview = createSelector(
  state => state.ratings,
  ratings => ratings.review
);

export const selectReviewList = createSelector(
  state => state.ratings,
  ratings => ratings.reviewList
);

export const selectMetaData = createSelector(
  state => state.ratings,
  ratings => ratings.metaData
);

//API call for ReviewList
export const fetchReviewList = (productId, count) => {
  return async(dispatch, getState) => {
    fetch(`http://3.21.164.220/reviews/?product_id=${productId}&count=${count}&sort=relevance`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({ type: 'SET_REVIEW_LIST', payload: result.results });
        })
      .catch(console.log('Sofia --> error cannot fetch '));
  };
};
//API call for Sorted ReviewList
export const fetchSortedList = (productId, sort) => {
  return async(dispatch, getState) => {
    fetch(`http://3.21.164.220/reviews/?product_id=${productId}&sort=${sort}&count=100`)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch({ type: 'SET_REVIEW_LIST', payload: result.results });
        })
      .catch(console.log('Sofia --> error cannot sort '));
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
export const postReview = (review, productId) => {
  return async(dispatch, getState) => {
    fetch('http://3.21.164.220/reviews', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(review)
    })
      // .then(res => res.json())
      .then(
        (data) => {
          console.log("logDATAAAAAAAAA", data);
          fetchSortedList(productId, 'newest');
        })
      .catch(() => {
        console.log('error cannot post');
      });
  };
};

//API call to put helpfulness
export const putHelpfulness = (reviewId) => {
  fetch(`http://3.21.164.220/reviews/${reviewId}/helpful`, {
    method: 'PUT',
  })
    .then((res) => {
      console.log('success: helpfulness updated');
    })
    .catch((error) => {
      console.log('error could not update helpfulness');
    });
};