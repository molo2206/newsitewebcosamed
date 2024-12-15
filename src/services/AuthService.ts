
import requests from './Instance'
function AuthService() {
    return {
        login: async (body: any) => {
            return requests.post(`/auth/login`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        logout: async (body: any) => {
            return requests.post(`/auth/logout`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        register: async (body: any) => {
            return requests.post(`/auth/register`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        forgetPassword: async (body: any) => {
            return requests.post(`/auth/forget-password`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },

        resetPassword: async (body: any) => {
            return requests.post(`/auth/reset-password`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },

        verifyOtp: async (body: any) => {
            return requests.post(`/auth/verify-otp`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },

        showprofile: async (id: any) => {
            return requests.get(`/auth/show-profile/${id}`)
        },


        editprofile: async (body: any) => {
            return requests.post(`/auth/edit-profile`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },
        updateImage: async (body: any) => {
            return requests.post('/auth/update-image', body, {
                headers: {
                    'Content-Type': 'multipart/formdata',
                },
            })
        },
        editPassword: async (body: any) => {
            return requests.post(`/auth/change-password`, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
        },






    }
}

export default AuthService()
