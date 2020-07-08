import React from 'react';
import { Link } from 'react-router-dom';

import { Item } from './styles';

interface AD {
   id: string;
   image: string;
   title: string;
   price: number;
   priceNegotiable: boolean;
}

interface props {
   key: number;
   data: AD;
}

const AdItem: React.FC<props> = (props) => {
   let price = props.data.priceNegotiable ? 'Preço negociável' : `R$ ${props.data.price}`;

   return (
      <Item className="aditem">
         <Link to={`/ad/${props.data.id}`}>
            <div className="itemImage">
               <img src={props.data.image} alt="Imagem do anúncio" />
            </div>
            <div className="itemName">{props.data.title}</div>
            <div className="itemPrice">{price}</div>
         </Link>
      </Item>
   );
};

export default AdItem;
