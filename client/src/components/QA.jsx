import React from 'react';
import { useSelector } from 'react-redux';
import { selectQ, selectA} from '../reducers/QAReducers.jsx';
import { selectProduct } from '../reducers/overviewReducers.jsx';



const QA = () => {
  const question = useSelector(selectQ);
  const answer = useSelector(selectA);
  //Here I am sharing state from Kornelija's store
  const product = useSelector(selectProduct);

  return (
    <div>
    This is QA Section for product: {product} <br/>
    Question: {question} <br/>
    Answer: {answer}
    </div>
  );
};

export default QA;