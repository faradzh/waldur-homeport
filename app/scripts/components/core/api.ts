import { $http, ENV } from './services';

export const get = (endpoint: string, options?: any) =>
  $http.get(`${ENV.apiEndpoint}api${endpoint}`, options);

export const getList = (endpoint, params?) => {
  const options = params ? {params} : undefined;
  return get(endpoint, options).then(response =>
    Array.isArray(response.data) ?
    response.data :
    []
  );
};

export const getFirst = (endpoint, params?) =>
  getList(endpoint, params).then(data => data[0]);

export const getById = (endpoint, id) =>
  get(`${endpoint}${id}/`).then(response => response.data);

export const deleteById = (endpoint, id, options?) =>
  $http.delete(`${ENV.apiEndpoint}api${endpoint}${id}/`, options);

export const post = (endpoint: string, options?: any) =>
  $http.post(`${ENV.apiEndpoint}api${endpoint}`, options);

export const sendForm = (method: string, url: string, options) => {
  const data = new FormData();
  for (const name of Object.keys(options)) {
    if (options[name] !== undefined) {
      data.append(name, options[name]);
    }
  }
  return $http({
    method,
    url,
    data,
    transformRequest: x => x,
    headers: {'Content-Type': undefined},
  });
};

export async function getAll(endpoint, options?) {
  let response = await get(endpoint, options);
  let result = [];

  while (true) {
    if (Array.isArray(response.data)) {
      result = result.concat(response.data);
    }
    const url = getNextPageUrl(response);
    if (url) {
      response = await $http.get(url);
    } else {
      break;
    }
  }
  return result;
}

export const getNextPageUrl = response =>  {
  // Extract next page URL from header links
  const link = response.headers('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(', ').filter(s => s.indexOf('rel="next"') > -1)[0];
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};
