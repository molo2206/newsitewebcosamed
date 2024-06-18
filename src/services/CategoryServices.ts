import requests from './Instance'
const CategoryServices = {
    getCategory: async () => {
        return requests.get(`/category`)
    },
    getblogCat: async (id: any) => {
        return requests.get(`/categoryblog/public/${id}`)
    },
    getOneCategory: async (id: any) => {
        return requests.get(`/category/${id}`)
    }
}

export default CategoryServices
