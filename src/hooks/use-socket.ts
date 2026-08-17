'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { api } from '@/lib/config';
import type { Notification } from '@/types';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(api.socket, {
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_admin');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('admin_notification', (data) => {
      setNotifications((prev) => [{ ...data, timestamp: new Date() }, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const emitContact = (data: Record<string, unknown>) => {
    socketRef.current?.emit('new_contact', data);
  };

  const clearNotifications = () => setNotifications([]);

  return { notifications, isConnected, emitContact, clearNotifications };
}
