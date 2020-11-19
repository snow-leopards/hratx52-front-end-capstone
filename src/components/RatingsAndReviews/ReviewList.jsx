import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Space, Divider, List } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../../reducers/ratingsReducers';
import { selectProduct } from '../../reducers/overviewReducers.js';
import ReviewOne from './ReviewOne';



const ReviewList = (props) => {
  //data from store
  const { Content } = Layout;
  const product = useSelector(selectProduct);
  const reviewList = useSelector(selectReviewList);


  return (
    <Layout>
      <Content>
        <List
          itemLayout="vertical"
          size="medium"
        >
          <ReviewOne></ReviewOne>
        </List>
      </Content>
    </Layout>
  );
};

export default ReviewList;