import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';

const RelatedItems = ({itemID}) => {

  const placeholderData = [
    {
      productId: 9001,
      name: 'Expanded Product Name with Extra Text',
      defaultPrice: '123',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      productId: 2,
      name: 'Lorem Ipsum',
      defaultPrice: '456',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      productId: 0,
      name: 'Expanded Product Name with Extra Text but this one is even longer',
      defaultPrice: '1',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      productId: 999999,
      name: 'Test 123',
      defaultPrice: '1234567890',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
  ];

  // Our "main" information array of related items
  // This will need to be built from multiple calls to the API
  const [relatedItems, setRelatedItems] = useState(placeholderData);

  const getRelatedItemsFromAPI = () => {
    let itemID = 5;

    // Initial fetch, to find the list of relatedItems e.g. [5, 9, 7, 2, 1]
    fetch(`http://3.21.164.220/products/${itemID}/related`)
      .then(relatedItemIDs => relatedItemIDs.json())
      .then((relatedItemIDs) => {
        let relatedItemsStylePromises = [];

        // Now fetch the style information for each of the IDs
        for (var relatedItemID of relatedItemIDs) {
          relatedItemsStylePromises.push(fetch(`http://3.21.164.220/products/${relatedItemID}/styles`));
        }
        Promise.all(relatedItemsStylePromises)
          .then((httpResponses) => {
            httpResponses = httpResponses.map(response => response.json());
            Promise.all(httpResponses) // TODO: I think I don't need nested promises here. Can't I do something like .then(styles => styles.json()) ?
              .then((styles) => {
                console.log('An array of styles', styles);

                // Now we can finally build our "final" relatedItems array
                let tempRelatedItems = [];
                for (var style of styles) {
                  tempRelatedItems.push({
                    productId: style.product_id,
                    name: style.product_id,
                    defaultPrice: style.results[0].original_price,
                    imgSrc: style.results[0].photos[0].thumbnail_url,
                  });
                }
                setRelatedItems(tempRelatedItems);
              })
              .catch((err) => {
                console.log('Error when converting response objects with .json()', err);
              });
          })
          .catch((err) => {
            console.log('Error when fetching one of the styles:', err);
          });
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
    </div>
  );
};

export default RelatedItems;