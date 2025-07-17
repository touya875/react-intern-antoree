import createInstanceAxios from 'services/axios.customize';

const axios = createInstanceAxios(import.meta.env.VITE_BACKEND_URL);


export const getBooksAPI = (query: string) => {
    const urlBackend = `/api/v1/book?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend,
        {
            headers: {
                delay: 100
            }
        }
    )
}

export const getCategoryAPI = () => {
    const urlBackend = `/api/v1/database/category`;
    return axios.get<IBackendRes<string[]>>(urlBackend);
}


export const getBookByIdAPI = (id: string) => {
    const urlBackend = `/api/v1/book/${id}`;
    return axios.get<IBackendRes<IBookTable>>(urlBackend,
        {
            headers: {
                delay: 100
            }
        }
    )
}
