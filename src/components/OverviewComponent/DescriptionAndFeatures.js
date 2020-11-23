import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../reducers/overviewReducers';
import { Col, Descriptions, List, Divider } from 'antd';
import { CheckOutlined } from '@ant-design/icons';


const DescriptionAndFeatures = (props) => {

  const product = useSelector(selectProduct);

  return (
    <>
      <Col span={16} style={{ padding: '20px 40px 0px 125px' }}>
        <Descriptions title={product.slogan}>
          <Descriptions.Item span={3}>{product.description}</Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={1}>
        <Divider type='vertical' style= {{ height: '100%', width: '2px', backgroundColor: 'darkgrey' }}/>
      </Col>
      <Col span={7}>
        <List
          itemLayout="horizontal"
          dataSource={product.featuresList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<CheckOutlined style={{ fontSize: '20px' }}/>}
                title={<a>{item.value === 'null' ? '' : item.value} {item.feature === 'null' ? '' : item.feature}</a>}
              />
            </List.Item>
          )}
        />
      </Col>
    </>
  );
};


export default DescriptionAndFeatures;