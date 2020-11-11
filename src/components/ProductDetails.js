import React from 'react';
import { Layout } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Overview from './Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import Ratings from './Ratings';

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
        <Overview></Overview>
        <RelatedItems></RelatedItems>
        <QA></QA>
        <Ratings></Ratings>
      </Content>


    </Layout>
  );

};

export default ProductDetails;