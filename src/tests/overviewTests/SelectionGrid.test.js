import React from 'react';
import ReactDOM from 'react-dom';
import SelectionGrid from '../../components/OverviewComponent/SelectionGrid';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockProductStyles } from './mockProductStyles';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);



describe('testing SelectionGrid component', () => {
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
        },
        productList: [],
        productStyleList: mockProductStyles,
        defaultProductStyle: {}
      },
      ratings: {
        metaData: {
          ratings: {
            2: 1,
            3: 1,
            4: 2
          }
        }
      }
    });
    const div = document.createElement('div');

    let visible = false;

    const setSizeDropDownVisible = (value) => {
      visible = value;
    }

    render(
      <Provider store={store}>
        <SelectionGrid
        selectedProductStyle={mockProductStyles[0]}
        selectedSize={null}
        selectedSizeLetters={'SELECT SIZE'}
        setSizeDropDownVisible={setSizeDropDownVisible}
        sizeDropDownVisible={visible}

        />
      </Provider>);
  });

  it('renders product category from the state', async () => {
    expect(screen.getByText(/jackets/i)).toBeInTheDocument();
  });

  it('renders product name from the state', async () => {
    expect(screen.getByText(/camo onesie/i)).toBeInTheDocument();
  });

  it('renders default product style price', async () => {
    expect(screen.getByText('$' + mockProductStyles[0].original_price)).toBeInTheDocument();
  });

  it('renders default product style name', async () => {
    expect(screen.getByText(mockProductStyles[0].name.toUpperCase())).toBeInTheDocument();
  });

  it('renders 6 style thumbnails', async () => {
    expect(document.getElementsByClassName("style-image-container")).toHaveLength(6);
  });

  it('thumbnail has checkmark icon on style selected by default', async () => {
    expect(document.getElementsByClassName("style-image-container")[0].childNodes[0].classList.value).toBe('checkmark-container selected');
  });

  it('thumbnail does not have checkmark icon on a style not selected by default', async () => {
    expect(document.getElementsByClassName("style-image-container")[1].childNodes[0].classList.value).toBe('checkmark-container');
  });

  it('renders "SELECT SIZE" on size drop down menu', async () => {
    expect(screen.getByText(/select size/i)).toBeInTheDocument();
  });

  it('renders "ADD TO BAG" on size drop down menu', async () => {
    expect(screen.getByText(/add to bag/i)).toBeInTheDocument();
  });

  it('renders star icon on button element', async () => {
    expect(screen.getByTitle('star')).toBeInTheDocument();
  });

  // it('selects size on drop down button click', () => {
  //   fireEvent.click(screen.getByTestId('size-button'));
  //   expect(screen.getByText('XS')).toBeInTheDocument();
  // });

});