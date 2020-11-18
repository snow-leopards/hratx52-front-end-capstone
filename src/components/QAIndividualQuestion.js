import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';

const { Header, Footer, Sider, Content } = Layout;

const IndividualQuestion = ( { question } ) => {
  const product = useSelector(selectProduct);
  var answers = [];
  for (var key in question.answers) {
    answers.push(question.answers[key]);
  }

  answers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1);

  return (
    <Layout>
      <Row className="questionBody" style={{fontWeight: 'bold'}}> Q: {question.question_body}</Row>
      <Content>{answers.map((answer) => {
        return (
          <div key={answer.id}>
            <Row key={answer.body} className="answerBody">A: {answer.body}</Row>
            <Row key={answer.date} className="answerDetails">by {answer.answerer_name}, {answer.date.slice(5, 8)}{answer.date.slice(8, 10)}-{answer.date.slice(0, 4)}</Row>
            <Row key={'helpful' + answer.id}>Helpful? Yes ({answer.helpfulness})</Row>
          </div>
        );
      })}
      </Content>
    </Layout>
  );
};

export default IndividualQuestion;