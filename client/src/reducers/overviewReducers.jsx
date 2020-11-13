import makeActionCreator from '../utils/makeActionCreator.jsx';
import { createSelector } from 'reselect';

export const setProduct = makeActionCreator('SET_PRODUCT', 'product');

const initialState = {
  product: 'product1'
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_PRODUCT': {
    return action.payload.product;
  }
  default: {
    return state;
  }
  }
};

export const selectProduct = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.overview,
  //This needs to map to whatever is defined in this file
  overview => overview.product
);