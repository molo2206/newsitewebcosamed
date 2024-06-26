import requests from './Instance'

const BulletinServices = {
    getBulletin: async () => {
        return requests.get(`/public/bulletins`)
    },
    getBulletinHome:async () => {
         return requests.get('/public/bulletinhome')
    },
    oneBulletin: async (id: any) => {
        return requests.get(`/public/bulletins/detail/${id}`)
    },
    lastBulletin: async () => {
		return requests.get(`/public/lastbulletin`)
	}
}

export default BulletinServices