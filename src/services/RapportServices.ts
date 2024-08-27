import requests from './Instance'

const RapportServices = {
    getRapport: async () => {
        return requests.get(`/public/rapports`)
    },

    oneRapport: async (id: any) => {
        return requests.get(`/public/rapport/${id}`)
    },
    lastRapport: async () => {
		return requests.get(`/public/lastrepport`)
	}
}

export default RapportServices