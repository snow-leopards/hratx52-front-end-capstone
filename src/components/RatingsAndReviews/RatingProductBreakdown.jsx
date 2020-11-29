import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Space, Divider, Progress, Rate, Slider } from 'antd';
import Ratings from './Ratings';
import { selectMetaData, fetchReviewList, fetchMeta } from '../../reducers/ratingsReducers';
import { selectProduct } from '../../reducers/overviewReducers.js';

const RatingProductBreakdown = ({productId}) => {

  //data from store
  const product = useSelector(selectProduct);
  const metaData = useSelector(selectMetaData);
  console.log('metadata: ', metaData);

  //dispatch invocation
  const dispatch = useDispatch();
  //retrieve metaData
  useEffect(() => {
    dispatch(fetchMeta(productId));
  }, []);

  //average rating
  const average = () => {
    var sumTotal = 0;
    var numberOfRatings = 0;
    for (var key in metaData.ratings) {
      var totalVotes = parseInt(key) * metaData.ratings[key];
      sumTotal += totalVotes;
      numberOfRatings += metaData.ratings[key];
    }
    return parseFloat(sumTotal / numberOfRatings).toFixed(1);
  };
  //total ratings
  const totalRatings = () => {
    var total = 0;
    for (var key in metaData.ratings) {
      total += metaData.ratings[key];
    }
    return total;
  };
  //percent recommending product
  const recommending = Math.round((metaData.recommended[1] / (metaData.recommended[0] + metaData.recommended[1]) * 100));

  //Product Characteristics
  const ProductCharacteristics = () => {
    var characteristicsArray = [];
    //Put each characteristic obj in array with new item of title[key]
    for (var category in metaData.characteristics) {
      var newChar = metaData.characteristics[category];
      newChar.charName = category;
      characteristicsArray.push(newChar);
    }
    return <div>
      {
        characteristicsArray.map((char) => (
          <div key={char.id}>
            <p>{char.charName}</p>
            <Slider
              step={0.1}
              included={false}
              value={char !== undefined ? char.value : 3}
              max={5}
              toolTipVisible={true}/>
          </div>
        ))
      }
    </div>;
  };

  //TODO: refactor to modularize progress
  return (
    <div>
      <b
        style={{
          fontSize: 32
        }}
      >{average()}</b>
      <Ratings/>
      {recommending}% of reviews recommend this product.
      <br/>
      <b>Rating Breakdown</b>
      <br/>
      <u>5 stars</u>
      <Progress
        type={'line'}
        strokeColor={'gold'}
        percent={metaData.ratings !== undefined ? metaData.ratings[5] / totalRatings() * 100 : 50}
        showInfo={true}
      />
      <br/>
      <u>4 stars</u>
      <br/>
      <Progress
        type={'line'}
        strokeColor={'gold'}
        percent={metaData.ratings !== undefined ? metaData.ratings[4] / totalRatings() * 100 : 50}
        showInfo={true}
      />
      <u>3 stars</u>
      <br/>
      <Progress
        type={'line'}
        strokeColor={'gold'}
        percent={metaData.ratings !== undefined ? metaData.ratings[3] / totalRatings() * 100 : 50}
        showInfo={true}
      />
      <u>2 stars</u>
      <br/>
      <Progress
        type={'line'}
        strokeColor={'gold'}
        percent={metaData.ratings !== undefined ? metaData.ratings[2] / totalRatings() * 100 : 50}
        showInfo={true}
      />
      <u>1 stars</u>
      <Progress
        type={'line'}
        strokeColor={'gold'}
        percent={metaData.ratings !== undefined ? metaData.ratings[1] / totalRatings() * 100 : 50}
        showInfo={true}
      />
      <br/>

      <br/>
      <b>Product Breakdown</b>
      <br/>
      <ProductCharacteristics />
    </div>
  );
};

export default RatingProductBreakdown;