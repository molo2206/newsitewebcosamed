import requests from './Instance'
const ThematiquesServices = {
	getThematiques: async () => {
		return requests.get(`/getthematiques`)
	},
}
export default ThematiquesServices
