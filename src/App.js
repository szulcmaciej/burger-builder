import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrderList from './containers/OrderList/OrderList';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={OrderList} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
