import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Sobre from './pages/Sobre';

const Routes = () => {
   return (
      <BrowserRouter>
         <Route component={Home} path="/" exact></Route>
         <Route component={Sobre} path="/sobre"></Route>
      </BrowserRouter>
   );
};

export default Routes;
