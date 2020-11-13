import React from 'react';
import { Layout, Space, Divider } from 'antd';
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
        <div className="logo">LOGO</div>
        {/* <Search
          clasName="searchForm"
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, margin: '0 10px' }}
        /> */}
        <Search clasName="searchForm" placeholder="input search text" onSearch={onSearch} style={{ width: 200 } } />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Space direction="vertical" size="large" split={<Divider/>}>
          <Overview></Overview>
          <RelatedItems></RelatedItems>
          <QA></QA>
          <Ratings></Ratings>
        </Space>
      </Content>


    </Layout>
  );

};

export default ProductDetails;