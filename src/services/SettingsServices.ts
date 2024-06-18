import requests from './Instance'
const SettingsServices = {
    getSettings: async () => {
		return requests.get(`/settings`)
	},
	getAdresse: async () => {
		return requests.get(`/public/adresses`)
	}

}

export default SettingsServices