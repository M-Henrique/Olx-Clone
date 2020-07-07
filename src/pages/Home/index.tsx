import React, { useState, FormEvent } from 'react';

import { SearchArea, PageArea } from './styles';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';

const SignIn = () => {
   const api = useApi();

   return (
      <>
         <SearchArea>
            <PageContainer>
               <div className="searchBox">
                  <form action="/ads" method="GET">
                     <input type="text" name="query" placeholder="O que você procura?" />
                     <select name="state"></select>
                     <button>Pesquisar</button>
                  </form>
               </div>
               <div className="categoryList"></div>
            </PageContainer>
         </SearchArea>
         <PageContainer>
            <PageArea></PageArea>
         </PageContainer>
      </>
   );
};

export default SignIn;
