import axios, { AxiosResponse } from "axios";

const responseBody = (response: AxiosResponse) => response.data

export const requests = {
    get: (url: string) => { return axios.get(url).then(responseBody) },
    post: (url: string, body: {}) => { return axios.post(url, body).then(responseBody) },
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => { return axios.delete(url).then(responseBody) },
};