import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  CheckCheck, 
  AlertCircle, 
  FileCheck2, 
  Calendar, 
  Sparkles,
  Info
} from 'lucide-react';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, onStorageUpdate } from '../services/storageService';
import { NotificationItem, User } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onViewApplication?: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  currentUser,
  onViewApplication
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const refreshNotifs = () => {
    setNotifications(getNotifications(currentUser?.id));
  };

  useEffect(() => {
    refreshNotifs();
    const unsub = onStorageUpdate(refreshNotifs);
    return () => unsub();
  }, [currentUser]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    markNotificationAsRead(id);
    refreshNotifs();
  };

  const handleMarkAllRead = () => {
    if (currentUser) {
      markAllNotificationsAsRead(currentUser.id);
    } else {
      markAllNotificationsAsRead('all');
    }
    refreshNotifs();
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'milestone':
        return <Sparkles className="w-4 h-4 text-[#66d925]" />;
      case 'document':
        return <FileCheck2 className="w-4 h-4 text-[#074592]" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-[#ff4958]" />;
      default:
        return <Info className="w-4 h-4 text-[#074592]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] mt-16 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#074592] text-white flex items-center justify-between border-b border-[#05336e]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-[#66d925] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                Automated Milestone Alerts
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#ff4958] text-white text-[10px] font-black">
                    {unreadCount} New
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-blue-100">
                Real-time updates on visas, admissions & document audits
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="p-1.5 text-xs text-blue-200 hover:text-white rounded flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-blue-200 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2 opacity-50" />
              No notifications at this moment.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-xl transition-all ${
                  notif.isRead ? 'bg-white opacity-85' : 'bg-[#074592]/5 border-l-4 border-l-[#074592]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1.5 block">
                        {new Date(notif.timestamp).toLocaleString([], { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>

                  {!notif.isRead && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="text-[10px] text-[#074592] font-black hover:text-[#ff4958] shrink-0 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500 font-medium">
            MCS automated notification dispatch
          </span>
          {onViewApplication && (
            <button
              onClick={() => {
                onClose();
                onViewApplication();
              }}
              className="text-xs font-black text-[#074592] hover:text-[#ff4958]"
            >
              Open Application Timeline →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
