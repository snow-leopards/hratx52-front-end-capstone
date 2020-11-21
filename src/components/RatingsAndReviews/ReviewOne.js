import React from 'react';
import { useSelector} from 'react-redux';
import { Layout, Space, Divider, Card, Rate } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../../reducers/ratingsReducers';
import { CheckOutlined } from '@ant-design/icons';
import { selectProduct } from '../../reducers/overviewReducers.js';
import Ratings from './Ratings';


const ReviewOne = () => {
  //data from store
  const product = useSelector(selectProduct);
  const reviewList = useSelector(selectReviewList);
  // console.log('reviewListRO: ', reviewList);
  const shownReviews = reviewList.slice(0, 2);
  // console.log(shownReviews);

  //ConditionalRecommend rendering
  const WouldRecommend = (props) => {
    return <div key={props.review.helpfulness + props.idx}>
      {
        (props.review.recommend === 1) ?
          // console.log("YASSS", review.review.recommend === 1)
          <div key={props.review.reviewer_name}>
            <CheckOutlined key={props.review.helpfulness} />
            I recommend this product!
          </div>
          :
          null
      }
    </div>;
  };

  //Conditional rendering of Seller response
  const SellerResponse = (props) => (
    <div key={props.review.rating + props.idx}>
      {
        (!!props.review.response) ?
          <div key={props.review.date}>
            <Card
              key={props.review.response}
              type="inner"
              title="Seller Response"
            >
              {props.review.response}
            </Card>
          </div>
          :
          null
      }
    </div>
  );

  return (
    <>
      <div>
        {
          shownReviews.map((review, idx) => (
            <Card
              key={review.review_id}
              title={<Rate key={review.date + idx} allowHalf disabled defaultValue={review.rating} />}
              extra={review.reviewer_name} style={{ width: 500 }}
            >
              <b key={review.summary}>{review.summary}</b>
              <p key={review.body}>{review.body}</p>
              <WouldRecommend review={review} key={review.reviewer_name + idx}/>
              <SellerResponse review={review} key={review.rating}/>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default ReviewOne;