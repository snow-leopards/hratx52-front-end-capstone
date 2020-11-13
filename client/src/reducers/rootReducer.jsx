import {combineReducers} from 'redux';
import {productReducer} from './overviewReducers.jsx';
import {QAReducer} from './QAReducers.jsx';
import {ratingReducer} from './ratingsReducers.jsx';

export const rootReducer = combineReducers({
  overview: productReducer,
  QA: QAReducer,
  ratings: ratingReducer,
});