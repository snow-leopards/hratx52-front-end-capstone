import React from 'react';
import { useSelector } from 'react-redux';
import { selectQ, selectA} from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';
import dummyData from '../dummyData/QAListQuestionsData';
import IndividualQuestion from './QAIndividualQuestion';

const { Header, Footer, Sider, Content } = Layout;

const QA = () => {
  const question = useSelector(selectQ);
  const answer = useSelector(selectA);
  //Here I am sharing state from Kornelija's store
  const product = useSelector(selectProduct);

  return (
    <div>
      <Layout>
        <Header id="questionsAndAnswers" style={{color: 'white'}}>Questions and Answers</Header>
        <Content>
          This is QA Section for product: {product.name} <br/>
          <div>
            {dummyData.results.map((aQuestion) => {
              return (
                <IndividualQuestion aQuestion={aQuestion}/>
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