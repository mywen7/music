import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

type Method = 'GET' | 'POST';
interface HttpModel {
  method: Method;
  query?: object;
  param?: object;
  data?: object;
}
export async function http(api: string, option: HttpModel) {
  const method = `${option.method}`;
  let url = 'http://localhost:3000/' + api.replace(/^\//, '');

  if (method === 'GET') {
    const queryString = qs.stringify(option.query);
    if (queryString !== '') {
      url = `${url}?${queryString}`;
    }
  }

  const param = option.param as { [key: string]: string};
  if (param && Object.keys(param).length > 0) {
    Object
      .keys(param)
      .forEach((key) => {
        url = url.replace(`(${key})`, param[key] as string);
      });
  }

  const userToken = localStorage.getItem('token') || '';

  const headers: AxiosRequestConfig['headers'] = {};
  const requestData: AxiosRequestConfig['data'] = {
    ...option.data,
  };

  if (userToken) {
    headers.Authorization = userToken;
    requestData.userToken = userToken;
  }

  const axiosConfig: AxiosRequestConfig = {
    url,
    method: option.method,
    headers,
    data: requestData,
  };

  try {
    const { data } = await axios(axiosConfig);
    return data;
  } catch (e) {
    throw e;
  }
}

