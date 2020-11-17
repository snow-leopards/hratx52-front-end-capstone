import React from 'react';
import { useSelector } from 'react-redux';
import { selectRating } from '../reducers/ratingsReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Rate } from 'antd';
import {setRating} from '../reducers/ratingsReducers';
import { useDispatch } from 'react-redux';


const Ratings = () => {
  const rating = useSelector(selectRating);
  //Here I am sharing state from Kornelija's store
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();

  return (
    <div>
    Avg Rating: {product.id} <br/>
    Rating: <Rate allowHalf defaultValue={rating} onChange={(rating) => dispatch({type: 'SET_RATING', rating: {rating}})}/> <br/>
    </div>
  );
};

export default Ratings;