import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { List, Card } from 'antd';
import RelatedItem from './RelatedItem.js';

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

const YourOutfit = ({productId}) => {
  var [outfitItemIDs, setOutfitItemIDs] = useState([]);

  // will return an array, e.g. ["1","3","10"]
  const readOutfitItemIDsCookie = () => {
    var name = 'outfitItemIDs=';
    var cookieArray = document.cookie.split(';');

    // cookie will be a string, e.g. 'outfitItemIDs=[1,3,8]'
    for (var cookie of cookieArray) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.slice(1);
      }
      if (cookie.indexOf(name) === 0) {
        return JSON.parse(cookie.substring(name.length, cookie.length));
      }
    }
    return [];
  };

  const addToOutfitItemIDsCookie = (outfitItemID) => {

    // Cookies must have an expiration date:
    var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days in the future
    var expires = 'expires=' + d.toUTCString() + ';';

    var outfitItemIDsTemp = readOutfitItemIDsCookie(); // this function returns an array, e.g. ["1","3","10"]

    // Add our new outfit to list (convert to set to enfore uniqueness)
    var outfitSet = new Set(outfitItemIDsTemp);
    outfitSet.add(outfitItemID);
    outfitItemIDsTemp = [...outfitSet];
    document.cookie = 'outfitItemIDs=' + JSON.stringify(outfitItemIDsTemp) + ';' + expires + 'path=/';
  };

  const resetOutfitItemIDsCookie = () => {
    document.cookie = 'outfitItemIDs=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  };

  const addToOutfit = () => {
    addToOutfitItemIDsCookie(productId);
    setOutfitItemIDs(readOutfitItemIDsCookie());
  };

  const resetOutfit = () => {
    resetOutfitItemIDsCookie();
    setOutfitItemIDs(readOutfitItemIDsCookie());
  };

  useEffect(() => {
    setOutfitItemIDs(readOutfitItemIDsCookie());
  }, []);

  return (
    <div className="YourOutfit">
      <p style={{'textAlign': 'center'}}>Your Outfit</p>

      <button onClick={addToOutfit}>Add to Outfit</button> <br />
      <button onClick={resetOutfit}>Reset Outfit</button> <br />

      {JSON.stringify(outfitItemIDs)}
    </div>
  );
};

export default YourOutfit;