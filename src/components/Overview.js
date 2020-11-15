import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, fetchProductInformation } from '../reducers/overviewReducers';
import { Layout, Row, Col, Descriptions } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ButtonBack, ButtonFirst, ButtonLast, ButtonNext,
  CarouselProvider, DotGroup, Image, ImageWithZoom, Slide, Slider } from 'pure-react-carousel';


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

              {/* <Image
                width={350}
                src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg"
              /> */}
              <CarouselProvider
                visibleSlides={1}
                totalSlides={6}
                step={1}
                naturalSlideWidth={400}
                naturalSlideHeight={500}
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
                    <Slide index={0}>
                      <Image className='small-image' src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
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
                <Slider>
                  <Slide index={0}>
                    <ImageWithZoom src="https://www.victoriassecret.com/p/760x1013/tif/56/77/56776f6e8c424ac68b4d91a900fbfd9c/111751764ZCK_OM_F.jpg" />
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
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
              </CarouselProvider>
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