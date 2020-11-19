import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Space, Divider, Progress } from 'antd';
import Ratings from './Ratings';
import { selectMetaData, fetchReviewList, fetchMeta } from '../../reducers/ratingsReducers';
import { selectProduct } from '../../reducers/overviewReducers.js';

const RatingProductBreakdown = (props) => {

  //dispatch invocation
  const dispatch = useDispatch();
  //retrieve metaData
  useEffect(() => {
    dispatch(fetchMeta(props.productId));
  }, []);

  //data from store
  const product = useSelector(selectProduct);
  const metaData = useSelector(selectMetaData);
  // console.log('product breakdown: ', metaData);

  return (
    <div>
      Product Breakdown
      <br />
      Comfort:
      <br />
      <Progress
        type={'line'}
        steps={5}
        strokeColor={'green'}
        percent={50}
        showInfo={true}
      />
      <br />
      Fit:
      <br />
      <Progress
        type={'line'}
        steps={5}
        strokeColor={'green'}
        percent={75} />
      <br />
      Quality:
      <br />
      <Progress
        type={'line'}
        steps={5}
        strokeColor={'green'}
        percent={25} />
    </div>
  );
};

export default RatingProductBreakdown;