import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_SERVER_URL = 'https://social-network.samuraijs.com/api/1.0/';
const API_KEY = localStorage.getItem('apiKey');
const getApiKey = () => API_KEY || 0; // there's no other ways to save services-key :(
export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaError = 10
}

// config
const config: AxiosRequestConfig = {
    baseURL: API_SERVER_URL,
    withCredentials: true,
    headers: {
        'API-KEY': getApiKey()
    }
};
export const defaultInstance: AxiosInstance = axios.create(config);

// responses
export interface Response {
    resultCode: ResultCodes;
    messages: string[]; // empty if resultCode === 0 (Success)
}
export interface DefaultResponse extends Response {
    data: {} | { userId: number };
}

// utils.tsx
export const modifyHeaders = () => {
    // temporary solution
    // @ts-ignore
    defaultInstance.defaults.headers.common['API-KEY'] = getApiKey();
};
