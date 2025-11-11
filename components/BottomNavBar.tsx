import React from 'react';
import { styles } from '../utils/styles';

// --- SVG Icon Components ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);
const HomeIconSolid = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
);

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
);
const ActivityIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);
const BellIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const AccountIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
const AccountIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);


interface BottomNavBarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    hasUnreadNotifications: boolean;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab, hasUnreadNotifications }) => {
    const navItems = [
        { id: 'home', label: 'Trang chủ', icon: <HomeIcon />, activeIcon: <HomeIconSolid /> },
        { id: 'activity', label: 'Hoạt động', icon: <ActivityIcon />, activeIcon: <ActivityIconSolid /> },
        { id: 'notifications', label: 'Thông báo', icon: <BellIcon />, activeIcon: <BellIconSolid /> },
        { id: 'account', label: 'Tài khoản', icon: <AccountIcon />, activeIcon: <AccountIconSolid /> },
    ];
    return (
        <div style={styles.navBar}>
            {navItems.map(item => (
                <div 
                    key={item.id} 
                    style={activeTab === item.id ? {...styles.navItem, ...styles.navItemActive} : styles.navItem} 
                    onClick={() => setActiveTab(item.id)}
                >
                    <div style={{...styles.navItemIcon, position: 'relative'}}>
                        {activeTab === item.id ? item.activeIcon : item.icon}
                        {item.id === 'notifications' && hasUnreadNotifications && (
                            <div style={styles.notificationBadge}></div>
                        )}
                    </div>
                    <div style={styles.navItemLabel}>{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default BottomNavBar;