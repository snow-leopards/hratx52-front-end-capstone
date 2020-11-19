import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';
import IndividualQuestion from './QAIndividualQuestion';

const { Header, Footer, Sider, Content } = Layout;

const QA = ({ productId }) => {

  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const fetchedQuestions = useSelector(selectQ);


  useEffect(() => {
    dispatch(fetchQuestions(productId, 4));
  }, []);


  return (
    <div>
      <Layout>
        <Header id="questionsAndAnswers" style={{color: 'white'}}>Questions and Answers</Header>
        <Content>
          <div>
            {fetchedQuestions.length > 0 &&
            fetchedQuestions.map((question) => {
              return (
                <IndividualQuestion key={question.question_id} productId={productId} question={question}/>
              );
            })
            }
            <button onClick={() => {
              console.log('Need to fetch more!');
            }}>Show More Questions</button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default QA;