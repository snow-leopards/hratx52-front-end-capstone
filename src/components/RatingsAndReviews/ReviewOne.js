import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Card, Rate, Image, Button } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList, putHelpfulness, fetchSortedList } from '../../reducers/ratingsReducers';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import { selectProduct } from '../../reducers/overviewReducers.js';


const ReviewOne = () => {
  //data from store
  const product = useSelector(selectProduct);
  const reviewList = useSelector(selectReviewList);
  console.log('product: ', product);
  const dispatch = useDispatch();


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
        (!!props.review.response && props.review.response !== 'null') ?
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


  //Conditional rendering of photos
  const Photos = (props) => (
    <div> {
      (props.review.photos.length > 0) ?
        props.review.photos.map((photo) => (
          <Image
            width={75}
            src={photo.url}
            key={photo.url.length}
          />
        ))
        :
        null
    }
    </div>
  );

  return (
    <>
      <div>
        {
          reviewList.map((review, idx) => (
            <Card
              key={review.review_id}
              title={<Rate key={review.date + idx}
                allowHalf
                disabled
                defaultValue={review.rating}
              />}
              extra={`${review.reviewer_name} ${moment(review.date).format('MMMM Do YYYY')}`}
              style={{ width: 'auto' }}
            >
              <b key={review.summary}>{review.summary}</b>
              <p key={review.body}>{review.body}</p>
              <WouldRecommend
                review={review}
                key={review.reviewer_name + idx}
              />
              <SellerResponse
                review={review}
                key={review.rating}
              />
              <br/>
              <p style={{textAlign: 'right'}}>
                Was this review helpful?
                <Button
                  type="link"
                  onClick={() => {
                    (putHelpfulness(review.review_id));
                    setTimeout(() => { dispatch(fetchSortedList(product.id, 'helpfulness')); }, 300);
                  }}
                >
                  Yes({review.helpfulness})
                </Button>
              </p>
              <Photos review={review}/>
            </Card>
          ))
        }
      </div>
    </>
  );
};

export default ReviewOne;