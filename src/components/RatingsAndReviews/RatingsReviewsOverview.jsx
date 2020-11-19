import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Dropdown, Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../App.css';
import Ratings from './Ratings';
import ReviewList from './ReviewList';
import RatingProductBreakdown from './RatingProductBreakdown';
import { selectReview, selectRating, selectReviewList, fetchReviewList} from '../../reducers/ratingsReducers';

//layout tags
const { Header, Sider, Content } = Layout;


const RatingsReviewsOverview = (props) => {

  //useDispatch invocation
  const dispatch = useDispatch();

  //hook to rerender with new data
  useEffect(() => {
    dispatch(fetchReviewList(props.productId));
  }, []);

  //data from store
  const reviewList = useSelector(selectReviewList);

  //handling for drop-down selection
  const onClick = ({ key }) => {
    console.log(`Clicked ${key}`);
  };


  //menu for drop-down sort
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="Newest">Newest</Menu.Item>
      <Menu.Item key="Helpful">Helpful</Menu.Item>
      <Menu.Item key="Relevance">Relevance</Menu.Item>
    </Menu>
  );

  //in-line styling
  const styles = {
    sider: {
      color: 'white'
    }
  };

  return (
    <Layout>
      <Sider
        className='RROverviewSider'
        style={styles.sider}
      >
        <Space direction='vertical'>
          <b>Ratings and Reviews:</b>
          <br />
          <Ratings></Ratings>
          % of reviews recommend this product
          <br />
          Star rating breakdown
          <br />
          <RatingProductBreakdown
            productId={props.productId}
          ></RatingProductBreakdown>
        </Space>
      </Sider>
      <Layout>
        <Header
          style={{color: 'white'}}>
          (filter/sort drop-down menu) :
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>Sort By: <DownOutlined />
            </a>
          </Dropdown>
        </Header>
        <Content>
          <ReviewList
            productId={props.productId}
            reviewList={props.reviewList}
          ></ReviewList>
          <Button type='primary'>Add A Review</Button>
          <Button disabled>More Reviews</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RatingsReviewsOverview;