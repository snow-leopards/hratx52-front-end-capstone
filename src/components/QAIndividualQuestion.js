import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';

const { Header, Footer, Sider, Content } = Layout;

const IndividualQuestion = ({ question }) => {
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const answersState = useSelector(selectA);
  var listOfAnswers = [];
  for (var key in question.answers) {
    listOfAnswers.push(question.answers[key]);
  }
  listOfAnswers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1);

  useEffect(() => {
    dispatch({type: 'SET_ANSWERS', payload: listOfAnswers});
  }, []);

  var incrementHelpfulness = (answer) => {
    for (var i = 0; i < listOfAnswers.length; i++) {
      if (listOfAnswers[i].id === answer.id && listOfAnswers[i].clickedHelpful === undefined) {
        listOfAnswers[i].helpfulness = answer.helpfulness + 1;
        listOfAnswers[i].clickedHelpful = true;
      } else if ((listOfAnswers[i].id === answer.id && listOfAnswers[i].clickedHelpful === true)) {
        listOfAnswers[i].helpfulness = answer.helpfulness - 1;
        delete listOfAnswers[i].clickedHelpful;
      }
    }
    dispatch({type: 'SET_ANSWERS', payload: listOfAnswers});
  };

  return (
    <Layout>
      <Row className="questionBody" style={{fontWeight: 'bold'}}> Q: {question.question_body}</Row>
      <Content>{listOfAnswers.map((answer) => {
        return (
          <div key={answer.id}>
            <Row key={answer.body} className="answerBody">A: {answer.body}</Row>
            <Row key={answer.date} className="answerDetails">by {answer.answerer_name}, {answer.date.slice(5, 8)}{answer.date.slice(8, 10)}-{answer.date.slice(0, 4)}</Row>
            <button key={'helpful' + answer.id} onClick={() => {
              incrementHelpfulness(answer);
            }}
            >Helpful? Yes({answer.helpfulness})</button>
          </div>
        );
      })}
      </Content>
    </Layout>
  );
};

export default IndividualQuestion;

