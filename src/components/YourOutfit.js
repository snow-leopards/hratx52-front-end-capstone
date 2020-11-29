import React, { useEffect, useState } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { List, Card } from 'antd';
import ProductCard from './ProductCard.js';

//Arrows for the react-horizontal-scrolling-menu
const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
      style = {
        {
          fontSize: '2em',
        }
      }
    >
      {text}
    </div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const YourOutfit = ({productId}) => {
  let [outfitItemIDs, setOutfitItemIDs] = useState([]);

  // will return an array, e.g. ["1","3","10"]
  const readOutfitItemIDsCookie = () => {
    let name = 'outfitItemIDs=';
    let cookieArray = document.cookie.split(';');

    // cookie will be a string, e.g. 'outfitItemIDs=["1","3","10"]'
    for (let cookie of cookieArray) {
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
    let d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days in the future
    let expires = 'expires=' + d.toUTCString() + ';';

    let outfitItemIDsTemp = readOutfitItemIDsCookie(); // this function returns an array, e.g. ["1","3","10"]

    // Add our new outfit to list (convert to set to enfore uniqueness)
    let outfitSet = new Set(outfitItemIDsTemp);
    outfitSet.add(outfitItemID);
    outfitItemIDsTemp = [...outfitSet];
    document.cookie = 'outfitItemIDs=' + JSON.stringify(outfitItemIDsTemp) + ';' + expires + 'path=/';
  };

  const setOutfitItemIDsCookie = (outfitItemIDs) => {
    // Cookies must have an expiration date:
    let d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days in the future
    let expires = 'expires=' + d.toUTCString() + ';';

    document.cookie = 'outfitItemIDs=' + JSON.stringify(outfitItemIDs) + ';' + expires + 'path=/';

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

  const removeItemFromOutfit = (outfitItemID) => {
    console.log('We want to remove item', outfitItemID, 'from our outfit');
    console.log('outfitItemIDs before removal:', outfitItemIDs);
    let targetIndex = outfitItemIDs.indexOf(outfitItemID);
    if (targetIndex !== -1) { /* Remove the array element at the index of indexOf(outfitItemID) */
      let newOutfitItemIDs = [...outfitItemIDs.slice(0, targetIndex), ...outfitItemIDs.slice(targetIndex + 1, outfitItemIDs.length)];
      console.log('newOutfitItemIDs:', newOutfitItemIDs);
      setOutfitItemIDsCookie(newOutfitItemIDs);
      setOutfitItemIDs(newOutfitItemIDs);
    }
  };

  useEffect(() => {
    setOutfitItemIDs(readOutfitItemIDsCookie());
  }, []);

  return (
    <div className="YourOutfit">
      <p style={{'textAlign': 'center'}}>Your Outfit</p>

      <button onClick={addToOutfit}>Add this item to your outfit!</button> <br />
      <ScrollMenu
        alignCenter = {false}
        dragging = {false}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        // hideSingleArrow={true}
        data = {
          outfitItemIDs.map((outfitItemID, index) => {
            return <ProductCard
              relatedProductID={outfitItemID}
              key={outfitItemID}
              actionButtonType={'remove-from-outfit'}
              removeItemFromOutfit={(outfitItemID) => { removeItemFromOutfit(outfitItemID); }}
            />;
          })
        }
      />
      <button onClick={resetOutfit}>Reset Outfit</button> <br />
    </div>
  );
};

export default YourOutfit;