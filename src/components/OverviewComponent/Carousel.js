import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, selectProductStyle, selectDefaultProductStyle } from '../../reducers/overviewReducers';
import Slider from 'react-slick';
import Zoom from 'react-img-zoom';
import { ExpandOutlined } from '@ant-design/icons';



const Carousel = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const productStyleList = useSelector(selectProductStyle);
  const defaultProductStyle = useSelector(selectDefaultProductStyle);

  // carousel component state --->  not shared state
  const [expanded, setExpanded] = useState(false);

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


  return (
    <>
      <div class='carousel-place-holder'>
        <div class={expanded ? 'expand-button-container expanded' : 'expand-button-container'}>
          <div class='expand-button' onClick={ ()=> toggleCrap() } >
            <ExpandOutlined />
          </div>
        </div>
        <div class={expanded ? 'carousel-container expanded' : 'carousel-container'}>
          <Slider {...settings} key={props.selectedProductStyle.style_id}>
            {props.selectedProductStyle.photos.map((photo) => {
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
    </>
  );
};


export default Carousel;