import React, { useState } from 'react';
import { styles, SECONDARY_COLOR } from '../../utils/styles';
import { formatRelativeTime } from '../../utils/helpers';

// --- SVG Icon Components ---
const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
);

const SystemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

interface NotificationScreenProps {
    activityNotifications: any[];
    systemNotifications: any[];
    onViewNotification: (notification: any) => void;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ activityNotifications, systemNotifications, onViewNotification }) => {
    const [activeTab, setActiveTab] = useState('activity'); // 'activity' or 'system'

    const sortedActivityNotifications = [...activityNotifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const sortedSystemNotifications = [...systemNotifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const notificationsToDisplay = activeTab === 'activity' ? sortedActivityNotifications : sortedSystemNotifications;

    const getIconForType = (type: string) => {
        switch (type) {
            case 'activity': return <ActivityIcon />;
            case 'promo': return <SystemIcon />;
            case 'news': return <SystemIcon />;
            default: return <SystemIcon />;
        }
    };
    
    return (
        <div style={styles.notificationScreenContainer}>
            <div style={styles.activityHeader}>
                <h2 style={styles.activityTitle}>Thông báo</h2>
            </div>

            <div style={styles.notificationTabsContainer}>
                <div 
                    style={activeTab === 'activity' ? {...styles.notificationTab, ...styles.notificationTabActive} : styles.notificationTab}
                    onClick={() => setActiveTab('activity')}
                >
                    Hoạt động
                </div>
                <div 
                    style={activeTab === 'system' ? {...styles.notificationTab, ...styles.notificationTabActive} : styles.notificationTab}
                    onClick={() => setActiveTab('system')}
                >
                    Hệ thống
                </div>
            </div>

            <div style={styles.notificationList}>
                {notificationsToDisplay.length > 0 ? (
                    notificationsToDisplay.map(n => (
                        <div 
                            key={n.id} 
                            style={!n.read ? {...styles.notificationItem, ...styles.notificationItemUnread} : styles.notificationItem}
                            onClick={() => onViewNotification(n)}
                        >
                            {!n.read && <div style={styles.notificationUnreadDot}></div>}
                            <div style={styles.notificationItemIcon}>{getIconForType(n.type)}</div>
                            <div style={styles.notificationItemContent}>
                                <h3 style={styles.notificationItemTitle}>{n.title}</h3>
                                <p style={styles.notificationItemMessage}>
                                    {n.message.length > 80 ? `${n.message.substring(0, 80)}...` : n.message}
                                </p>
                                <span style={styles.notificationItemTimestamp}>{formatRelativeTime(new Date(n.timestamp))}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>Không có thông báo nào.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationScreen;