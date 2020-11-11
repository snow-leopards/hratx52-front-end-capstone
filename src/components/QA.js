import React from 'react';
import { useSelector } from 'react-redux';
import { selectQ, selectA} from '../store/QAStore';
import { selectProduct } from '../store/overviewStore';



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