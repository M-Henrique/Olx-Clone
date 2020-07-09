import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { PageArea } from './styles';
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

let timer: ReturnType<typeof setTimeout>;

const SignIn = () => {
   const api = useApi();
   const history = useHistory();

   const useQueryString = () => {
      return new URLSearchParams(useLocation().search);
   };
   const query = useQueryString();

   const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
   const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');
   const [uf, setUf] = useState(query.get('state') != null ? query.get('state') : '');

   const [adsTotal, setAdsTotal] = useState(0);
   const [ufList, setUfList] = useState<UF[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [adList, setAdList] = useState<AD[]>([]);
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);

   const [resultOpacity, setResultOpacity] = useState(1);
   const [loading, setLoading] = useState(true);

   const getAdsList = useCallback(async () => {
      setLoading(true);

      let offset = (currentPage - 1) * 2;

      const json = await api.getAds({
         sort: 'desc',
         limit: 9,
         q,
         cat,
         state: uf,
         offset,
      });
      setAdList(json.ads);
      setAdsTotal(json.total);
      setResultOpacity(1);
      setLoading(false);
   }, [api, cat, q, uf, currentPage]);

   useEffect(() => {
      if (adList.length > 0) setPageCount(Math.ceil(adsTotal / adList.length));
      else setPageCount(0);
   }, [adsTotal, adList.length]);

   useEffect(() => {
      setResultOpacity(0.3);
      getAdsList();
   }, [currentPage, getAdsList]);

   useEffect(() => {
      let queryString = [];

      q && queryString.push(`q=${q}`);
      cat && queryString.push(`cat=${cat}`);
      uf && queryString.push(`state=${uf}`);

      history.replace({
         search: `?${queryString.join('&')}`,
      });

      if (timer) clearTimeout(timer);
      timer = setTimeout(getAdsList, 2000);

      setResultOpacity(0.3);
      setCurrentPage(1);
      //eslint-disable-next-line react-hooks/exhaustive-deps
   }, [q, cat, uf]);

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

   let pagination = [];
   for (let page = 1; page <= pageCount; page++) pagination.push(page);

   return (
      <PageContainer>
         <PageArea>
            <div className="leftSide">
               <form action="" method="GET">
                  <input
                     type="text"
                     name="query"
                     placeholder="O que você procura?"
                     value={q!}
                     onChange={(e) => setQ(e.target.value)}
                  />

                  <div className="filterName">Estado:</div>
                  <select name="state" value={uf!} onChange={(e) => setUf(e.target.value)}>
                     <option></option>
                     {ufList.map((uf, index) => (
                        <option key={index} value={uf.name}>
                           {uf.name}
                        </option>
                     ))}
                  </select>

                  <div className="filterName">Categoria:</div>
                  <ul>
                     {categories.map((category, index) => (
                        <li
                           key={index}
                           className={
                              cat === category.slug ? 'categoryItem active' : 'categoryItem'
                           }
                           onClick={() => setCat(category.slug)}
                        >
                           <img src={category.img} alt="Imagem da categoria" />
                           <span>{category.name}</span>
                        </li>
                     ))}
                  </ul>
               </form>
            </div>
            <div className="rightSide">
               <h2>Resultados</h2>
               {loading && adList.length === 0 && <div className="listWarning">Carregando...</div>}
               {!loading && adList.length === 0 && (
                  <div className="listWarning">Não encontramos resultados.</div>
               )}

               <div className="list" style={{ opacity: resultOpacity }}>
                  {adList.map((ad, index) => (
                     <AdItem key={index} data={ad}></AdItem>
                  ))}
               </div>

               <div className="pagination">
                  {pagination.map((page, index) => (
                     <div
                        onClick={() => setCurrentPage(page)}
                        key={index}
                        className={page === currentPage ? 'pagItem active' : 'pagItem'}
                     >
                        {page}
                     </div>
                  ))}
               </div>
            </div>
         </PageArea>
      </PageContainer>
   );
};

export default SignIn;
