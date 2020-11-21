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
  const shownReviews = reviewList.slice(0, 2);
  // console.log(shownReviews);

  //Conditional rendering of Seller response
  const SellerResponse = () => (
    <div>
      {shownReviews.map((rev) => {
        if (rev.response) {
          return <div key={rev.response}>
            <Card
              key={rev.response}
              type="inner"
              title="Seller Response"
            >
              {rev.response}
            </Card>
          </div>;
        }
      })
      }
    </div>
  );

  return (
    <>
      <div> {reviewList.length > 0 && shownReviews.map((review) => (
        <Card
          key={review.review_id}
          title={<Rate key={review.rate} allowHalf disabled defaultValue={review.rating} />}
          extra={review.reviewer_name} style={{ width: 500 }}
        >
          <b key={review.summary}>{review.summary}</b>
          <p key={review.body}>{review.body}</p>
          <SellerResponse/>
        </Card>
      ))}
      </div>
    </>
  );
};

export default ReviewOne;