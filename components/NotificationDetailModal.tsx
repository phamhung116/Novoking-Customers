import React, { useState, useEffect } from 'react';
import { styles, PRIMARY_COLOR } from '../utils/styles';
import { formatDateTime } from '../utils/helpers';

interface NotificationDetailModalProps {
    notification: any | null;
    onClose: () => void;
}

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


const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({ notification, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Reset closing state when a new notification is opened
        if (notification) {
            setIsClosing(false);
        }
    }, [notification]);

    if (!notification) {
        return null;
    }

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Match animation duration
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'activity': return <ActivityIcon />;
            case 'promo':
            case 'news':
            default: return <SystemIcon />;
        }
    };

    const animationStyle = `
        @keyframes fadeInScaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeOutScaleDown { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
    `;
    const modalAnimation = {
        animation: isClosing ? 'fadeOutScaleDown 0.3s ease-in-out forwards' : 'fadeInScaleUp 0.3s ease-in-out forwards'
    };

    return (
        <div style={{...styles.modalOverlay, alignItems: 'center'}} onClick={handleClose}>
            <style>{animationStyle}</style>
            <div 
                style={{...styles.notificationModalContent, ...modalAnimation}} 
                onClick={e => e.stopPropagation()}
            >
                <div style={styles.notificationModalIconContainer}>
                    {getIconForType(notification.type)}
                </div>
                <h2 style={styles.notificationModalHeader}>{notification.title}</h2>
                <p style={styles.notificationModalTimestamp}>{formatDateTime(new Date(notification.timestamp))}</p>
                <div style={styles.notificationModalBody}>
                    {notification.message}
                </div>
                <button 
                    style={{...styles.button, width: '100%', justifyContent: 'center', borderRadius: '12px', padding: '16px'}}
                    onClick={handleClose}
                >
                    Đã hiểu
                </button>
            </div>
        </div>
    );
};

export default NotificationDetailModal;