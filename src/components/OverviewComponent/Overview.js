import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation, selectProductStyle, fetchProductStyle } from '../../reducers/overviewReducers';
import { Layout, Row, Col, Descriptions, Skeleton, List, Divider } from 'antd';
import { DownOutlined, UpOutlined, ExpandOutlined, ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { ButtonBack, ButtonFirst, ButtonLast, ButtonNext,
  CarouselProvider, DotGroup, Image, ImageWithZoom, Slide, Slider } from 'pure-react-carousel';


const { Header, Footer, Sider, Content } = Layout;

const Overview = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);


  // overview component state --->  not shared state
  // const [name, setName] = useState('Kornelija');
  const [carouselClassName, setCarouselClassName] = useState('outer-carousel');
  const [carouselSlideWidth, setCarouselSlideWidth] = useState(1);

  // expands image when expand icon is clicked on a top right corner of a picture
  const toggleExpandCarousel = () => {
    // changes overview component state
    carouselClassName === 'outer-carousel' ? setCarouselClassName('outer-carousel expanded') : setCarouselClassName('outer-carousel');
    carouselSlideWidth === 1 ? setCarouselSlideWidth(3) : setCarouselSlideWidth(1);
  };

  useEffect(() => {
    // invokes ajax requests for selected product by id
    dispatch(fetchProductInformation(props.productId));
    dispatch(fetchProductStyle(props.productId));
  }, []);

  return (
    <>
      <Layout>

        <Content>
          {productStyleList.length === 0 || product.id === null ? <Skeleton paragraph={{ rows: 16 }} className='overview-skeleton' active /> :
            <>
              <Row gutter={[24, 24]}>
                <Col span={16}>
                  <div className='carouselPlaceHolder'>

                    {/* <Image
                      width={350}
                      src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg"
                    /> */}
                    <CarouselProvider
                      visibleSlides={1}
                      totalSlides={6}
                      step={1}
                      className={carouselClassName}
                      naturalSlideWidth={8}
                      naturalSlideHeight={6}
                      hasMasterSpinner
                    >
                      <CarouselProvider
                        className='innerCarousel'
                        visibleSlides={7}
                        totalSlides={8}
                        step={1}
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        hasMasterSpinner
                        orientation='vertical'
                      >
                        <ButtonBack className='chevron'><UpOutlined /></ButtonBack>
                        <Slider >
                          {/* {productStyleList.photos.map((index, foto) =>
                          <Slide index={index}>
                            <Image className='small-image' src={foto.url} />
                          </Slide>
                        )} */}
                          <Slide index={0}>
                            <Image className='small-image' src={productStyleList[0].photos[0].url} />
                          </Slide>
                          <Slide index={1}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={2}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={3}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={4}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={5}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={6}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                          <Slide index={7}>
                            <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                          </Slide>
                        </Slider>
                        <ButtonNext className='chevron'><DownOutlined /></ButtonNext>
                      </CarouselProvider>
                      <div className='expand-button' onClick={() => toggleExpandCarousel()}><ExpandOutlined /></div>
                      <Slider>
                        <Slide index={0}>
                          <ImageWithZoom src={productStyleList[0].photos[0].url} />
                        </Slide>
                        <Slide index={1}>
                          <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                        </Slide>
                        <Slide index={2}>
                          <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                        </Slide>
                        <Slide index={3}>
                          <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                        </Slide>
                        <Slide index={4}>
                          <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                        </Slide>
                        <Slide index={5}>
                          <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
                        </Slide>
                      </Slider>
                      <ButtonBack className='arrows left'><ArrowLeftOutlined /></ButtonBack>
                      <ButtonNext className='arrows right'><ArrowRightOutlined /></ButtonNext>
                    </CarouselProvider>
                  </div>
                </Col>
                <Col span={8}>
                  <Descriptions title="Product Info">
                    <Descriptions.Item span={3} label="Product Name">{product.name}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Price">${product.defaultPrice}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Style">{productStyleList[0].name}</Descriptions.Item>
                  </Descriptions>
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
            </>
          }
        </Content>
      </Layout>
    </>
  );
};


export default Overview;