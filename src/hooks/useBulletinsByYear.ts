
import { useState, useEffect } from 'react';
import BulletinServices from '../services/BulletinServices';

type UseBulletinsParams = {
  year?: string;
  month?: string;
  locale?: string;
};

export default function useBulletins(params: UseBulletinsParams = {}) {
  const { year, month, locale } = params;

  const [bulletins, setBulletins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const noFilters = !year?.trim() && !month?.trim() && !locale?.trim();
    if (noFilters) {
      setBulletins([]);
      setError(null);
      return;
    }

    const fetchBulletins = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await BulletinServices.getBulletinByYear(year, month, locale);
        const data = response?.data?.data;

        if (!Array.isArray(data)) throw new Error('Format de réponse inattendu');

        setBulletins(data);
      } catch (err: any) {
        setError('Erreur lors du chargement des bulletins.');
        setBulletins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBulletins();
  }, [year, month, locale]);

  return { bulletins, loading, error };
}
