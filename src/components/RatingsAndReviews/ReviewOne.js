import React from 'react';
import { useSelector} from 'react-redux';
import { Layout, Space, Divider, Card, Rate } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../../reducers/ratingsReducers';
import { selectProduct } from '../../reducers/overviewReducers.js';
import Ratings from './Ratings';


const ReviewOne = () => {
  //data from store
  const product = useSelector(selectProduct);
  const reviewList = useSelector(selectReviewList);
  // console.log('reviewListRO: ', reviewList);



  return (
    <>
      <div> {reviewList.map((review) => (
        <Card
          key={review.review_id}
          title={<Rate key={review.rate} allowHalf disabled defaultValue={review.rating} />}
          extra={review.reviewer_name} style={{ width: 500 }}
        >
          <b key={review.summary}>{review.summary}</b>
          <p key={review.body}>{review.body}</p>
          <Card
            key={review.response}
            type="inner"
            title="Seller Response"
          >
            {review.response}
          </Card>
        </Card>
      ))}
      </div>
    </>
  );
};

export default ReviewOne;