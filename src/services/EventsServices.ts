import requests from './Instance'
const EventsServices = {
	getEvent: async () => {
		return requests.get(`/public/events`)
	},
}
export default EventsServices
