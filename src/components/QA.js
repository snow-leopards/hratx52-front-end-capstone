import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectQ, selectA, fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';
import IndividualQuestion from './QAIndividualQuestion';

const { Header, Footer, Sider, Content } = Layout;

const QA = ({ productId }) => {
  const question = useSelector(selectQ);
  const answer = useSelector(selectA);
  //Here I am sharing state from Kornelija's store
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const fetchedQuestions = useSelector(selectQ);
  console.log(fetchedQuestions);

  useEffect(() => {
    dispatch(fetchQuestions(productId));
  }, []);


  return (
    <div>
      <Layout>
        <Header id="questionsAndAnswers" style={{color: 'white'}}>Questions and Answers</Header>
        <Content>
          <div>
            {fetchedQuestions.length > 0 &&
            fetchedQuestions.map((aQuestion) => {
              return (
                <IndividualQuestion key={aQuestion.id} productId={productId} aQuestion={aQuestion}/>
              );
            })
            }
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default QA;