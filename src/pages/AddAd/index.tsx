import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';

interface Category {
   _id: string;
   name: string;
}

const SignIn = () => {
   const api = useApi();
   const fileField = useRef<HTMLInputElement>(null);
   const history = useHistory();

   const [categories, setCategories] = useState<Category[]>([]);

   const [title, setTitle] = useState('');
   const [category, setCategory] = useState('');
   const [price, setPrice] = useState('');
   const [priceNegotiable, setPriceNegotiable] = useState(false);
   const [description, setDescription] = useState('');

   const [disabled, setDisabled] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      const getCategories = async () => {
         const cats = await api.getCategories();
         setCategories(cats);
      };
      getCategories();
   }, [api]);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setDisabled(true);
      setError('');

      let errors: string[] = [];

      if (!title.trim()) errors.push('Sem título');
      if (!category) errors.push('Sem categoria');

      if (errors.length === 0) {
         const fData = new FormData();
         fData.append('title', title);
         fData.append('price', price);
         //NÃO CONSIGO ARRUMAR SEM MEXER NO BACKEND
         //@ts-ignore
         fData.append('priceneg', priceNegotiable);
         fData.append('desc', description);
         fData.append('cat', category);

         //@ts-ignore
         if (fileField.current.files.length > 0) {
            //@ts-ignore
            for (let i = 0; i < fileField.current.files.length; i++) {
               //@ts-ignore
               fData.append('img', fileField.current.files[i]);
            }
         }

         const json = await api.addAd(fData);
         if (!json.error) {
            history.push(`/ad/${json.id}`);
            return;
         } else {
            setError(json.error);
         }
      } else {
         setError(errors.join('/n'));
      }

      setDisabled(false);
   };

   const priceMask = createNumberMask({
      prefix: 'R$ ',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: '.',
      allowDecimal: true,
      decimalSymbol: ',',
   });

   return (
      <PageContainer>
         <PageTitle>Postar um anúncio</PageTitle>
         <PageArea>
            {error !== '' && <ErrorMessage>{error}</ErrorMessage>}

            <form onSubmit={handleSubmit} action="">
               <label className="area">
                  <div className="area--title">Título</div>
                  <div className="area--input">
                     <input
                        type="text"
                        disabled={disabled}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Categoria</div>
                  <div className="area--input">
                     <select
                        disabled={disabled}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                     >
                        <option></option>
                        {categories &&
                           categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                 {category.name}
                              </option>
                           ))}
                     </select>
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Preço</div>
                  <div className="area--input">
                     <MaskedInput
                        mask={priceMask}
                        placeholder="R$ "
                        disabled={disabled || priceNegotiable}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Preço Negociável</div>
                  <div className="area--input">
                     <input
                        type="checkbox"
                        disabled={disabled}
                        checked={priceNegotiable}
                        onChange={(e) => setPriceNegotiable(!priceNegotiable)}
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Descrição</div>
                  <div className="area--input">
                     <textarea
                        disabled={disabled}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                     ></textarea>
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Imagem(s)</div>
                  <div className="area--input">
                     <input type="file" disabled={disabled} multiple ref={fileField} />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                     <button disabled={disabled}>Adicionar anúncio</button>
                  </div>
               </label>
            </form>
         </PageArea>
      </PageContainer>
   );
};

export default SignIn;
