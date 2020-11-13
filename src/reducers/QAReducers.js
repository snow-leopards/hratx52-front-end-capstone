import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setQA = makeActionCreator('SET_QA', 'QA');

const initialState = {
  question: 'is this a good product?',
  answer: 'yes!!!'
};

export const QAReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_QA': {
    return action.payload.QA;
  }
  default: {
    return state;
  }
  }
};

export const selectQ = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.QA,
  //This needs to map to whatever is defined in this file
  QA => QA.question
);

export const selectA = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.QA,
  //This needs to map to whatever is defined in this file
  QA => QA.answer
);