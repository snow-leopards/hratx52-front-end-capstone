import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Overview = () => {

  const product = useSelector(selectProduct);

  return (
    <>
      <Layout>
        <Header id='siteWideMessage'>Site-wide annoucement message - sale / discount offer - new product highlight</Header>
        <Layout>
          <Content>
            This is Overview Section for {product} images
          </Content>
          <Sider id='selectionTab'>
            This is Overview Section for {product} selection
          </Sider>
        </Layout>
        <Footer>This is Overview Section for {product} catchprase and description</Footer>
      </Layout>
    </>
  // <div>
  // This is Overview Section for {product}
  // </div>
  );
};


export default Overview;