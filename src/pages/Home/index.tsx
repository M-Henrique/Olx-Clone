import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { SearchArea, PageArea } from './styles';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

interface UF {
   name: string;
}

interface Category {
   name: string;
   img: string;
   slug: string;
}

interface AD {
   id: string;
   image: string;
   title: string;
   price: number;
   priceNegotiable: boolean;
}

const SignIn = () => {
   const api = useApi();

   const [ufList, setUfList] = useState<UF[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [adList, setAdList] = useState<AD[]>([]);

   useEffect(() => {
      const getUfs = async () => {
         const ufList = await api.getUfs();
         setUfList(ufList);
      };
      getUfs();
   }, [api]);

   useEffect(() => {
      const getCategories = async () => {
         const categoryList = await api.getCategories();
         setCategories(categoryList);
      };
      getCategories();
   }, [api]);

   useEffect(() => {
      const getRecentAds = async () => {
         const json = await api.getAds({
            sort: 'desc',
            limit: 8,
         });
         setAdList(json.ads);
      };
      getRecentAds();
   }, [api]);

   return (
      <>
         <SearchArea>
            <PageContainer>
               <div className="searchBox">
                  <form action="/ads" method="GET">
                     <input type="text" name="query" placeholder="O que você procura?" />
                     <select name="state">
                        {ufList.map((uf, index) => (
                           <option key={index} value={uf.name}>
                              {uf.name}
                           </option>
                        ))}
                     </select>
                     <button>Pesquisar</button>
                  </form>
               </div>
               <div className="categoryList">
                  {categories.map((category, index) => (
                     <Link key={index} to={`/ads?cat=${category.slug}`} className="categoryItem">
                        <img src={category.img} alt="Imagem da categoria" />
                        <span>{category.name}</span>
                     </Link>
                  ))}
               </div>
            </PageContainer>
         </SearchArea>
         <PageContainer>
            <PageArea>
               <h2>Anúncios Recentes</h2>
               <div className="list">
                  {adList.map((ad, index) => (
                     <AdItem key={index} data={ad}></AdItem>
                  ))}
               </div>
               <Link to="/ads" className="seeAllLink">
                  Ver Todos
               </Link>
               <hr />
               <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
               </p>
            </PageArea>
         </PageContainer>
      </>
   );
};

export default SignIn;
