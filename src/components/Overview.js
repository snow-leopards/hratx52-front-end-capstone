import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct } from '../reducers/overviewReducers';

const Overview = () => {

  const product = useSelector(selectProduct);

  return (
    <div>
    This is Overview Section for {product}
    </div>
  );
};


export default Overview;