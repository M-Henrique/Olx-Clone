import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { PageArea, Fake, OthersArea, BreadCrumb } from './styles';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

interface ADCategory {
   name: string;
   slug: string;
   _id: string;
}

interface User {
   email: string;
   name: string;
}

interface ADInfo {
   category: ADCategory;
   dateCreated: string;
   description: string;
   id: string;
   images: string[];
   others: string[];
   price: number;
   priceNegotiable: boolean;
   stateName: string;
   title: string;
   userInfo: User;
   views: number;
}

const AdPage = () => {
   const api = useApi();
   const { id } = useParams();

   const [loading, setLoading] = useState(true);
   const [adInfo, setAdInfo] = useState<ADInfo>({} as ADInfo);

   useEffect(() => {
      const getAdInfo = async (id: string) => {
         const json = await api.getAd(id, true);
         setAdInfo(json);
         setLoading(false);
      };
      getAdInfo(id);
   }, [api, id]);

   const formatDate = (date: string) => {
      let cDate = new Date(date);

      let months = [
         'Janeiro',
         'Fevereiro',
         'Março',
         'Abril',
         'Maio',
         'Junho',
         'Julho',
         'Agosto',
         'Setembro',
         'Outubro',
         'Novembro',
         'Dezembro',
      ];

      let cDay = cDate.getDate();
      let cMonth = cDate.getMonth();
      let cYear = cDate.getFullYear();

      return `${cDay} de ${months[cMonth]} de ${cYear}`;
   };

   return (
      <PageContainer>
         {adInfo.category && (
            <BreadCrumb>
               Você está aqui:
               <Link to="/">Home</Link>/
               <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>/
               <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>
                  {adInfo.category.name}
               </Link>
               / {adInfo.title}
            </BreadCrumb>
         )}
         <PageArea>
            <div className="leftSide">
               <div className="box">
                  <div className="adImage">
                     {loading && <Fake height={300} />}
                     {adInfo.images && (
                        <Slide>
                           {adInfo.images.map((img, index) => (
                              <div key={index} className="each-slide">
                                 <img src={img} alt="Imagens do anúncio" />
                              </div>
                           ))}
                        </Slide>
                     )}
                  </div>
                  <div id="adInfo">
                     <div className="adName">
                        {loading && <Fake height={20} />}
                        {adInfo.title && <h2>{adInfo.title}</h2>}
                        {adInfo.dateCreated && (
                           <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                        )}
                     </div>
                     <div className="adDescription">
                        {loading && <Fake height={100} />}
                        {adInfo.description}
                        <hr />
                        {adInfo.views && <small>Visualizações: {adInfo.views}</small>}
                     </div>
                  </div>
               </div>
            </div>

            <div className="rightSide">
               <div className="box box--padding">
                  {loading && <Fake height={20} />}
                  {adInfo.priceNegotiable && 'Preço negociável'}
                  {!adInfo.priceNegotiable && adInfo.price && (
                     <div className="price">
                        Preço: <span>R$ {adInfo.price}</span>
                     </div>
                  )}
               </div>
               {loading && <Fake height={50} />}
               {adInfo.userInfo && (
                  <>
                     <a
                        className="contactSellerLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`mailto: ${adInfo.userInfo.email}`}
                     >
                        Fale com o vendedor
                     </a>
                     <div className="createdby box box--padding">
                        <strong>{adInfo.userInfo.name}</strong>
                        <small>E-mail: {adInfo.userInfo.email}</small>
                        <small>Estado: {adInfo.stateName}</small>
                     </div>
                  </>
               )}
            </div>
         </PageArea>

         <OthersArea>
            {adInfo.others && (
               <>
                  <h2>Outras ofertas do vendedor</h2>
                  <div className="list">
                     {adInfo.others.map((product, index) => (
                        //@ts-ignore
                        <AdItem key={index} data={product}></AdItem>
                     ))}
                  </div>
               </>
            )}
         </OthersArea>
      </PageContainer>
   );
};

export default AdPage;
