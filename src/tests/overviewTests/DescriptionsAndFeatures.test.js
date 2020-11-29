import React from 'react';
import ReactDOM from 'react-dom';
import DescriptionAndFeatures from '../../components/OverviewComponent/DescriptionAndFeatures';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
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
      }
    });
    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <DescriptionAndFeatures />
      </Provider>);

  });

    it('renders slogan from the state', async () => {
      expect(screen.getByText('Blend in to your crowd')).toBeInTheDocument();

    });

    it('renders description from the state', async () => {
      expect(screen.getByText(/the so fatigues will wake/i)).toBeInTheDocument();
    });

    it('renders freatureList value from the state', async () => {
      expect(screen.getByText(/brass/i)).toBeInTheDocument();
    });

    it('renders freatureList feature from the state', async () => {
      expect(screen.getByText(/button/i)).toBeInTheDocument();
    });

    it('renders check svg element', async () => {
      expect(screen.getByTitle('check')).toBeInTheDocument();
    });

  });


describe('testing DescriptionsAndFeatures component without features', () => {
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
                feature: "null",
                value: "null"
              }
          ]
        }
      }
    });
    const div = document.createElement('div');
    render(
      <Provider store={store}>
        <DescriptionAndFeatures />
      </Provider>);

  });

  it('renders freatureList value from the state', async () => {
    expect(screen.getByTestId('features').text).toBe(' ');
  });
});