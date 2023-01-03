import axios from 'axios';
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

//resone chisnh la axios get data
export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
};

export default request;
