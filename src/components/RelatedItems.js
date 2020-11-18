import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';

const RelatedItems = ({itemID}) => {

  const placeholderData = [
    {
      id: 9001,
      name: 'Expanded Product Name with Extra Text',
      defaultPrice: '123',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      id: 2,
      name: 'Lorem Ipsum',
      defaultPrice: '456',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      id: 0,
      name: 'Expanded Product Name with Extra Text but this one is even longer',
      defaultPrice: '1',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
    {
      id: 999999,
      name: 'Test 123',
      defaultPrice: '1234567890',
      imgSrc: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    },
  ];

  // Our "main" information array of related items
  // This will need to be built from multiple calls to the API
  const [relatedItems, setRelatedItems] = useState(placeholderData);

  const getRelatedItemsFromAPI = () => {
    fetch(`http://3.21.164.220/products/${itemID}/related`)
      .then(results => results.json())
      .then((results) => {
        console.log('These are the related items:', results);

      })
      .catch((err) => {
        console.log('Error from fetch inside of relatedItems:', err);
      });
    // console.log('inside getRelatedItemsFromAPI');
  };

  useEffect(() =>{
    getRelatedItemsFromAPI();
  }, []);

  return (
    <div>
      <List
        grid = {{ gutter: 8, column: 4 }}
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