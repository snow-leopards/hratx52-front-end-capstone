import React from 'react';
import { useSelector } from 'react-redux';
import { selectMetaData } from '../../reducers/ratingsReducers';
import { Rate } from 'antd';

//average rating, to be used in overview and ratings&review widgets
const Ratings = () => {
  const metaData = useSelector(selectMetaData);

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

  return (
    <div>
      <Rate
        allowHalf
        value={parseFloat(average())}
        disabled
      /> <br/>
    </div>
  );
};

export default Ratings;