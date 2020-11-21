import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle } from '../../reducers/overviewReducers';
// import { selectRating } from '../../reducers/ratingsReducers';
import { Layout, Row, Col, Descriptions, Skeleton, List, Divider, Rate, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const SelectionGrid = ({selectedProductStyle, handleSizeClick, handleQuantityClick, selectedSize, selectedSizeLetters, handleStyleClick }) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);
  // const rating = useSelector(selectRating);

  const sizeMenu = (
    <Menu>
      {Object.keys(selectedProductStyle.skus).map((skuId) => {
        return (
          <Menu.Item skuId={skuId} value={selectedProductStyle.skus[skuId].size} onClick={(event) => handleSizeClick(event)} icon={<UserOutlined />}>
            {selectedProductStyle.skus[skuId].size}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const quantityMenu = (selectedSize !== null) ? (
    <Menu onClick={handleQuantityClick}>
      {[...Array(selectedProductStyle.skus[selectedSize].quantity + 1).keys()].map((number) => {
        return (
          <Menu.Item key={number} icon={<UserOutlined />}>
            {number}
          </Menu.Item>
        );
      })}
    </Menu>
  ) :
    (<Menu onClick={handleQuantityClick}>
      <Menu.Item key={1} icon={<UserOutlined />}>0</Menu.Item>
    </Menu>);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ marginTop: '30px', paddingLeft: '30px' }}><Rate allowHalf disabled defaultValue={4.5} />    <a style={{textDecoration: 'underline'}}>Read all reviews</a></Col>
        <Col span={24} style={{ paddingLeft: '30px', fontSize: '16px' }}>{product.category.toUpperCase()}</Col>
        <Col span={24} style={{ paddingLeft: '30px', fontSize: '32px', fontWeight: 'bold' }}>{product.name}</Col>
        <Col span={24} style={{ paddingLeft: '30px', fontSize: '16px' }}>${selectedProductStyle.original_price}</Col>
        <Col span={24} style={{ paddingLeft: '30px', fontSize: '16px' }}>
          <div>
            <a style={{ fontWeight: 'bold', color: 'black' }}>
            STYLE ></a>
            {selectedProductStyle.name.toUpperCase()}
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap' }}>
            {productStyleList.map((productStyle) =>
              <div key={productStyle.style_id} onClick={() => handleStyleClick(productStyle.style_id)} style= {{ padding: '10px'}}>
                <img src={productStyle.photos[0].thumbnail_url} style={{border: '1px solid darkgrey', borderRadius: '50%', height: '65px', width: '65px', objectFit: 'cover' }}/>
              </div>
            )}
          </div>
        </Col>
        <Col span={24} style={{ paddingLeft: '30px'}}>
          <Dropdown overlay={sizeMenu}>
            <Button>
              {selectedSizeLetters}<DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={quantityMenu}>
            <Button>
              1 <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
        <Col span={24} style={{ paddingLeft: '30px'}}>
          <Button>
            ADD TO CART <DownOutlined />
          </Button>
          <Button><StarOutlined /></Button>
        </Col>
      </Row>
    </>
  );
};


export default SelectionGrid;