import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle } from '../../reducers/overviewReducers';
//clean this up
import { Layout, Row, Col, Descriptions, Skeleton, List, Divider, Rate, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, StarOutlined, TagOutlined, CheckCircleFilled, ShoppingOutlined } from '@ant-design/icons';
import Ratings from '../RatingsAndReviews/Ratings';

const { Header, Footer, Sider, Content } = Layout;

const SelectionGrid = ({selectedProductStyle, handleSizeClick, handleQuantityClick, selectedSize, selectedSizeLetters, handleStyleClick }) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);

  const sizeMenu = (
    <Menu>
      {Object.keys(selectedProductStyle.skus).map((skuId) => {
        return selectedProductStyle.skus[skuId].quantity === 0 ? null :
          (
            <Menu.Item skuId={skuId} value={selectedProductStyle.skus[skuId].size} onClick={(event) => handleSizeClick(event)} icon={<TagOutlined />}>
              {selectedProductStyle.skus[skuId].size}
            </Menu.Item>
          );
      })}
    </Menu>
  );

  const quantityMenu = (selectedSize !== null) ? (
    <Menu onClick={handleQuantityClick}>
      {[...Array(selectedProductStyle.skus[selectedSize].quantity).keys()].map((number) => {
        return number > 14 ? null :
          (
            <Menu.Item key={number + 1} icon={<ShoppingOutlined />}>
              {number + 1}
            </Menu.Item>
          );
      })}
    </Menu>
  ) :
    (<Menu onClick={handleQuantityClick}>
      <Menu.Item key={1} icon={<ShoppingOutlined />}>0</Menu.Item>
    </Menu>);

  return (
    <>
      <div class='selection-container'>
        <div class='row-container'>
          <Ratings/>
          <a style={{textDecoration: 'underline'}}>Read all reviews</a>
        </div>
        <div>{product.category.toUpperCase()}</div>
        <div class='product-name'>{product.name}</div>
        <div>${selectedProductStyle.original_price}</div>
        <div>
          <span class='product-style-label'>
          STYLE >  </span>
          {selectedProductStyle.name.toUpperCase()}
        </div>
        <div class='style-thumbnails-container'>
          {productStyleList.map((productStyle) =>
            <div class='style-image-container' key={productStyle.style_id} onClick={() => handleStyleClick(productStyle.style_id)}>
              <div class={productStyle.style_id === selectedProductStyle.style_id ? 'checkmark-container selected' : 'checkmark-container' }>
                <CheckCircleFilled />
              </div>
              <img class='style-thumbnail' src={productStyle.photos[0].thumbnail_url}/>
            </div>
          )}
        </div>
        <div class='row-container'>
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
        </div>
        <div class='row-container'>
          <Button>
            ADD TO CART <DownOutlined />
          </Button>
          <Button><StarOutlined /></Button>
        </div>


      </div>
    </>
  );
};


export default SelectionGrid;