import React from 'react';
import { styles } from '../../utils/styles';
import { formatAddress } from '../../utils/helpers';

interface ProfileViewScreenProps {
    user: any;
    setUser: (user: any) => void;
    setScreen: (screen: string) => void;
    setEditingAddress: (address: any | null) => void;
}

// --- SVG Icon Components ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ProfileViewScreen: React.FC<ProfileViewScreenProps> = ({ user, setUser, setScreen, setEditingAddress }) => {

    return (
        <div style={{...styles.screenContent, backgroundColor: '#f9f9f9'}}>
            {/* Header */}
            <div style={{...styles.pageHeader, margin: '-20px -20px 20px -20px'}}>
                 <button onClick={() => setScreen('dashboard')} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Hồ sơ</h2>
                <div style={{width: '24px'}}></div>
            </div>

            {/* User Info */}
            <div style={styles.profileViewUserInfoSection}>
                <div style={styles.profileAvatar}>👤</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={styles.profileViewUserName}>{user.fullName}</h3>
                    <button onClick={() => setScreen('profile-edit')} style={styles.profileViewEditIcon} aria-label="Chỉnh sửa hồ sơ">
                        <EditIcon />
                    </button>
                </div>
                <p style={styles.profileViewUserPhone}>(+84) {user.phoneNumber.substring(1)}</p>
            </div>

            {/* Address Section */}
            <div>
                <div style={styles.profileViewAddressHeader}>
                    <h4 style={styles.profileViewAddressTitle}>Địa chỉ đã lưu</h4>
                    <button 
                        onClick={() => { setEditingAddress(null); setScreen('address-form'); }} 
                        style={{...styles.buttonOutline, ...styles.profileViewAddNewAddressButton}}
                    >
                        + Thêm mới
                    </button>
                </div>
                <div>
                    {(user.addresses || []).length > 0 ? (
                        user.addresses.map((addr) => (
                            <div
                                key={addr.id}
                                onClick={() => { setEditingAddress(addr); setScreen('address-form'); }}
                                style={styles.profileViewAddressCard}
                            >
                                <div style={styles.profileViewAddressIcon}><LocationIcon /></div>
                                <div style={styles.profileViewAddressContent}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                            <p style={styles.profileViewAddressText}>{formatAddress(addr)}</p>
                                            {addr.isDefault && <span style={{...styles.profileViewDefaultBadge, marginLeft: '10px'}}>Mặc định</span>}
                                    </div>
                                    <p style={styles.profileViewAddressPhone}>(+84) {user.phoneNumber.substring(1)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                            <p style={{ textAlign: 'center', color: '#777', padding: '20px 0' }}>Chưa có địa chỉ nào được lưu.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileViewScreen;