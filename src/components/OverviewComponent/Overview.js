import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle, selectDefaultProductStyle } from '../../reducers/overviewReducers';
import Slider from 'react-slick';
import { Layout, Row, Col, Descriptions, Skeleton, List, Divider, Rate, Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UpOutlined, ExpandOutlined, ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined, StarOutlined, UserOutlined} from '@ant-design/icons';
import { ButtonBack, ButtonFirst, ButtonLast, ButtonNext,
  CarouselProvider, DotGroup, Image, ImageWithZoom, Slide } from 'pure-react-carousel';
import Zoom from 'react-img-zoom';




const { Header, Footer, Sider, Content } = Layout;

const Overview = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);
  const defaultProductStyle = useSelector(selectDefaultProductStyle);

  // const defaultPictures = productStyleList[0].photos;

  // overview component state --->  not shared state
  // const [name, setName] = useState('Kornelija');
  const [expanded, setExpanded] = useState(false);
  const [selectedProductStyle, setSelectedProductStyle] = useState(null);
  //gives me key number of selected size in the dropdown menu
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeLetters, setSelectedSizeLetters] = useState('SELECT SIZE');





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


  useEffect(() => {
    // invokes ajax requests for selected product by id
    dispatch(fetchProductInformation(props.productId));
    dispatch(fetchProductStyle(props.productId));
  }, []);


  // expands image when expand icon is clicked on a top right corner of a picture
  const toggleCrap = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };
  // settings for photo carousel
  const settings = {
    dots: false,
    variableWidth: true,
    centerMode: true,
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  // const handleButtonClick = (e) => {
  //   message.info('Click on left button.');
  //   console.log('click left button', e);
  // };

  const handleSizeClick = (event) => {
    //Set state of selected Size
    setSelectedSize(event.item.props.skuId);
    setSelectedSizeLetters(event.item.props.value);

    //This will cause a re-render
    //On re-render, choose available quantities for selected SKU
  };

  const sizeMenu = selectedProductStyle ? (
    <Menu>
      {Object.keys(selectedProductStyle.skus).map((skuId) => {
        return (
          <Menu.Item skuId={skuId} value={selectedProductStyle.skus[skuId].size} onClick={(event) => handleSizeClick(event)} icon={<UserOutlined />}>
            {selectedProductStyle.skus[skuId].size}
          </Menu.Item>
        );
      })}
    </Menu>
  ) : null;


  /// work in progres for handleQuantityClick
  const handleQuantityClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };


  const quantityMenu = (selectedSize !== null && selectedProductStyle !== null) ? (
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
      <Layout>

        <Content>
          {productStyleList.length === 0 || product.id === null || selectedProductStyle == null ? <Skeleton paragraph={{ rows: 16 }} className='overview-skeleton' active /> :
            < div >
              <Row gutter={[24, 24]}>
                <Col span={16}>
                  <div class='carousel-place-holder'>
                    <div onClick={ ()=> toggleCrap() } >Expand</div>
                    <div class={expanded ? 'carousel-container expanded' : 'carousel-container'}>
                      <Slider {...settings} key={selectedProductStyle.style_id}>
                        {selectedProductStyle.photos.map((photo) => {
                          return (
                            <div key={photo.url}>
                              <Zoom key={photo.url}
                                img={photo.url}
                                zoomScale={expanded ? 2 : 1}
                                width={600}
                                height={500}
                              />
                            </div>
                          );
                        }
                        )}
                      </Slider>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
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
                      <Dropdown overlay={quantityMenu}>
                        <Button>
                          ADD TO BAG <DownOutlined />
                        </Button>
                      </Dropdown>
                      <Button><StarOutlined /></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[24, 24]} style={{ paddingTop: '50px' }} >
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
              </Row>
            </div>
          }
        </Content>
      </Layout>
    </>
  );
};


export default Overview;