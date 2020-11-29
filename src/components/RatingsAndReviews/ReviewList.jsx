import React from 'react';
import { Layout, Space, Divider, List } from 'antd';
import ReviewOne from './ReviewOne';


const ReviewList = (props) => {
  //data from antD
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <List
          itemLayout="vertical"
          size="large">
          <ReviewOne
            productId={props.productId}></ReviewOne>
        </List>
      </Content>
    </Layout>
  );
};

export default ReviewList;