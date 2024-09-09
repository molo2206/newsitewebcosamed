import { useElements, useStripe } from '@stripe/react-stripe-js'
import requests from './Instance'
const DanateService = {
   
	create: async (body: any) => {
		return requests.post(`/donate`, body, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}

export default DanateService
