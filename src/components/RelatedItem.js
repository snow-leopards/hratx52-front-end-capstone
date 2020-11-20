import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const RelatedItem = ({relatedProductID}) => {
  const [productName, setProductName] = useState('Loading...');
  const [imgURL, setImgURL] = useState('https://via.placeholder.com/150');

  useEffect(() => {
    if (relatedProductID === null) {
      return;
    }
    fetch(`http://3.21.164.220/products/${relatedProductID}`)
      .then(productInfo => productInfo.json())
      .then((productInfo) => {
        /*
        {
          category: "Pants"
          default_price: "40"
          description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers."
          features: (2) [{…}, {…}]
          id: 3
          name: "Morning Joggers"
          slogan: "Make yourself a morning person"
        }
        */
        setProductName(productInfo.name);
      })
      .catch(() => {
        console.log(`Error fetching related product info for product with id ${relatedProductID}:`, err);
      });
    fetch(`http://3.21.164.220/products/${relatedProductID}/styles`)
      .then(styleInfo => styleInfo.json())
      .then(({results}) => { //styleInfo is an object with only has one useful key: "results", which is an array of style infos
        console.log('Style info for', relatedProductID, ':', results);
      })
      .catch((err) => {
        console.log(`Error fetching related product styles for product with id ${relatedProductID}:`, err);
      });
  }, []);

  return (
    <div>
      <Card
        hoverable
      >
        <div><img src={imgURL} /></div>
        <div>{productName}</div>
      </Card>
    </div>
  );
};

export default RelatedItem;