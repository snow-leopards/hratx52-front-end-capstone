import makeActionCreator from '../utils/makeActionCreator';
import { createSelector } from 'reselect';

export const setQA = makeActionCreator('SET_QA', 'questions');
export const setAnswer = makeActionCreator('SET_ANSWERS', 'answers');
export const setShowed = makeActionCreator('SET_SHOWED_Q', 'showedMoreQuestions');

const initialState = {
  questions: [],
  answers: [],
  showedMoreQuestions: false,
  showedMoreAnswers: false
};

export const QAReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_QA': {
    return {
      ...state,
      questions: action.payload
    };
  }
  case 'SET_ANSWERS': {
    return {
      ...state,
      answers: action.payload
    };
  }
  case 'SET_SHOWED_Q': {
    return {
      ...state,
      showedMoreQuestions: action.payload
    };
  }
  case 'SET_SHOWED_Q': {
    return {
      ...state,
      showedMoreAnswers: action.payload
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
  QA => QA.questions
);

export const selectA = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.QA,
  //This needs to map to whatever is defined in this file
  QA => QA.answers
);

export const selectShowedQ = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.QA,
  //This needs to map to whatever is defined in this file
  QA => QA.showedMoreQuestions
);

export const selectShowedA = createSelector(
  //This needs to map to whatever the key is in rootReducer.js
  state => state.QA,
  //This needs to map to whatever is defined in this file
  QA => QA.showedMoreAnswers
);

export const fetchQuestions = (productId, number) => {

  return (dispatch, getState) => {
    fetch(`http://3.21.164.220/qa/questions?product_id=${productId}`)
      .then((res) => res.json())
      .then((questions) => {
        number = number || questions.results.length;
        if (questions.results.length < number) {
          number = questions.results.length;
        }
        var maxQuestions = [];
        questions.results.sort((a, b) => (a.question_helpfulness < b.question_helpfulness) ? 1 : -1);
        for (var i = 0; i < number; i++) {
          maxQuestions.push(questions.results[i]);
        }
        dispatch({type: 'SET_QA', payload: maxQuestions});
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const putHelpfulnessAnswer = (answerID) => {
  fetch(`http://3.21.164.220/qa/answers/${answerID}/helpful`, {
    method: 'PUT',
  })
    .then((res) => console.log('Feedback Received!'))
    .catch((error) => {
      console.log(error);
    });
};

export const putHelpfulnessQuestion = (questionID) => {
  fetch(`http://3.21.164.220/qa/questions/${questionID}/helpful`, {
    method: 'PUT',
  })
    .then((res) => {
      console.log('Feedback Received!');
    })
    .catch((error) => {
      console.log(error);
    });
};