import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../../components/OverviewComponent/Carousel';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockProductStyles } from './mockProductStyles';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);



describe('testing DescriptionsAndFeatures component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      overview: {
        product: {
          id: 1,
          name: "Camo Onesie",
          slogan: "Blend in to your crowd",
          description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
          category: "Jackets",
          defaultPrice: "140",
          featuresList: [
              {
                feature: "Buttons",
                value: "Brass"
              }
          ]
        }
      },
      productList: [],
      productStyleList: mockProductStyles,
      defaultProductStyle: {}
    });
    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <Carousel selectedProductStyle={mockProductStyles[0]}/>
      </Provider>);

  });

    it('renders 6 pictures', async () => {
      expect(document.getElementsByClassName("slick-track")[0].childNodes.length).toBe(6);
    });

    it('expands on button click', async () => {

      expect(document.getElementsByClassName("expand-button-container expanded")).toHaveLength(0);

      fireEvent.click(document.getElementsByClassName("expand-button")[0]);

      expect(document.getElementsByClassName("expand-button-container expanded")).toHaveLength(1);
    });

});