import React, { useEffect, useState, Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { List, Card, Carousel } from 'antd';
import RelatedItem from './RelatedItem.js';

const RelatedItems = ({productId}) => {

  // Our "main" information array of related items
  // This will need to be built from multiple calls to the API
  const [relatedItemIDs, setRelatedItemIDs] = useState([null, null, null, null]);

  const getRelatedItemsFromAPI = () => {
    console.log('Fetching related items for itemID:', productId);

    // Initial fetch, to find the list of relatedItems e.g. [5, 9, 7, 2, 1]
    fetch(`http://3.21.164.220/products/${productId}/related`)
      .then(tempRelatedItemIDs => tempRelatedItemIDs.json())
      .then((tempRelatedItemIDs) => {
        setRelatedItemIDs(tempRelatedItemIDs);
        let relatedItemsStylePromises = [];
      })
      .catch((err) => {
        console.log('Error when fetching IDs of relatedItems', err);
      });
  };

  useEffect(() =>{
    getRelatedItemsFromAPI();
  }, []);

  return (
    <div>
      <ScrollMenu
        alignCenter = {false}
        data = {
          relatedItemIDs.map((relatedItemID, index) => {
            return <RelatedItem relatedProductID={relatedItemID} key={index}/>;
          })
        }
      />
    </div>
  );
};

export default RelatedItems;