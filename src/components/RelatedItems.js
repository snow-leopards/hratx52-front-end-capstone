import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { List, Card } from 'antd';
import ProductCard from './ProductCard.js';

//Arrows for the react-horizontal-scrolling-menu
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
      style = {
        {
          fontSize: '2em',
        }
      }
    >
      {text}
    </div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const RelatedItems = ({productId}) => {

  // Our "main" information array of related items
  // This will need to be built from multiple calls to the API
  const [relatedItemIDs, setRelatedItemIDs] = useState([]);
  const [productFeatures, setProductFeatures] = useState([]);
  const [productName, setProductName] = useState('Loading...');

  const getRelatedItemsFromAPI = () => {
    // console.log('Fetching related items for itemID:', productId);

    // Initial fetch, to find the list of relatedItems e.g. [5, 9, 7, 2, 1]
    fetch(`http://3.21.164.220/products/${productId}/related`)
      .then(tempRelatedItemIDs => tempRelatedItemIDs.json())
      .then((tempRelatedItemIDs) => {
        setRelatedItemIDs(tempRelatedItemIDs);
      })
      .catch((err) => {
        console.log('Error when fetching IDs of relatedItems', err);
      });
  };

  const getProductInfoFromAPI = () => {
    fetch(`http://3.21.164.220/products/${productId}`)
      .then(productInfo => productInfo.json())
      .then((productInfo) => {
        setProductFeatures(productInfo.features);
        setProductName(productInfo.name);
      })
      .catch((err) => {
        console.log('Error when fetching product info:', err);
      });
  };

  useEffect(() =>{
    getRelatedItemsFromAPI();
    getProductInfoFromAPI();

  }, []);

  return (
    <div>
      <p style={{'textAlign': 'center'}}>Related Products</p>
      <ScrollMenu
        alignCenter = {false}
        dragging = {false}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        // hideSingleArrow={true}
        data = {
          relatedItemIDs.map((relatedItemID, index) => {
            return <ProductCard relatedProductID={relatedItemID} key={index} actionButtonType={'compare-with-current'} parentProductFeatures={productFeatures} parentProductName={productName}/>;
          })
        }
      />
    </div>
  );
};

export default RelatedItems;