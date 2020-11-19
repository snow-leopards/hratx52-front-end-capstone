import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setQA = makeActionCreator('SET_QA', 'question');
export const setAnswer = makeActionCreator('SET_ANSWERS', 'answers');

const initialState = {
  question: [],
  answers: []
};

export const QAReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_QA': {
    return {
      ...state,
      question: action.payload
    };
  }
  case 'SET_ANSWERS': {
    return {
      ...state,
      answers: action.payload
    };
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
  QA => QA.answers
);

export const fetchQuestions = (productId) => {

  return (dispatch, getState) => {
    fetch(`http://3.21.164.220/qa/questions?product_id=${productId}`)
      .then((res) => res.json())
      .then((questions) => {
        dispatch({type: 'SET_QA', payload: questions.results});
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
