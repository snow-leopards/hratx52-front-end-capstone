import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions, selectShowed, putHelpfulnessQuestion } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions, Button, Divider } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';
import IndividualQuestion from './QAIndividualQuestion';

const { Header, Footer, Sider, Content } = Layout;

const QA = ({ productId }) => {

  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const fetchedQuestions = useSelector(selectQ);
  const showedMore = useSelector(selectShowed);

  useEffect(() => {
    dispatch(fetchQuestions(productId, 4));
  }, []);

  var showMoreQuestions = () => {
    dispatch(fetchQuestions(productId));
    dispatch({type: 'SET_SHOWED', payload: true});
  };

  var showLessQuestions = () => {
    dispatch(fetchQuestions(productId, 4));
    dispatch({type: 'SET_SHOWED', payload: false});
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
                <>
                  <Row style={{width: '100%'}}>
                    <Col flex={4}>
                      <IndividualQuestion key={question.question_id} productId={productId} question={question}/>
                    </Col>
                    {question.clickedHelpful ? <Col flex={1} style={{textAlign: 'right'}}>
                      <Button style={{fontWeight: 'bold', color: 'blue'}}>Helpful? Yes({question.question_helpfulness})</Button>
                    </Col> : <Col flex={1} style={{textAlign: 'right'}}>
                      <Button onClick={() => {
                        incrementQuestionHelpfulness(question);
                      }
                      }
                      >Helpful? Yes({question.question_helpfulness})</Button>
                    </Col>}
                  </Row>
                  <Divider></Divider>
                </>
              );
            })
            }
            {showedMore ? <Button onClick={() => {
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