import Cookies from 'js-cookie';
import qs from 'qs';

interface BodyPost {
   name?: string;
   token?: string;
   uf?: string;
   email: string;
   password: string;
}

interface BodyFilePost extends FormData {
   token?: string;
}

interface AdsOpt {
   sort?: string;
   limit?: number;
   q?: string | null;
   cat?: string | null;
   state?: string | null;
   offset?: number;
}

interface ParamsGet extends AdsOpt {
   token?: string;
   id?: string;
   other?: boolean;
}

const BASEAPI = 'http://alunos.b7web.com.br:501';

const apiFetchFile = async (endpoint: string, body: BodyFilePost) => {
   if (!body.token) {
      let token = Cookies.get('token');
      if (token) {
         body.append('token', token);
      }
   }

   const res = await fetch(BASEAPI + endpoint, {
      method: 'POST',
      body,
   });

   const json = await res.json();

   if (json.notallowed) {
      window.location.href = '/signin';
      return;
   }

   return json;
};

const apiFetchPost = async (endpoint: string, body: BodyPost) => {
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

const apiFetchGet = async (endpoint: string, body: ParamsGet = {} as ParamsGet) => {
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
      return json.states;
   },

   getCategories: async () => {
      const json = await apiFetchGet('/categories');
      return json.categories;
   },

   getAds: async (options: AdsOpt) => {
      const json = apiFetchGet('/ad/list', options);
      return json;
   },

   getAd: async (id: string, other: boolean = false) => {
      const json = await apiFetchGet('/ad/item', { id, other });
      return json;
   },

   addAd: async (fData: FormData) => {
      const json = await apiFetchFile('/ad/add', fData);
      return json;
   },
};

export default () => OlxAPI;
