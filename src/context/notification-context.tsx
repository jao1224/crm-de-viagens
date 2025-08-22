
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  showNotificationDot: boolean;
  setShowNotificationDot: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotificationDot, setShowNotificationDot] = useState(false);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 5)); // Keep last 5 notifications
    setShowNotificationDot(true);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, showNotificationDot, setShowNotificationDot }}>
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
