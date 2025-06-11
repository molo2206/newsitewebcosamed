import requests from './Instance';

const BulletinServices = {
  getBulletin: async () => {
    const currentYear = new Date().getFullYear();
    return requests.get(`/public/bulletins-year?year=${currentYear}`);
  },
  getBulletinHome: async () => {
    return requests.get('/public/bulletinhome');
  },
  oneBulletin: async (id: any) => {
    return requests.get(`/public/bulletins/detail/${id}`);
  },
  lastBulletin: async () => {
    return requests.get(`/public/lastbulletin`);
  },

  getBulletinByYear: async (year?: string, month?: string, locale?: string, type?: string) => {
    const params: Record<string, string> = {};

    if (year?.trim()) params.year = year.trim();
    if (month?.trim()) params.month = month.trim(); // ← ajout du mois
    if (locale?.trim()) params.locale = locale.trim();
    if (type?.trim()) params.type = type.trim();

    const query = new URLSearchParams(params).toString();
    return requests.get(`/public/bulletins-year?${query}`);
  },
};

export default BulletinServices;
