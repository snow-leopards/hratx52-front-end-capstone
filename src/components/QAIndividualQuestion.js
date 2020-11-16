import React from 'react';
import { useSelector } from 'react-redux';
import { selectQ, selectA} from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../DummyData/QAListQuestionsData';

const { Header, Footer, Sider, Content } = Layout;

const IndividualQuestion = ( {aQuestion} ) => {
  var answers = aQuestion.answers;
  var answersArray = [];
  for (var key in answers) {
    answersArray.push(answers[key]);
  }
  console.log(answersArray);

  return (
    <div>
      <div class="questionBody">Q: {aQuestion.question_body}</div>
      <div>{answersArray.map((anAnswer) => {
        return (
          <div>
            <div class="answerBody">A: {anAnswer.body}</div>
            <div class="answerDetails">by {anAnswer.answerer_name}, {anAnswer.date.slice(0, 10)}</div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default IndividualQuestion;