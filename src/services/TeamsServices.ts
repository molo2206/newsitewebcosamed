import requests from './Instance'
const TeamsServices = {
	getTeam: async () => {
		return requests.get(`/public/team`)
	},
}
export default TeamsServices
