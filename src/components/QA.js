import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions, selectShowedQ, putHelpfulnessQuestion } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions, Button, Divider } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';
import IndividualQuestion from './QAIndividualQuestion';

const { Header, Footer, Sider, Content } = Layout;

const QA = ({ productId }) => {

  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const fetchedQuestions = useSelector(selectQ);
  const showedMoreQuestions = useSelector(selectShowedQ);

  useEffect(() => {
    dispatch(fetchQuestions(productId, 4));
  }, []);

  var showMoreQuestions = () => {
    dispatch(fetchQuestions(productId));
    dispatch({type: 'SET_SHOWED_Q', payload: true});
  };

  var showLessQuestions = () => {
    dispatch(fetchQuestions(productId, 4));
    dispatch({type: 'SET_SHOWED_Q', payload: false});
  };

  var incrementQuestionHelpfulness = (question) => {
    var questionsArray = [];
    for (var i = 0; i < fetchedQuestions.length; i++) {
      if (question.question_id === fetchedQuestions[i].question_id && question.clickedHelpful === undefined) {
        question.question_helpfulness++;
        question.clickedHelpful = true;
        questionsArray.push(question);
        putHelpfulnessQuestion(question.question_id);
      } else {
        questionsArray.push(fetchedQuestions[i]);
      }
    }
    dispatch({type: 'SET_QA', payload: questionsArray});
  };

  return (
    <div>
      <Layout>
        <Header id="questionsAndAnswers" style={{color: 'white'}}>Questions and Answers</Header>
        <Content>
          <Row>
            {fetchedQuestions.length > 0 &&
            fetchedQuestions.map((question) => {
              return (
                <Row key={question.question_id * 847} style={{width: '100%'}}>
                  <Row key={question.question_id * 77} style={{width: '100%'}}>
                    <Col flex={4} key={question.question_id * 777}>
                      <IndividualQuestion key={question.question_id} productId={productId} question={question}/>
                    </Col>
                    {question.clickedHelpful ?
                      <Col key={question.question_id * 742} flex={1} style={{textAlign: 'right'}}>
                        <Button key={question.question_helpfulness * 1078}style={{fontWeight: 'bold', color: 'blue'}}>Helpful? Yes({question.question_helpfulness})</Button>
                      </Col> :
                      <Col key={question.question_id * 547} flex={1} style={{textAlign: 'right'}}>
                        <Button key={question.question_helpfulness * 129} onClick={() => {
                          incrementQuestionHelpfulness(question);
                        }
                        }
                        >Helpful? Yes({question.question_helpfulness})</Button>
                      </Col>}
                  </Row>
                  <Divider key={question.question_id * 427}></Divider>
                </Row>
              );
            })
            }
            {showedMoreQuestions ? <Button onClick={() => {
              showLessQuestions();
            }}>Show Less Questions</Button> : <Button onClick={() => {
              showMoreQuestions();
            }}>Show More Questions</Button>
            }

          </Row>
        </Content>
      </Layout>
    </div>
  );
};

export default QA;