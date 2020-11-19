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
      <Header id='siteWideMessage' style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', color: 'orange', backgroundColor: '#f0f2f5'}}>Site-wide annoucement message - sale / discount offer - new product highlight</Header>
      <Router>
        <ProductList path='/'></ProductList>
        <ProductDetails path='/details/:id'></ProductDetails>
      </Router>
    </>
  );
};

export default App;