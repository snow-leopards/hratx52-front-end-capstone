import {combineReducers} from 'redux';
import {productReducer} from './overviewStore';
import {QAReducer} from './QAStore';
import {ratingReducer} from './ratingsStore';

export const rootReducer = combineReducers({
  overview: productReducer,
  QA: QAReducer,
  ratings: ratingReducer,

});