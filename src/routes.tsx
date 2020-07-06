import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Sobre from './pages/Sobre';

const Routes = () => {
   return (
      <>
         <Route component={Home} path="/" exact></Route>
         <Route component={Sobre} path="/sobre"></Route>
      </>
   );
};

export default Routes;
