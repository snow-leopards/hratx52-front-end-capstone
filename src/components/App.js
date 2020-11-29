import React from 'react';
import { Router, Link } from '@reach/router';
import { Rate } from 'antd';
import '../App.css';
import ProductDetails from './ProductDetails';
import ProductList from './ProductList';
import PageHeader from './Header';
import { Layout } from 'antd';

const { Header } = Layout;


const App = () => {

  return (
    <>
      <PageHeader></PageHeader>
      <div className = 'product-details-container'>
        <Header className='site-wide-header' >Site-wide annoucement message - sale / discount offer - new product highlight</Header>
        <Router>
          <ProductList path='/'></ProductList>
          <ProductDetails path='/details/:id'></ProductDetails>
        </Router>
      </div>
    </>
  );
};

export default App;