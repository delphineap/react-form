import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchBrands } from './redux/actions';

import Loadable from 'react-loadable';

import Brands from './component/Brands/Brands';
import Tyres from './component/Tyres/Tyres';
import Home from './component/Home';
import Header from './component/Header';
import TyreDetail from './component/TyreDetail';

import BrandEdit from './component/BrandEdit';

import './App.css';

const LoadableTyreEdit = Loadable({
  loader: () => import('./component/TyreEdit', /* webpackChunkName: "tyreEdit" */),
  loading: () => <h1>chargement...</h1>,
});

class App extends Component {


  onMouseOver = () => {
    LoadableTyreEdit.preload();
  }

  render () {
    return (
      <BrowserRouter>
        <div className="App" onMouseOver={this.onMouseOver}>
          <Helmet titleTemplate="%s | allopneu.com"></Helmet>
          <div className="intro">
            <ul>
              <li>Mettre en place le code splitting</li>
            </ul>
          </div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tyres" component={Tyres} />} />
            <Route exact path="/tyres/detail/:id" component={TyreDetail} />
            <Route exact path="/tyres/detail/:id/edit" component={LoadableTyreEdit} />
            <Route exact path="/brands" component={Brands} />
            <Route exact path="/brands/:id/edit" component={BrandEdit} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands,
    tyres: state.tyres
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBrands: () => dispatch(fetchBrands()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
