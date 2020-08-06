import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Shoes from "./containers/Shoes/Shoes";
import SelectedShoe from "./containers/SelectedShoe/SelectedShoe";
import Account from "./containers/Account/Account";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/selected-shoe" component={SelectedShoe} />
          <Route path="/account" component={Account} />
          <Route path="/" exact component={Shoes} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
