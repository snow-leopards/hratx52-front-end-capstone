import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const ProductCard = ({ relatedProductID }) => {
  const imgHeight = 200;
  const placeHolderImgURL = `https://via.placeholder.com/${imgHeight}`;
  const [productName, setProductName] = useState('Loading...');
  const [category, setCategory] = useState('Category');
  const [originalPrice, setOriginalPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
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
      .then(({ results }) => { /* styleInfo is an object with only has one useful key: "results", which is an array of style infos */
        console.log('results:', results);
        let foundADefaultStyle = false;
        for (let style of results) {
          if (style['default?'] === 1) {
            foundADefaultStyle = true;
            setImgURL(style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : placeHolderImgURL); /* TODO: search for a picture somewhere else if one isn't found */
            setOriginalPrice(style.original_price);
            setSalePrice(style.sale_price);

            break;
          }
        }
        if (!foundADefaultStyle) { /* TODO: if a picture isn't found, search for a picture somewhere else */
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
      <Card>
        <div>
          <img
            src={imgURL}
            alt={productName}
            height={imgHeight}
            style={
              {
                position: 'relative',
              }
            }
          />
          <span
            style = {
              {
                fontWeight: 'bold',
                fontSize: '1em',
                position: 'absolute',
                zIndex: '1',
                right: '24px',
              }
            }
          >
            <button>
              {/* X */}
              ⭐
            </button>
          </span>
        </div>
        <div>{category}</div>
        <div style={{fontWeight: 'bold'}}>{productName}</div> {/* TODO: style with css file! */}
        <div>
          {salePrice > 0
            ? <span>Sale! ${salePrice}</span> /* TODO strikethrough original price */
            : <span>${originalPrice}</span>
          }
        </div>
      </Card>
    </a>
  );
};

export default ProductCard;