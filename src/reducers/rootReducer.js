import {combineReducers} from 'redux';
import {productReducer} from './overviewReducers';
import {QAReducer} from './QAReducers';
import {ratingReducer} from './ratingsReducers';

export const rootReducer = combineReducers({
  overview: productReducer,
  QA: QAReducer,
  ratings: ratingReducer,

});