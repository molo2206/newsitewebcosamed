
import requests from './Instance'

const ProjectServices = {
    getProjetct: async () => {
		return requests.get(`/public/project`)
	},
	oneProject: async (id: any) => {
		return requests.get(`/public/project/detail/${id}`)
	},
	lastProject: async () => {
		return requests.get(`/public/lastproject`)
	}
}

export default ProjectServices
