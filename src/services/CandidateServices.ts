import requests from './Instance'
const CandidateServices = {
    getCandidate: async (id: any) => {
        return requests.get(`public/getcandidate/${id}`)
    },
    getCandidateRejected: async (id: any) => {
        return requests.get(`public/getcandidate_rejected/${id}`)
    },
    oneCandidate: async (id: any) => {
        return requests.get(`/public/detail/${id}`)
    },
    oneBlogs: async (slug: any) => {
        return requests.get(`/public/blogs/details/${slug}`)
    },
    lastBlog: async () => {
        return requests.get(`/public/lastblog`)
    },
    apply: async (body: any) => {
        return requests.post(`/public/apply`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
    },
    update_apply: async (body: any) => {
        return requests.post(`/public/update_apply`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}
export default CandidateServices
