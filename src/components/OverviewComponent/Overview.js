import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle, selectDefaultProductStyle } from '../../reducers/overviewReducers';
import { Layout, Row, Col, Skeleton, message } from 'antd';

import Carousel from './Carousel';
import SelectionGrid from './SelectionGrid';
import DescriptionAndFeatures from './DescriptionAndFeatures';

const { Content } = Layout;

const Overview = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);
  const defaultProductStyle = useSelector(selectDefaultProductStyle);

  // overview component state --->  not shared state
  const [selectedProductStyle, setSelectedProductStyle] = useState(null);
  //gives me key number of selected size in the dropdown menu
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeLetters, setSelectedSizeLetters] = useState('SELECT SIZE');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [sizeDropDownVisible, setSizeDropDownVisible] = useState(false);


  useEffect(() => {
    // invokes ajax requests for selected product by id
    dispatch(fetchProductInformation(props.productId));
    dispatch(fetchProductStyle(props.productId));
  }, []);

  //updates photos in the carousel according to selected style id
  if (selectedProductStyle === null && defaultProductStyle != null) {
    setSelectedProductStyle(defaultProductStyle);
  }

  // clicking on style thumbnail sets product style id in local state
  const handleStyleClick = (styleID) => {
    console.log('style with style id: ' + styleID + ' was clicked');

    var selectedProductStyle = productStyleList.find((element) => {
      return element.style_id === styleID;
    });
    setSelectedSize(null);
    setSelectedSizeLetters('SELECT SIZE');
    setSelectedProductStyle(selectedProductStyle);
    setSelectedQuantity(1);
  };

  const handleSizeClick = (event) => {
    //Set state of selected Size
    //This will cause a re-render
    //On re-render, choose available quantities for selected SKU

    setSelectedSize(event.item.props['sku-id']);
    setSelectedSizeLetters(event.item.props.value);
  };

  const handleQuantityClick = (event) => {
    setSelectedQuantity(event.item.props.value);
  };

  const handleAddToCartClick = (event) => {
    if (selectedSizeLetters === 'SELECT SIZE') {
      message.error('Please, select size');
    } else{
      message.success(product.name + ' in size ' + selectedSizeLetters + ' is added to your shooping cart. Quantity: ' + selectedQuantity );
    }

    // message.info('Item: ' + product.name + '. Size: ' + selectedSizeLetters + ' was added to your shooping cart. \n Quantity: ' + selectedQuantity );

  };

  return (
    <>
      <Layout>
        <Content>
          {productStyleList.length === 0 || product.id === null || selectedProductStyle == null ? <Skeleton paragraph={{ rows: 16 }} className='overview-skeleton' active /> :
            < div >
              <Row gutter={[24, 24]}>
                <Col span={16}>
                  <Carousel selectedProductStyle={selectedProductStyle} />
                </Col>
                <Col span={8}>
                  <SelectionGrid
                    selectedProductStyle={selectedProductStyle}
                    handleSizeClick={handleSizeClick}
                    selectedQuantity={selectedQuantity}
                    handleQuantityClick={handleQuantityClick}
                    selectedSize={selectedSize}
                    selectedSizeLetters={selectedSizeLetters}
                    handleStyleClick={handleStyleClick}
                    handleAddToCartClick={handleAddToCartClick}
                    sizeDropDownVisible={sizeDropDownVisible}

                  />
                </Col>
              </Row>
              <Row gutter={[24, 24]} style={{ paddingTop: '10px' }} >
                <DescriptionAndFeatures />
              </Row>
            </div>
          }
        </Content>
      </Layout>
    </>
  );
};


export default Overview;