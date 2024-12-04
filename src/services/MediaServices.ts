import requests from './Instance'
const MediaServices = {
	getMedia: async () => {
		return requests.get(`/public/media/"photo"`)
	},
}
export default MediaServices
