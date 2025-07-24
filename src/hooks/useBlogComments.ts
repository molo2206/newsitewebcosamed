import { useState, useEffect } from 'react';
import BlogServices from '../services/BlogsServices';

export default function useBlogComments(blogId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await BlogServices.getComments(blogId);
      setComments(response.data?.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des commentaires.');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async (userId: string, content: string) => {
    try {
      await BlogServices.postComment({
        blog_id: blogId,
        user_id: userId,
        content,
      });
      await fetchComments(); // Mettre à jour après envoi
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire.");
      setError("Erreur lors de l'envoi du commentaire.");
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  return { comments, loading, error, postComment };
}
