import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
export const showingTranslateValue = (data: any, lang: string = "en") => {
  let langue = lang === "fr-FR" || lang === "fr" ? "fr" : "en";
  let result = data?.find((item: any) => item.locale === langue);
  return result || null;
};

export function limittext(text: string, limit: number) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

export function checkPermission(ressource: string, access: string) {
  const userData = localStorage.getItem("_DICI_AUTH");
  if (userData) {
    const user: any = JSON.parse(userData);
    return user?.permissions?.find(
      (item: any) => item?.name === ressource && item?.access[access]
    );
  }
}

export async function downloadFileWithProgress(
  url: string,
  filename = "file.pdf",
  onProgress?: (percent: number) => void
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  const contentLength = response.headers.get("content-length");
  if (!contentLength) {
    throw new Error("Impossible de lire la taille du fichier");
  }

  const total = parseInt(contentLength, 10);
  let loaded = 0;

  const reader = response.body?.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.length;
      if (onProgress) {
        const percent = Math.round((loaded / total) * 100);
        onProgress(percent);
      }
    }
  }

  const blob = new Blob(chunks, { type: "application/pdf" });
  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export const getstripe = () => {
  let stripePromise;
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51PslbcEp3ffZfHqCjBmHPg5RI2ZOc53upbCt0LlQpJWtkqu7iwo9DwbCd0lF72mfXs1iJ5z04FZLPha7wttePe6C00URHbiuBK"
    );
  }
  return stripePromise;
};
export const Type = [
  {
    value: "article",
    label: "Article",
  },
  {
    value: "bulletin",
    label: "Bulletin",
  },
  {
    value: "report",
    label: "Report",
  },
  {
    value: "press_release",
    label: "Press Release",
  },
];
export const Years = [
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
];

export const date_format = (data: any) => {
  return moment(data).format("DD/MM/YYYY");
};

export const BASE_URL = "https://apicosamed.cosamed.org/api";
export const API = "AIzaSyBQHKFXv5xfbXVDz3E0mX_UfgOnPEqZ0Po";
export const channelId = "UCUVOlOlQKPihQHJ_EPcVbdQ";
export const BASE_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1000`;
