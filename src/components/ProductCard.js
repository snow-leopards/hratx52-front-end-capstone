import React, { useState, useEffect } from 'react';
import { Card, Popover } from 'antd';
import url from './url.js';

/* a component needed to conditionally wrap the action button with a popover tag*/
/* https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2 */
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const ProductCard = ({ relatedProductID, actionButtonType, removeItemFromOutfit, parentProductName, parentProductFeatures }) => {
  const imgHeight = 200;
  const placeHolderImgURL = `https://via.placeholder.com/${imgHeight}`;
  const [productName, setProductName] = useState('Loading...');
  const [productFeatures, setProductFeatures] = useState([]);
  const [category, setCategory] = useState('Category');
  const [originalPrice, setOriginalPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [imgURL, setImgURL] = useState(placeHolderImgURL);
  const [actionButtonSymbol, setActionButtonSymbol] = useState(
    ((actionButtonType) => {
      if (actionButtonType === 'compare-with-current') {
        return '⭐';
      } else if (actionButtonType === 'remove-from-outfit') {
        return 'X';
      } else {
        return '?';
      }
    })(actionButtonType)
  );

  const getProductInfo = () => {
    fetch(`${url}/products/${relatedProductID}`)
      .then(productInfo => productInfo.json())
      .then((productInfo) => {
        setProductName(productInfo.name);
        setCategory(productInfo.category);
        setProductFeatures(productInfo.features);
        // console.log('productInfo.features', productInfo.features);
      })
      .catch((err) => {
        console.log(`Error fetching related product info for product with id ${relatedProductID}:`, err);
      });

  };

  const getStyleInfo = () => {
    fetch(`${url}/products/${relatedProductID}/styles`)
      .then(styleInfo => styleInfo.json())
      .then(({ results }) => { /* styleInfo is an object with only has one useful key: "results", which is an array of style infos */
        let foundADefaultStyle = false;
        for (let style of results) {
          if (style['default?'] === 1) {
            foundADefaultStyle = true;
            setImgURL(style.photos[0].thumbnail_url ? style.photos[0].thumbnail_url : placeHolderImgURL); /* TODO: search for a picture somewhere else if one isn't found */
            setOriginalPrice(style.original_price);
            setSalePrice(style.sale_price);

            break;
          }
        }
        if (!foundADefaultStyle) { /* TODO: if a picture isn't found, search for a picture somewhere else */
          setImgURL(results[0].photos[0].thumbnail_url ? results[0].photos[0].thumbnail_url : placeHolderImgURL);
          setOriginalPrice(results[0].original_price);
          setSalePrice(results[0].sale_price);
        }
      })
      .catch((err) => {
        console.log(`Error fetching related product styles for product with id ${relatedProductID}:`, err);
      });
  };

  const popoverContent = (
    <div className="grid-container"
      style={
        {
          'display': 'grid',
          'gridTemplateColumns': 'auto auto auto',
          'textAlign': 'center',
          'gridGap': '25px',
        }
      }
    >
      <div className="grid-item" style={{ 'fontWeight': 'bold' }}>{productName}</div>
      <div className="grid-item"></div>
      <div className="grid-item" style={{ 'fontWeight': 'bold' }}>{parentProductName}</div>

      {
        parentProductFeatures
          ? parentProductFeatures.map((parentFeature, index) => {
            if (productFeatures.map(a => a.feature).indexOf(parentFeature.feature) === -1) {
              return (
                <>
                  <div className="grid-item" key={`row${index}.col0`}>---</div>
                  <div className="grid-item" key={`row${index}.col1`}>{parentFeature.feature}</div>
                  <div className="grid-item" key={`row${index}.col2`}>{parentFeature.value}</div>
                </>
              );
            } else {
              return (
                <>
                  <div className="grid-item" key={`row${index}.col0`}>{productFeatures[productFeatures.map(a => a.feature).indexOf(parentFeature.feature)].value}</div>
                  <div className="grid-item" key={`row${index}.col1`}>{parentFeature.feature}</div>
                  <div className="grid-item" key={`row${index}.col2`}>{parentFeature.value}</div>
                </>
              );
            }
          })
          : <>No Array Found</>
      }
      {
        productFeatures
          ? productFeatures.map((feature, index) => {
            if (parentProductFeatures ? parentProductFeatures.map(a => a.feature).indexOf(feature.feature) === -1 : false) {
              return (
                <>
                  <div className="grid-item" key={`second-item-row${index}.col0`}>{feature.value}</div>
                  <div className="grid-item" key={`second-item-row${index}.col1`}>{feature.feature}</div>
                  <div className="grid-item" key={`second-item-row${index}.col2`}>---</div>
                </>
              );
            } else {
              return (
                <> </>
              );
            }
          })
          : <>No Array Found</>
      }
    </div>
  );

  const handleActionButton = (e) => {
    e.preventDefault();
    if (actionButtonType === 'remove-from-outfit') {
      removeItemFromOutfit(relatedProductID);
      return (<></>);
    } else if (actionButtonType === 'compare-with-current') {
      // console.log('Popup a comparison window');
      // Do nothing: this is handled by the ConditionalWrapper PopOver tag
    } else {
      console.log('unknown actionButtonType');
    }
  };

  useEffect(() => {
    if (relatedProductID === null) {
      return null; /* returning null prevents a component from rendering */
    }
    getProductInfo();
    getStyleInfo();
  }, []);

  return (
    <a href={`/details/${relatedProductID}`}>
      <Card>
        <div>
          <img
            src={imgURL}
            alt={productName}
            height={imgHeight}
            style={
              {
                position: 'relative',
              }
            }
          />
          <span
            style={
              {
                fontWeight: 'bold',
                fontSize: '1em',
                position: 'absolute',
                zIndex: '1',
                right: '24px',
              }
            }
          >
            <ConditionalWrapper
              condition={actionButtonType === 'compare-with-current'}
              wrapper={children =>
                <Popover placement="bottom" title="Comparing:" content={popoverContent} trigger="hover">
                  {children}
                </Popover>}
            >
              <button
                onClick={handleActionButton}
              >
                {actionButtonSymbol}
              </button>
            </ConditionalWrapper>
          </span>
        </div>
        <div>{category}</div>
        <div style={{ fontWeight: 'bold' }}>{productName}</div> {/* TODO: style with css file! */}
        <div>
          {salePrice > 0
            ? <span>Sale! ${salePrice}</span> /* TODO strikethrough original price */
            : <span>${originalPrice}</span>
          }
        </div>
      </Card>
    </a>
  );
};

export default ProductCard;
