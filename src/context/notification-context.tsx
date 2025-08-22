
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Notification } from '@/lib/types';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  showNotificationDot: boolean;
  setShowNotificationDot: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      createdAt: new Date(),
      read: false,
    }
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep last 50 notifications
    setShowNotificationDot(true);
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setShowNotificationDot(false);
  }

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotificationDot(false);
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, showNotificationDot, setShowNotificationDot, markAllAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
