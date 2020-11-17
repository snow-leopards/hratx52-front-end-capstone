import React, { useEffect} from 'react';
import { List, Card } from 'antd';

const RelatedItems = ({itemID}) => {
  const getRelatedItems = () => {
    console.log('inside getRelatedItems');
  };

  useEffect(() =>{
    getRelatedItems();
  });

  const placeholderData = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
  return (
    <div>
      <div>This is RelatedItems Section</div>
      <List
        grid = {{ gutter: 16, column: 4 }}
        dataSource = {placeholderData}
        renderItem={item => (
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      >
      </List>
    </div>
  );
};

export default RelatedItems;