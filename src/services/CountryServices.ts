import requests from './Instance'
const CountryServices = {
	getCountry: async () => {
		return requests.get(`/getcountry`)
	},
}

export default CountryServices
