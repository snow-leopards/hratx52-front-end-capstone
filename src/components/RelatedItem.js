import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const RelatedItem = ({ relatedProductID }) => {
  const placeHolderImgURL = 'https://via.placeholder.com/150';
  const [productName, setProductName] = useState('Loading...');
  const [imgURL, setImgURL] = useState(placeHolderImgURL);

  useEffect(() => {
    if (relatedProductID === null) {
      return;
    }
    fetch(`http://3.21.164.220/products/${relatedProductID}`)
      .then(productInfo => productInfo.json())
      .then((productInfo) => {
        setProductName(productInfo.name);
      })
      .catch(() => {
        console.log(`Error fetching related product info for product with id ${relatedProductID}:`, err);
      });
    fetch(`http://3.21.164.220/products/${relatedProductID}/styles`)
      .then(styleInfo => styleInfo.json())
      .then(({ results }) => { //styleInfo is an object with only has one useful key: "results", which is an array of style infos
        // console.log('Styles for item', relatedProductID, ':', results);
        let foundADefaultStyle = false;
        for (let style of results) {
          if (style['default?'] === 1) {
            foundADefaultStyle = true;
            setImgURL(style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : placeHolderImgURL); // TODO: search for a picture somewhere else if one isn't found
            break;
          }
        }
        if (!foundADefaultStyle) { // TODO: search for a picture somewhere else
          // console.log('Item', relatedProductID, 'didn\'t have a default style');
          setImgURL(results[0].photos[0].thumbnail_url ? results[0].photos[0].thumbnail_url : placeHolderImgURL);
        }
      })
      .catch((err) => {
        console.log(`Error fetching related product styles for product with id ${relatedProductID}:`, err);
      });
  }, []);

  return (
    <a href={`/details/${relatedProductID}`}>
      <Card
        hoverable
      >
        <div>
          <img
            src={imgURL}
            alt={productName}
            height={150}
          />
        </div>
        <div>{productName}</div>
      </Card>
    </a>
  );
};

export default RelatedItem;