import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Dropdown, Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../../App.css';
import NewReview from './NewReview';
import ReviewList from './ReviewList';
import RatingProductBreakdown from './RatingProductBreakdown';
import { selectReview, selectRating, selectReviewList, fetchReviewList, fetchSortedList, fetchMeta} from '../../reducers/ratingsReducers';

//layout tags
const { Header, Sider, Content } = Layout;


const RatingsReviewsOverview = (props) => {

  //useDispatch invocation
  const dispatch = useDispatch();
  //default count
  let count = 2;
  //handling for More Reviews Button
  let onClickMore = () => {
    count = 100;
    dispatch(fetchReviewList(props.productId, count));
  };

  //handling for drop-down selection
  let sort = 'relevance';
  const onClickSort = ({key}) => {
    console.log(`Clicked ${key}`);
    sort = key;
    dispatch(fetchSortedList(props.productId, sort));
  };

  //hook to rerender with new data
  useEffect(() => {
    dispatch(fetchReviewList(props.productId, count));
  }, []);

  //data from store
  const reviewList = useSelector(selectReviewList);


  //menu for drop-down sort
  const menu = (
    <Menu onClick={onClickSort}>
      <Menu.Item key="newest">Newest</Menu.Item>
      <Menu.Item key="helpfulness">Helpfulness</Menu.Item>
      <Menu.Item key="relevance">Relevance</Menu.Item>
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
        <b
          style={{
            fontSize: 18
          }}
        >Ratings and Reviews:</b>
        <br />
        <RatingProductBreakdown
          productId={props.productId}
        ></RatingProductBreakdown>
      </Sider>
      <Layout>
        <Header
          style={{color: 'white'}}>
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={e => e.preventDefault()
              }>
              Sort By: <DownOutlined/>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            height: '50vh',
            overflow: 'initial',
          }}
        >
          <ReviewList
            productId={props.productId}
            reviewList={props.reviewList}
          ></ReviewList>
          <Button
            onClick={onClickMore}
          >More Reviews</Button>
          <NewReview
            productId={props.productId}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RatingsReviewsOverview;