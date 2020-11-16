import React from 'react';
import { Layout, Dropdown, Menu, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '../App.css';
import Ratings from './Ratings';
import ReviewList from './ReviewList';
import RatingProductBreakdown from './RatingProductBreakdown';

const { Header, Sider, Content } = Layout;
// const { DownOutlined } = Icons;
const RatingsReviewsOverview = (props) => {

  const onClick = ({ key }) => {
    console.log(`Clicked ${key}`);
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="Newest">Newest</Menu.Item>
      <Menu.Item key="Helpful">Helpful</Menu.Item>
      <Menu.Item key="Relevance">Relevance</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider className='RROverviewSider'>
        <Space direction='vertical'>
          Ratings and Reviews:
          <Ratings></Ratings>
          % of reviews recommend this product
          Star rating breakdown
          <RatingProductBreakdown></RatingProductBreakdown>
        </Space>
      </Sider>
      <Layout>
        <Header className='RROverviewSider'>
          (filter/sort drop-down menu) :
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>Sort By: <DownOutlined />
            </a>
          </Dropdown>
        </Header>
        <Content>
          <ReviewList></ReviewList>
          <Button type='primary'>Add A Review</Button>
          <Button disabled>More Reviews</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RatingsReviewsOverview;