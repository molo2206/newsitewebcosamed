import requests from './Instance'
const FinancesServices = {
    getFinance: async () => {
        return requests.get(`/public/finance`)
    },
    oneFinance: async (id: any) => {
        return requests.get(`/finance/${id}`)
    },
}
export default FinancesServices
