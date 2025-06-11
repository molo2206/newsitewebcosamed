import { useState, useEffect } from 'react';
import BlogServices from '../services/BlogsServices';

type Params = {
  year?: string;
  category?: string;
};

export default function useBlogsByYear(params: Params = {}) {
  const { year, category } = params;
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Si ni year ni category, on vide la liste (ou tu peux choisir une autre logique)
    if ((!year || year.trim() === '') && (!category || category.trim() === '')) {
      setBlogs([]);
      setError('');
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await BlogServices.getBlogsByYear({ year, category });
        const data = response?.data?.data;

        if (!Array.isArray(data)) {
          throw new Error("Format de réponse inattendu");
        }

        setBlogs(data);
      } catch (err) {
        setError('Erreur lors du chargement des blogs.');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [year, category]);

  return { blogs, loading, error };
}
