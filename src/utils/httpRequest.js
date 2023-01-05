import axios from 'axios';
// console.log(process.env);
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

//resone chisnh la axios get data
export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export default httpRequest;
