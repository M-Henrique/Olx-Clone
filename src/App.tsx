import React from 'react';

import Routes from './routes';
import { Template } from './components/MainComponents';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import './App.css';

function App() {
   return (
      <Template>
         <Header />
         <Routes />
         <Footer />
      </Template>
   );
}

export default App;
