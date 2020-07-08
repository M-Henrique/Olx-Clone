import React, { useState, useEffect, FormEvent } from 'react';

import { PageArea } from './styles';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/AuthHandler';

interface UF {
   _id: string;
   name: string;
}

const SignUp = () => {
   const api = useApi();

   const [name, setName] = useState('');
   const [uf, setUf] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [ufList, setUfList] = useState<UF[]>([]);

   const [disabled, setDisabled] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      const getUfs = async () => {
         const ufList = await api.getUfs();
         setUfList(ufList);
      };
      getUfs();
   }, [api]);

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setDisabled(true);
      setError('');

      if (password !== confirmPassword) {
         setError('Senhas não batem');
         setDisabled(false);
         return;
      }

      const json = await api.register(name, email, password, uf);

      if (json.error) {
         setError(json.error);
      } else {
         doLogin(json.token);
         window.location.href = '/';
      }

      setDisabled(false);
   };

   return (
      <PageContainer>
         <PageTitle>Cadastro</PageTitle>
         <PageArea>
            {error !== '' && <ErrorMessage>{error}</ErrorMessage>}

            <form onSubmit={handleSubmit} action="">
               <label className="area">
                  <div className="area--title">Nome Completo</div>
                  <div className="area--input">
                     <input
                        type="text"
                        disabled={disabled}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Estado</div>
                  <div className="area--input">
                     <select value={uf} onChange={(e) => setUf(e.target.value)} required>
                        <option></option>
                        {ufList.map((uf, index) => (
                           <option key={index} value={uf._id}>
                              {uf.name}
                           </option>
                        ))}
                     </select>
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">E-mail</div>
                  <div className="area--input">
                     <input
                        type="email"
                        disabled={disabled}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Senha</div>
                  <div className="area--input">
                     <input
                        type="password"
                        disabled={disabled}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title">Confirmar Senha</div>
                  <div className="area--input">
                     <input
                        type="password"
                        disabled={disabled}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                     />
                  </div>
               </label>

               <label className="area">
                  <div className="area--title"></div>
                  <div className="area--input">
                     <button disabled={disabled}>Fazer Cadastro</button>
                  </div>
               </label>
            </form>
         </PageArea>
      </PageContainer>
   );
};

export default SignUp;
