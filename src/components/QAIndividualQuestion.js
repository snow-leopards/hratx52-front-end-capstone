import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions, putHelpfulnessAnswer, selectShowedA } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions, Button } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';

const { Header, Footer, Sider, Content } = Layout;

const IndividualQuestion = ({ question }) => {
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const answersState = useSelector(selectA);
  const showedMoreAnswers = useSelector(selectShowedA);

  var listOfAnswers = [];
  for (var key in question.answers) {
    listOfAnswers.push(question.answers[key]);
  }
  listOfAnswers.sort((a, b) => (a.helpfulness < b.helpfulness) ? 1 : -1);
  var firstTwoAnswers = listOfAnswers.slice(0, 2);
  var remainingAnswers = listOfAnswers.slice(2);

  useEffect(() => {
    dispatch({type: 'SET_ANSWERS', payload: listOfAnswers});
  }, []);

  var incrementHelpfulness = (answer) => {
    for (var i = 0; i < listOfAnswers.length; i++) {
      if (listOfAnswers[i].id === answer.id && listOfAnswers[i].clickedHelpful === undefined) {
        listOfAnswers[i].helpfulness = answer.helpfulness + 1;
        putHelpfulnessAnswer(answer.id);
        listOfAnswers[i].clickedHelpful = true;
      }
    }
    dispatch({type: 'SET_ANSWERS', payload: listOfAnswers});
  };

  var showMoreAnswers = () => {
    dispatch({type: 'SET_SHOWED_A', payload: true});
  };

  var showLessAnswers = () => {
    dispatch({type: 'SET_SHOWED_A', payload: false});
  };

  return (
    <Layout>
      <Row className="questionBody" style={{fontWeight: 'bold'}}> Q: {question.question_body}</Row>
      <Content>{showedMoreAnswers ? <div></div> :
        firstTwoAnswers.map((answer) => {
          return (
            <div key={answer.id}>
              <Row key={answer.body} className="answerBody">A: {answer.body}</Row>
              <Row key={answer.date} className="answerDetails">by {answer.answerer_name}, {answer.date.slice(5, 8)}{answer.date.slice(8, 10)}-{answer.date.slice(0, 4)}
              </Row>
              {answer.clickedHelpful ?
                <Button key={'helpful' + answer.id} style={{fontWeight: 'bold', color: 'blue'}}>Helpful? Yes({answer.helpfulness})</Button> :
                <Button key={'helpful' + answer.id} onClick={() => {
                  incrementHelpfulness(answer);
                }}
                >Helpful? Yes({answer.helpfulness})
                </Button>
              }
            </div>
          );
        })}
      {listOfAnswers.length > 2 &&
        <Button onClick={() => {
          showMoreAnswers();
        }}>Show More Answers</Button>
      }
      </Content>
    </Layout>
  );
};

export default IndividualQuestion;