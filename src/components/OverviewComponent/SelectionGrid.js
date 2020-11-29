import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle } from '../../reducers/overviewReducers';
//clean this up
import { Layout, Row, Col, Descriptions, Skeleton, List, Divider, Rate, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, StarOutlined, TagOutlined, CheckCircleFilled, ShoppingOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, PlusOutlined } from '@ant-design/icons';
import Ratings from '../RatingsAndReviews/Ratings';
import { selectReviewList } from '../../reducers/ratingsReducers';

const { Header, Footer, Sider, Content } = Layout;

const SelectionGrid = ({selectedProductStyle, handleSizeClick, selectedQuantity, handleQuantityClick, selectedSize, selectedSizeLetters, handleStyleClick, handleAddToCartClick, sizeDropDownVisible, setSizeDropDownVisible }) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);
  const reviewList = useSelector(selectReviewList);

  const sizeMenu = (
    <Menu data-testid='size-menu' className='size-menu'>
      {Object.keys(selectedProductStyle.skus).map((skuId) => {
        return selectedProductStyle.skus[skuId].quantity === 0 ? null :
          (
            <Menu.Item key={skuId} sku-id={skuId} value={selectedProductStyle.skus[skuId].size} onClick={(event) => handleSizeClick(event)} icon={<TagOutlined />}>
              {selectedProductStyle.skus[skuId].size}
            </Menu.Item>
          );
      })}
    </Menu>
  );

  const quantityMenu = (selectedSize !== null) ? (
    <Menu >
      {[...Array(selectedProductStyle.skus[selectedSize].quantity).keys()].map((number) => {
        return number > 14 ? null :
          (
            <Menu.Item key={number + 1} value={number + 1} onClick={(event) => handleQuantityClick(event)} icon={<ShoppingOutlined />}>
              {number + 1}
            </Menu.Item>
          );
      })}
    </Menu>
  ) :
    (<Menu >
      <Menu.Item key={1} icon={<ShoppingOutlined />}>0</Menu.Item>
    </Menu>);

  return (
    <>
      <div className='selection-container'>
        <div className='row-container'>
          <Ratings/>
          <a href="#ratings-component" style={{textDecoration: 'underline'}}>Read all {reviewList.length} reviews</a>
        </div>
        <div>{product.category.toUpperCase()}</div>
        <div className='product-name'>{product.name}</div>

        {selectedProductStyle.sale_price === '0' ? <div>${selectedProductStyle.original_price}</div> : <div><span style={{color: 'red'}}>${selectedProductStyle.sale_price}</span> <span style={{textDecoration: 'line-through'}}>${selectedProductStyle.original_price}</span></div>}
        <div>
          <span className='product-style-label'>
          STYLE >  </span>
          {selectedProductStyle.name.toUpperCase()}
        </div>
        <div className='style-thumbnails-container'>
          {productStyleList.map((productStyle) =>
            <div className='style-image-container' key={productStyle.style_id} onClick={() => handleStyleClick(productStyle.style_id)}>
              <div className={productStyle.style_id === selectedProductStyle.style_id ? 'checkmark-container selected' : 'checkmark-container' }>
                <CheckCircleFilled />
              </div>
              <img className='style-thumbnail' src={productStyle.photos[0].thumbnail_url}/>
            </div>
          )}
        </div>
        <div className='row-container'>
          {selectedProductStyle.skus.null !== undefined ? <Dropdown className='select-size-drop-down'disabled={true} overlay={sizeMenu} ><Button>OUT OF STOCK</Button></Dropdown> :
            <Dropdown visible={sizeDropDownVisible} onClick={() => setSizeDropDownVisible(true)} className='select-size-drop-down selection-grid-button-dropdown ' overlay={sizeMenu} trigger={['click']}>
              <Button className='selection-grid-button-dropdown' data-testid='size-button' className='size-button'>
                {selectedSizeLetters} <DownOutlined />
              </Button>
            </Dropdown>}
          {selectedSizeLetters === 'SELECT SIZE' ? <Dropdown className='select-quantity-drop-down' disabled={true} overlay={quantityMenu}><Button>-</Button></Dropdown> :
            <Dropdown className='select-quantity-drop-down selection-grid-button-dropdown' overlay={quantityMenu}>
              <Button className='selection-grid-button-dropdown'>
                {selectedQuantity} <DownOutlined />
              </Button>
            </Dropdown>}
        </div>
        <div className='row-container'>
          {selectedProductStyle.skus.null !== undefined ? null :
            <Button className='selection-grid-button-dropdown add-to-bag-button' onClick={(event) => handleAddToCartClick(event)}>
              <div>ADD TO BAG </div>
              <PlusOutlined />
            </Button>
          }
          <Button className='star-icon'><StarOutlined title='star'  /></Button>
        </div>
        <div className='row-container social-icons'>
          <FacebookOutlined  className='icons facebook'/>
          <TwitterOutlined className='icons twitter'/>
          <InstagramOutlined className='icons instagram'/>
        </div>
      </div>
    </>
  );
};



export default SelectionGrid;