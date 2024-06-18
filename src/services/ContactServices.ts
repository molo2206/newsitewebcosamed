import requests from './Instance'
const ContactServices = {

	create: async (body: any) => {
		return requests.post(`/contact`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}

export default ContactServices
