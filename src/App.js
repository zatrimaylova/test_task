import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PLP from './components/PLP/PLP.js';
import { Header } from './components/Header/Header.js';
import { PDPComponent } from './components/PDP/PDP.js';
import CartPage from './components/CartPage/CartPage';

import GlobalStyles from './components/GlobalStyle/GlobalStyle.js';

const getCurrensyListQuery = gql`
  query {
    currencies
  }
`;

class App extends React.Component {
  
  render() {
    const { currencies } = this.props?.data;

    return (
      <>
        <GlobalStyles />
          <div className="App">
            <Router>
              <Switch>
                <Route exact path="/">
                  {currencies && <Header currencies={currencies} />}
                  <PLP />
                </Route>
                <Route exact path="/product/:id">
                  {currencies && <Header currencies={currencies} />}
                  <PDPComponent />
                </Route>
                <Route  path="/cart">
                  {currencies && <Header currencies={currencies} />}
                  <CartPage />
                </Route>
                <Route exact path="/:id">
                  {currencies && <Header currencies={currencies} />}
                  <PLP />
                </Route>
              </Switch>
          </Router>
        </div>
      </>
    )
  }
}

export default graphql(getCurrensyListQuery)(App);
