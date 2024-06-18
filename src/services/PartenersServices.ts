import requests from './Instance'
const PartenersServices = {
	getPartners: async () => {
		return requests.get(`/getparteners`)
	},
	oneBlog: async (id: any) => {
		return requests.get(`/parteners/${id}`)
	},
	getBlogHome: async()=>{
		return requests.get('/public/bloghome')
	}
}
export default PartenersServices
