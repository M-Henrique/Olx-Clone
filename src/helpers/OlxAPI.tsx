import Cookies from 'js-cookie';
import qs from 'qs';

type Body = object & {
   name?: string;
   token?: string;
   uf?: string;
   email: string;
   password: string;
};

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchPost = async (endpoint: string, body: Body) => {
   if (!body.token) {
      let token = Cookies.get('token');
      if (token) {
         body.token = token;
      }
   }

   const res = await fetch(BASEAPI + endpoint, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
   });

   const json = await res.json();

   if (json.notallowed) {
      window.location.href = '/signin';
      return;
   }

   return json;
};

const apiFetchGet = async (endpoint: string, body: Body = {} as Body) => {
   if (!body.token) {
      let token = Cookies.get('token');
      if (token) {
         body.token = token;
      }
   }

   const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

   const json = await res.json();

   if (json.notallowed) {
      window.location.href = '/signin';
      return;
   }

   return json;
};

const OlxAPI = {
   login: async (email: string, password: string) => {
      const json = await apiFetchPost('/user/signin', { email, password });
      return json;
   },

   register: async (name: string, email: string, password: string, uf: string) => {
      const json = await apiFetchPost('/user/signup', { name, email, password, uf: uf });

      return json;
   },

   getUfs: async () => {
      const json = await apiFetchGet('/states');
      console.log(json);
      return json.states;
   },
};

export default () => OlxAPI;
