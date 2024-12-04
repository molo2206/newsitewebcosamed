import requests from './Instance'
const TypeMemberService = {
	getTypMember: async () => {
		return requests.get(`/gettypemembers`)
	},
}
export default TypeMemberService
