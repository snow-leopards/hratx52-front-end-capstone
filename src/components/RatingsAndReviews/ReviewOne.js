import React from 'react';
import { useSelector} from 'react-redux';
import { Layout, Space, Divider, Card } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../../reducers/ratingsReducers';
import { selectProduct } from '../../reducers/overviewReducers.js';


const ReviewOne = () => {
  //data from store
  const product = useSelector(selectProduct);
  const reviewList = useSelector(selectReviewList);
  // console.log('reviewListRO: ', reviewList);

  return (
    <>
      <div> {reviewList.map((review) => (
        <Card title={product.name} extra={review.reviewer_name} style={{ width: 500 }}>
          <p>{review.body}</p>
          <p>{review.response || null}</p>
          <p>Card content</p>
        </Card>
      ))}
      </div>
    </>
  );
};

export default ReviewOne;