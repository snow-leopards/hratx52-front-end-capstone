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
  };

  const handleSizeClick = (event) => {
    //Set state of selected Size
    //This will cause a re-render
    //On re-render, choose available quantities for selected SKU

    setSelectedSize(event.item.props.skuId);
    setSelectedSizeLetters(event.item.props.value);
  };

  /// work in progres for handleQuantityClick
  const handleQuantityClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
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
                    handleQuantityClick={handleQuantityClick}
                    selectedSize={selectedSize}
                    selectedSizeLetters={selectedSizeLetters}
                    handleStyleClick={handleStyleClick}
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