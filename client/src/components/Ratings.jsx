import React from 'react';
import { useSelector } from 'react-redux';
import { selectRating, selectReview} from '../reducers/ratingsReducers.jsx';
import { selectProduct } from '../reducers/overviewReducers.jsx';
import { Rate } from 'antd';
import {setRating} from '../reducers/ratingsReducers.jsx';
import { useDispatch } from 'react-redux';


const Ratings = () => {
  const rating = useSelector(selectRating);
  const review = useSelector(selectReview);
  //Here I am sharing state from Kornelija's store
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();

  return (
    <div>
    This is Ratings Section for product: {product} <br/>
    Rating: <Rate allowHalf defaultValue={rating} onChange={(rating) => dispatch({type: 'SET_RATING', rating: {rating}})}/> <br/>
    Rating: <Rate allowHalf defaultValue={rating} onChange={(rating) => dispatch(setRating({rating}))} /> <br/>
    Review: {review}
    </div>
  );
};

export default Ratings;