import React from 'react';
import { Card } from 'antd';

const RelatedItem = ({relatedProductID}) => {
  return (
    <div>
      <Card
        hoverable
      >
        {relatedProductID}
      </Card>
    </div>
  );
};

export default RelatedItem;