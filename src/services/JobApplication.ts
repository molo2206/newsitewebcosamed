import requests from './Instance'
const JobApplication = {
    Apply_User: async (id: any) => {
        return requests.get(`/public/getapply-by-user/${id}`)
    },
}
export default JobApplication
