import moment from "moment"

export const showingTranslateValue = (data: any, lang: any) => {
	let langue = lang == 'fr-FR' ? 'fr' : lang
	let result = data?.find((item: any) => item.locale === langue)
	if (result) {
		return result
	} else {
		return null
	}
}

export function checkPermission(ressource: any, access: string) {
	const userData = localStorage.getItem('_DICI_AUTH')
	if (userData) {
		const user: any = JSON.parse(userData)
		return user?.permissions?.find(
			(item: any) => item?.name === ressource && item?.access[access]
		)
	}
}

export const date_format = (data:any) => {
	return moment(data).format('DD/MM/YYYY')
}
//export const BASE_URL = 'http://localhost:8000/api'
export const BASE_URL = "https://apicosamed.cosamed.org/api";
