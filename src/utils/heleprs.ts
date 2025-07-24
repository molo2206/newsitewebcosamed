import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import i18n from '../i18n';
import { useEffect, useRef, useState } from 'react';
export const showingTranslateValue = (data: any, lang: string = 'en') => {
  let langue = lang === 'fr-FR' || lang === 'fr' ? 'fr' : 'en';
  let result = data?.find((item: any) => item.locale === langue);
  return result || null;
};

export function limittext(text: string, limit: number) {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
}

export function checkPermission(ressource: string, access: string) {
  const userData = localStorage.getItem('_DICI_AUTH');
  if (userData) {
    const user: any = JSON.parse(userData);
    return user?.permissions?.find(
      (item: any) => item?.name === ressource && item?.access[access],
    );
  }
}

export async function downloadFileWithProgress(
  url: string,
  filename = 'file.pdf',
  onProgress?: (percent: number) => void,
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  const contentLength = response.headers.get('content-length');
  if (!contentLength) {
    throw new Error('Impossible de lire la taille du fichier');
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

  const blob = new Blob(chunks, { type: 'application/pdf' });
  const blobUrl = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
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
      'pk_test_51PslbcEp3ffZfHqCjBmHPg5RI2ZOc53upbCt0LlQpJWtkqu7iwo9DwbCd0lF72mfXs1iJ5z04FZLPha7wttePe6C00URHbiuBK',
    );
  }
  return stripePromise;
};
export const Type = [
  {
    value: 'data-loading/blogs',
    label: 'Article',
  },
  {
    value: 'data-loading/newsletters',
    label: 'Bulletin',
  },
  {
    value: 'data-loading/reports',
    label: 'Report',
  },
  {
    value: 'load-data/communicated',
    label: 'Press Release',
  },
];
export const buttonMoney = [
  { value: '10', label: '10 €' },
  { value: '20', label: '20 €' },
  { value: '50', label: '50 €' },
  { value: '100', label: '100 €' },
  { value: 'Autre', label: 'Autre' },
];

export const currency = [
  { value: 'USD', label: 'USD' },
  { value: 'EURO', label: 'EURO' },
];

export const tabs = [
  { id: 1, title: 'Don mensuel' },
  { id: 2, title: 'Don ponctuel' },
];

export const Years = (() => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearsArray = [{ label: currentYear, value: currentYear }];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push({ label: year, value: year });
  }

  return yearsArray;
})();

export const Months = [
  { label: i18n.t('January'), value: 'January' },
  { label: i18n.t('February'), value: 'February' },
  { label: i18n.t('March'), value: 'March' },
  { label: i18n.t('April'), value: 'April' },
  { label: i18n.t('May'), value: 'May' },
  { label: i18n.t('June'), value: 'June' },
  { label: i18n.t('July'), value: 'July' },
  { label: i18n.t('August'), value: 'August' },
  { label: i18n.t('September'), value: 'September' },
  { label: i18n.t('October'), value: 'October' },
  { label: i18n.t('November'), value: 'November' },
  { label: i18n.t('December'), value: 'December' },
];

export const date_format = (data: any) => {
  return moment(data).format('DD/MM/YYYY');
};

export default function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, active]);
}

export const BASE_URL = 'https://apicosamed.cosamed.org/api';
export const API = 'AIzaSyBQHKFXv5xfbXVDz3E0mX_UfgOnPEqZ0Po';
export const channelId = 'UCUVOlOlQKPihQHJ_EPcVbdQ';
export const BASE_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1000`;
