import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions } from 'antd';


const { Header, Footer, Sider, Content } = Layout;

const Overview = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProductInformation(props.productId));
  }, []);

  return (
    <>
      <Layout>
        <Header id='siteWideMessage'>Site-wide annoucement message - sale / discount offer - new product highlight</Header>
        <Content>
          <Row >
            <Col span={14}>
              <Image
                width={350}
                src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg"
              />
            </Col>
            <Col span={10}>
              <Descriptions title="Product Info">
                <Descriptions.Item span={3} label="Product Name">{product.name}</Descriptions.Item>
                <Descriptions.Item span={3} label="Slogan">{product.slogan}</Descriptions.Item>
                <Descriptions.Item span={3} label="Description">{product.description}</Descriptions.Item>
                <Descriptions.Item span={3} label="Price">${product.defaultPrice}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};


export default Overview;