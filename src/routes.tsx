import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdPage from './pages/AdPage';

const Routes = () => {
   return (
      <Switch>
         <Route component={Home} path="/" exact></Route>
         <Route component={About} path="/about"></Route>
         <Route component={SignIn} path="/signin"></Route>
         <Route component={SignUp} path="/signup"></Route>
         <Route component={AdPage} path="/ad/:id"></Route>
         <Route component={NotFound}></Route>
      </Switch>
   );
};

export default Routes;
