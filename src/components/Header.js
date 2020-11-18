import React from 'react';
import { Layout, Space, Divider, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import Overview from './OverviewComponent/Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import Ratings from './Ratings';

const { Header } = Layout;
const { Search } = Input;

const PageHeader = () => {

  const onSearch = () => {
    console.log('Search');
  };

  //more functions go here
  return (
    <Layout>
      <Header className="header">
        <div className="logo">LOGO</div>
        <Menu style={{ float: 'left' }}>
          <Menu.Item key="home">
            <a href="/" rel="noopener noreferrer">
              Home
            </a>
          </Menu.Item>
        </Menu>
        <Search
          className="searchForm"
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, margin: '0 10px' }}
        />
      </Header>
    </Layout>
  );
};

export default PageHeader;