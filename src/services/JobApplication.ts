import requests from './Instance'
const JobApplication = {
    Apply_User: async (id: any) => {
        return requests.get(`/public/getapply-by-user/${id}`)
    },
    getCandidateRejected: async (id: any) => {
        return requests.get(`public/getcandidate_rejected/${id}`)
    },
}
export default JobApplication
