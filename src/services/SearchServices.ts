import requests from './Instance'
const SearchServices = {

    create: async (body: any, page: number) => {
        return requests.post(`/search_all${page ? "?page=" + page : ""}`, body, {
            headers: {
                Accept: 'application/json',
            },
        })
    },
    getResultSearch: async () => {
        return requests.get(`/all_result`)
    },
    getResultSearchOffre: async (body: any, page: number) => {
        return requests.post(`/public/search_all_offre${page ? "?page=" + page : ""}`, body, {
            headers: {
                Accept: 'application/json',
            },
        })
    },
}

export default SearchServices
