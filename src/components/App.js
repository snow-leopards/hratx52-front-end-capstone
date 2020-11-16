import React from 'react';
import { Router, Link } from '@reach/router';
import { Rate } from 'antd';
import '../App.css';
import ProductDetails from './ProductDetails';
import ProductList from './ProductList';
import PageHeader from './Header';


const App = () => {

  return (
    <>
      <PageHeader></PageHeader>
      <Router>
        <ProductList path='/'></ProductList>
        <ProductDetails path='/details/:id'></ProductDetails>
      </Router>
    </>
  );
};

export default App;