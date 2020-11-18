import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';

const { Header, Footer, Sider, Content } = Layout;

const IndividualQuestion = ( { aQuestion } ) => {
  const product = useSelector(selectProduct);
  var answers = aQuestion.answers;
  var answersArray = [];
  for (var key in answers) {
    answersArray.push(answers[key]);
  }

  return (
    <div>
      <div className="questionBody">Q: {aQuestion.question_body}</div>
      <div>{answersArray.map((anAnswer) => {
        return (
          <div key={anAnswer.id}>
            <div key={anAnswer.body} className="answerBody">A: {anAnswer.body}</div>
            <div key={anAnswer.date} className="answerDetails">by {anAnswer.answerer_name}, {anAnswer.date.slice(5, 8)}{anAnswer.date.slice(8, 10)}-{anAnswer.date.slice(0, 4)}</div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default IndividualQuestion;