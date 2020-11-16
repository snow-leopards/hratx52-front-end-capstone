import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Space, Divider, List } from 'antd';
import { Rate } from 'antd';
import { selectReview, selectRating } from '../reducers/ratingsReducers';



const ReviewList = (props) => {

  const review = useSelector(selectReview);
  const rating = useSelector(selectRating);
  const dispatch = useDispatch();

  return (
    <div>
      Review: {review}
      Rating: {rating}
    </div>
  );
};

export default ReviewList;