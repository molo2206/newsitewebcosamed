// src/hooks/usePresenceSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Student {
  id: string;
  matricule: string;
  fullName: string;
  promotionId: string;
  recessId?: string;
  phone?: string;
}

interface Exam {
  id: string;
  name: string;
  date: string;
  sessionId: string;
}

interface PresenceEvent {
  id: string;
  studentId: string;
  examId: string;
  timestamp: string;
  student: Student;
  exam: Exam;
}

const URL = 'http://localhost:4000'; // ton backend NestJS

export const usePresenceSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [latestPresence, setLatestPresence] = useState<PresenceEvent | null>(null);

  useEffect(() => {
    const s = io(URL, { transports: ['websocket'], autoConnect: true });
    setSocket(s);

    s.on('connect', () => console.log('WebSocket connecté:', s.id));

    s.on('newPresence', (data: PresenceEvent) => {
      console.log('Nouvelle présence reçue:', data);
      setLatestPresence(data);
    });

    s.on('disconnect', (reason) => console.log('WebSocket déconnecté:', reason));

    return () => {
      s.off('newPresence');
      s.disconnect();
    };
  }, []);

  return { socket, latestPresence };
};
