import { useState, useEffect } from 'react';
import BlogServices from '../services/BlogsServices';

export default function useBlogLikes(blogId: string) {
  const [likes, setLikes] = useState<any[]>([]);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLikes = async () => {
    if (!blogId) return;
    setLoading(true);
    setError('');
    try {
      const response = await BlogServices.getLikes(blogId);
      // Ici on accède à la bonne structure
      const data = response.data?.data;

      setLikes(data?.users || []);
      setLikesCount(data?.likes_count || 0);
    } catch (err) {
      setError('Erreur lors du chargement des likes.');
      setLikes([]);
      setLikesCount(0);
    } finally {
      setLoading(false);
    }
  };

  const likeBlog = async (userId: string) => {
    if (!blogId) return;
    try {
      await BlogServices.likeBlog({ blog_id: blogId, user_id: userId });
      await fetchLikes(); // Refresh après like
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Vous avez déjà aimé cet article.');
      } else {
        setError("Erreur lors de l'ajout du like.");
      }
    }
  };

  useEffect(() => {
    if (blogId) fetchLikes();
  }, [blogId]);

  return { likes, likesCount, loading, error, likeBlog };
}
