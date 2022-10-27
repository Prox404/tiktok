import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await request.post(path, data, options);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await request.put(path, data, options);
    return response.data;
}

export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

request.interceptors.request.use(function (config) {
    const token =
        "Bearer " + JSON.parse(localStorage.getItem("token"))?.token;
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default request;