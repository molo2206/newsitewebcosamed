
import requests from './Instance'
const TestimonyServices = {
    getTestimony: async () => {
        return requests.get(`/public/testimonials`)
    },
}
export default TestimonyServices
