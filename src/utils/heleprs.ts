import moment from "moment"
import { loadStripe } from "@stripe/stripe-js";

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

export const getstripe = () => {
	let stripePromise;
	if (!stripePromise) {
		stripePromise = loadStripe("pk_test_51PslbcEp3ffZfHqCjBmHPg5RI2ZOc53upbCt0LlQpJWtkqu7iwo9DwbCd0lF72mfXs1iJ5z04FZLPha7wttePe6C00URHbiuBK");
	}
	return stripePromise;
};

export const date_format = (data: any) => {
	return moment(data).format('DD/MM/YYYY')
}
//export const BASE_URL = 'http://localhost:8000/api'
export const BASE_URL = "https://apicosamed.cosamed.org/api";
export const API = "AIzaSyD4ofAA19WpGyRC-H66XciyINOfz4R_kNs"
export const channelId = "UCUVOlOlQKPihQHJ_EPcVbdQ";
export const BASE_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1000`;

