import requests from './Instance'
const VisitorsServices = {

    create: async (body: any) => {
        return requests.post(`/public/visitors`, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
    },
}

export default VisitorsServices
