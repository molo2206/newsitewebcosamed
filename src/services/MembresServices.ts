import requests from './Instance'
const MembresServices = {

	create: async (body: any) => {
		return requests.post(`/membepublic`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		})
	},
	update: async (body: any, id: string) => {
		return requests.post(`/partener/${id}`, body, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}

export default MembresServices
