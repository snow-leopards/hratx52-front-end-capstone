import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Zoom from 'react-img-zoom';
import { ExpandOutlined } from '@ant-design/icons';



const Carousel = (props) => {

  const dispatch = useDispatch();

  // carousel component state --->  not shared state
  const [expanded, setExpanded] = useState(false);

  // expands image when expand icon is clicked on a top right corner of a picture
  const toggleExpand = () => {
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
      <div className='carousel-place-holder'>
        <div className={expanded ? 'expand-button-container expanded' : 'expand-button-container'}>
          <div className='expand-button' onClick={ ()=> toggleExpand() } >
            <ExpandOutlined />
          </div>
        </div>
        <div className={expanded ? 'carousel-container expanded' : 'carousel-container'}>
          <Slider {...settings} key={props.selectedProductStyle.style_id}>
            {props.selectedProductStyle.photos.map((photo) => {
              return (
                <div key={photo.url}>
                  <Zoom key={photo.url}
                    img={photo.url}
                    zoomScale={expanded ? 2 : 1}
                    width={700}
                    height={600}
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