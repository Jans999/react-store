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

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal />

    </React.Fragment>
  );
}

export default App;
