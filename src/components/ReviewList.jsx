import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Space, Divider, List } from 'antd';
import { Rate } from 'antd';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../reducers/ratingsReducers';
import { selectProduct } from '../reducers/overviewReducers.js';



const ReviewList = ({ productId }) => {

  const { Content } = Layout;
  // const review = useSelector(selectReview);
  // const rating = useSelector(selectRating);
  const dispatch = useDispatch();
  const reviewList = useSelector(selectReviewList);
  const product = useSelector(selectProduct);

  useEffect(() => {
    console.log('UE product', product);
    dispatch(fetchReviewList(productId));
  }, []);

  return (
    <Layout>
      <Content>
        <List
          itemLayout="vertical"
          size="medium"
          dataSource={reviewList}
          renderItem={item => (
            <List.Item
              key={item.id}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default ReviewList;