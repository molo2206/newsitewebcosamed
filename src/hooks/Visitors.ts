// src/hooks/useVisitor.ts
import { useState } from 'react';
import VisitorsServices from '../services/VisitorsServices';
import { useAuthContext } from '../context';

export default function useVisitor() {
  const [loading, setLoading] = useState(false);
  const { errorNotification } = useAuthContext();

  const registerVisitor = (body: any) => {
    setLoading(true);
    console.log('Enregistrement visiteur, url_visited =', body?.url);

    const formData = new FormData();
    formData.append('ip', body?.ip || '');
    formData.append('type', body?.type || '');
    formData.append('user_agent', body?.user_agent || '');
    formData.append('url', body?.url || '');
    VisitorsServices.create(formData)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        errorNotification(
          err?.response?.data?.message || err.message || 'Erreur de traitement',
        );
        setLoading(false);
      });
  };

  return {
    loading,
    registerVisitor,
  };
}
