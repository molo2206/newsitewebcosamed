import requests from './Instance'
const CommunicatedServices = {
	getCommunicate: async () => {
		return requests.get(`/public/getcommuniques`)
	},
	oneCommunicate: async (id: any) => {
		return requests.get(`/public/detailcommunicate/${id}`)
	},
	getLastCommunicate: async ()=>{
		   return requests.get(`/public/lastcommuniques`)
	}
}
export default CommunicatedServices
