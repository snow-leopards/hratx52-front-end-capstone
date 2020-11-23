import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const RelatedItem = ({ relatedProductID }) => {
  const placeHolderImgURL = 'https://via.placeholder.com/150';
  const [productName, setProductName] = useState('Loading...');
  const [category, setCategory] = useState('Category');
  const [originalPrice, setOriginalPrice] = useState('-999');
  const [salePrice, setSalePrice] = useState('-999');
  const [imgURL, setImgURL] = useState(placeHolderImgURL);

  const getProductInfo = () => {
    fetch(`http://3.21.164.220/products/${relatedProductID}`)
      .then(productInfo => productInfo.json())
      .then((productInfo) => {
        console.log('productinfo:', productInfo);
        setProductName(productInfo.name);
        setCategory(productInfo.category);
      })
      .catch(() => {
        console.log(`Error fetching related product info for product with id ${relatedProductID}:`, err);
      });

  };

  const getStyleInfo = () => {
    fetch(`http://3.21.164.220/products/${relatedProductID}/styles`)
      .then(styleInfo => styleInfo.json())
      .then(({ results }) => { //styleInfo is an object with only has one useful key: "results", which is an array of style infos
        // console.log('Styles for item', relatedProductID, ':', results);
        console.log('results:', results);
        let foundADefaultStyle = false;
        for (let style of results) {
          if (style['default?'] === 1) {
            foundADefaultStyle = true;
            setImgURL(style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : placeHolderImgURL); // TODO: search for a picture somewhere else if one isn't found
            setOriginalPrice(style.original_price);
            setSalePrice(style.sale_price);

            break;
          }
        }
        if (!foundADefaultStyle) { // TODO: search for a picture somewhere else
          // console.log('Item', relatedProductID, 'didn\'t have a default style');
          setImgURL(results[0].photos[0].thumbnail_url ? results[0].photos[0].thumbnail_url : placeHolderImgURL);
          setOriginalPrice(results[0].original_price);
          setSalePrice(results[0].sale_price);
        }
      })
      .catch((err) => {
        console.log(`Error fetching related product styles for product with id ${relatedProductID}:`, err);
      });
  };

  useEffect(() => {
    if (relatedProductID === null) {
      return;
    }
    getProductInfo();
    getStyleInfo();
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
            height={200}
          />
        </div>
        <div>{category}</div>
        <div>{productName}</div>
        <div>
          {salePrice > 0
            ? <span>Sale! ${salePrice}</span> // TODO strikethrough original price
            : <span>${originalPrice}</span>
          }
        </div>
      </Card>
    </a>
  );
};

export default RelatedItem;