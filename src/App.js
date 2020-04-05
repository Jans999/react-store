import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// React-router
import {Switch, Route} from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Details from './components/Details'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Default from './components/Default'
import Modal from './components/Modal'

import {ProductConsumer} from './context'



function App(props) {

  return (

    <ProductConsumer>
    
    {value => {
      const {searching, handleSearchingFlag, location} = value;
      return (


        <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <ProductList searching={searching} />} />
          <Route path="/details" render={() => <Details handleSearchingFlag={handleSearchingFlag}  searching={searching} />} />
          <Route path="/cart" render={() => <Cart searching={searching} />}  />
          <Route render={(props) => <Default props={props} searching={searching} />} />
        </Switch>


        <Modal />
      </React.Fragment>
      )
    }}
    </ProductConsumer>
  );
}

export default App;
