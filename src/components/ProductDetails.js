import React from 'react';
import { Layout, Space, Divider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Overview from './Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import RatingsReviewsOverview from './RatingsReviewsOverview';

const { Header, Content} = Layout;
const { Search } = Input;

const ProductDetails = () => {

  const onSearch = () => {
    console.log('Search');
  };

  //more functions go here
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, margin: '0 10px' }}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Space direction="vertical" size="large" split={<Divider/>}>
          <Overview></Overview>
          <RelatedItems></RelatedItems>
          <QA></QA>
          <RatingsReviewsOverview></RatingsReviewsOverview>
        </Space>
      </Content>


    </Layout>
  );

};

export default ProductDetails;