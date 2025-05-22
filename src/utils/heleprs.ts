import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";

// Fonction pour récupérer la traduction dans la langue spécifiée, par défaut "en"
export const showingTranslateValue = (data: any, lang: string = "en") => {
  let langue = lang === "fr-FR" || lang === "fr" ? "fr" : "en";
  let result = data?.find((item: any) => item.locale === langue);
  return result || null;
};

// Fonction pour tronquer un texte à une certaine longueur
export function limittext(text: string, limit: number) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

// Vérifie si l'utilisateur a une permission sur une ressource
export function checkPermission(ressource: string, access: string) {
  const userData = localStorage.getItem("_DICI_AUTH");
  if (userData) {
    const user: any = JSON.parse(userData);
    return user?.permissions?.find(
      (item: any) => item?.name === ressource && item?.access[access]
    );
  }
}

// Initialisation de Stripe
export const getstripe = () => {
  let stripePromise;
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51PslbcEp3ffZfHqCjBmHPg5RI2ZOc53upbCt0LlQpJWtkqu7iwo9DwbCd0lF72mfXs1iJ5z04FZLPha7wttePe6C00URHbiuBK"
    );
  }
  return stripePromise;
};

// Formatage de date au format français
export const date_format = (data: any) => {
  return moment(data).format("DD/MM/YYYY");
};

// API et autres constantes
export const BASE_URL = "https://apicosamed.cosamed.org/api";
export const API = "AIzaSyD4ofAA19WpGyRC-H66XciyINOfz4R_kNs";
export const channelId = "UCUVOlOlQKPihQHJ_EPcVbdQ";
export const BASE_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1000`;
