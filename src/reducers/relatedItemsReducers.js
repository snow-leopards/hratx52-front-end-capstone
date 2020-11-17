import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const increaseCounterAction = makeActionCreator('INCREASE_COUNTER');

const initialState = {
  counter: 0
};

export const relatedItemsReducer = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

// export const selectCounter = createSelector(
//   state => state.counter,
//   counter => counter.counter2,
// );