import React from 'react';
import { useParams } from '@reach/router';
import { Layout, Space, Divider } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Overview from './Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import Ratings from './Ratings';

const { Content} = Layout;
const { Search } = Input;

const ProductDetails = () => {

  const params = useParams();

  const onSearch = () => {
    console.log('Search');
  };

  //more functions go here
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Space style={{ width: '100%' }} direction="vertical" size="large" split={<Divider/>}>
          <Overview productId={params.id}></Overview>
          <RelatedItems></RelatedItems>
          <QA></QA>
          <Ratings></Ratings>
        </Space>
      </Content>


    </Layout>
  );

};

export default ProductDetails;