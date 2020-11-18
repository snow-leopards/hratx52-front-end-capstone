import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Space, Divider, List, Avatar } from 'antd';
import Overview from './OverviewComponent/Overview';
import RelatedItems from './RelatedItems';
import QA from './QA';
import Ratings from './RatingsAndReviews/Ratings';
import { fetchProductList, selectProductList } from '../reducers/overviewReducers';


const { Content} = Layout;


const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(selectProductList);

  useEffect(() => {
    dispatch(fetchProductList);
  }, []);

  const onSearch = () => {
    console.log('Search');
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  //more functions go here
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={productList}
          renderItem={item => (
            <List.Item
              key={item.id}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg"
                />
              }
            >
              <List.Item.Meta
                title={<a href={`/details/${item.id}`}>{item.name}</a>}
                description={item.description}
              />
              {item.slogan}
              <br/>
              ${item.default_price}
            </List.Item>
          )}
        />
      </Content>

    </Layout>
  );

};

export default ProductList;