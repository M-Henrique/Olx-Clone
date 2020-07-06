import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

const Routes = () => {
   return (
      <Switch>
         <Route component={Home} path="/" exact></Route>
         <Route component={Sobre} path="/sobre"></Route>
         <Route component={NotFound}></Route>
      </Switch>
   );
};

export default Routes;
