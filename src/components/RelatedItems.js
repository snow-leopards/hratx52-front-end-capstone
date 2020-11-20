import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';

//Arrows for the react-horizontal-scrolling-menu
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<<<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>>>', className: 'arrow-next' });

const RelatedItems = ({productId}) => {

  // Our "main" information array of related items
  // This will need to be built from multiple calls to the API
  const [relatedItemIDs, setRelatedItemIDs] = useState([]);

  const getRelatedItemsFromAPI = () => {
    // console.log('Fetching related items for itemID:', productId);

    // Initial fetch, to find the list of relatedItems e.g. [5, 9, 7, 2, 1]
    fetch(`http://3.21.164.220/products/${productId}/related`)
      .then(relatedItemIDs => relatedItemIDs.json())
      .then((relatedItemIDs) => {
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
<<<<<<< HEAD
      <ScrollMenu
        alignCenter = {false}
        dragging = {false}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        data = {
          relatedItemIDs.map((relatedItemID, index) => {
            return <RelatedItem relatedProductID={relatedItemID} key={index}/>;
          })
        }
      />
=======
      <List
        grid = {{ gutter: 8, column: 5 }}
        scroll = {{ x: 400 }}
        dataSource = {relatedItems}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 140 }}
              cover={<img alt="example" src={item.imgSrc} />}
            >
              <Card.Meta
                title={item.name}
                description={'$' + item.defaultPrice}
              />
            </Card>
          </List.Item>
        )}
      >
      </List>
>>>>>>> main
    </div>
  );
};

export default RelatedItems;