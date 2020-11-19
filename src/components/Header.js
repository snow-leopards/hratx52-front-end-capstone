import React from 'react';
import { Layout, Space, Divider, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Overview from './OverviewComponent/Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import Ratings from './RatingsAndReviews/Ratings';

const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {

  const onSearch = () => {
    console.log('Search');
  };

  //more functions go here
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', color: 'orange', fontWeight: 'bold', fontSize: '20px'}} className="header">
        <div>
          LOGO
        </div>
        <div style={{ float: 'left', backgroundColor: '#001529' }}>
          <a style= {{color: 'orange'}} href="/" rel="noopener noreferrer">
            HOME
          </a>
        </div>
        <Search
          className="searchForm"
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: '200px', alignSelf: 'center' }}
        />
      </Header>
    </Layout>
  );
};

export default PageHeader;