import requests from './Instance'
const OffresServices = {
    getOffres: async () => {
        return requests.get(`/getOffres`)
    },
    oneOffre: async (id: any) => {
        return requests.get(`/offre/${id}`)
    },
}
export default OffresServices
