import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setProduct = makeActionCreator('SET_PRODUCT', 'product');
export const setProducList = makeActionCreator('SET_PRODUCT_LIST', 'productList');
export const setProdutStyle = makeActionCreator('SET_PRODUCT_STYLE', 'productStyle');

const initialState = {
  product: {
    id: null,
    name: '',
    slogan: '',
    description: '',
    category: '',
    defaultPrice: null

  },
  productList: [],
  productStyle: []
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_PRODUCT': {

    return {
      ...state,
      product: action.product
    };
  }
  case 'SET_PRODUCT_LIST': {
    return {
      ...state,
      productList: action.productList
    };
  }
  case 'SET_PRODUCT_STYLE': {
    return {
      ...state,
      productStyle: action.productStyle

    };
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

export const selectProductList = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.overview,
  //This needs to map to whatever is defined in this file
  overview => overview.productList
);

// gets first 100 products from the list
export const fetchProductList = async(dispatch, getState) => {
  fetch('http://3.21.164.220/products?count=100')
    .then(res => res.json())
    .then(
      (result) => {
        dispatch(setProducList(result));
      },
      (error) => {
        console.log('fetch request failed for product list');
      }
    );
};

// gets product INFORMATION by selected id
export const fetchProductInformation = (productId) => {
  return async(dispatch, getState) => {
    fetch('http://3.21.164.220/products/' + productId)
      .then(res => res.json())
      .then(
        (result) => {
          const newProduct = {
            id: result.id,
            name: result.name,
            slogan: result.slogan,
            description: result.description,
            category: result.category,
            defaultPrice: result.default_price
          };

          dispatch(setProduct(newProduct));
        },
        (error) => {
          console.log('fetch request failed for product information');
        }
      );
  };
};

// gets product STYLE by selected id
export const fetchProductStyle = (productId) => {
  return async(dispatch, getState) => {
    fetch('http://3.21.164.220/products/' + productId + '/styles')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          dispatch(setProdutStyle(result));
        },
        (error) => {
          console.log('fetch request failed for product styles');
        }
      );
  };
};


