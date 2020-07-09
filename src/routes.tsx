import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';

const Routes = () => {
   return (
      <Switch>
         <RouteHandler component={Home} path="/" exact></RouteHandler>
         <RouteHandler component={About} path="/about"></RouteHandler>
         <RouteHandler component={SignIn} path="/signin"></RouteHandler>
         <RouteHandler component={SignUp} path="/signup"></RouteHandler>
         <RouteHandler component={AdPage} path="/ad/:id"></RouteHandler>
         <RouteHandler private component={AddAd} path="/post-an-ad"></RouteHandler>
         <RouteHandler component={NotFound}></RouteHandler>
      </Switch>
   );
};

export default Routes;
