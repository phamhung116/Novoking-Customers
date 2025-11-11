import React, { useState } from 'react';
import { styles } from '../../utils/styles';

interface ProfileEditScreenProps {
    user: any;
    setUser: (user: any) => void;
    setScreen: (screen: string) => void;
}

// --- SVG Icon Components ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);


const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({ user, setUser, setScreen }) => {
    const [profileData, setProfileData] = useState(user);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        setUser(profileData);
        alert("Cập nhật thành công!");
        setScreen('profile-view');
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
             <div style={styles.pageHeader}>
                <button onClick={() => setScreen('profile-view')} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Cập nhật Hồ sơ</h2>
                <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>

            <div style={styles.screenContent}>
                <div style={{...styles.form, alignItems: 'center', marginBottom: '30px'}}>
                     <div style={styles.profileAvatar}>👤</div>
                </div>

                 <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Họ và tên</label>
                    <div style={styles.inputWithIconContainer}>
                         <span style={styles.inputIcon}><UserIcon /></span>
                         <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} style={{...styles.input, ...styles.inputWithIcon}} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label>
                    <div style={styles.inputWithIconContainer}>
                         <span style={styles.inputIcon}><MailIcon /></span>
                        <input type="email" name="email" value={profileData.email} onChange={handleChange} style={{...styles.input, ...styles.inputWithIcon}} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Ngày sinh</label>
                    <div style={styles.inputWithIconContainer}>
                        <span style={styles.inputIcon}><CalendarIcon /></span>
                        <input type="date" name="dob" value={profileData.dob} onChange={handleChange} style={{...styles.input, ...styles.inputWithIcon}} />
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Giới tính</label>
                    <select name="gender" value={profileData.gender} onChange={handleChange} style={styles.select}>
                         <option value="Khác">Khác</option>
                         <option value="Nam">Nam</option>
                         <option value="Nữ">Nữ</option>
                    </select>
                </div>

                 <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Số điện thoại</label>
                     <div style={styles.inputWithIconContainer}>
                        <span style={styles.inputIcon}><PhoneIcon /></span>
                        <input type="text" value={user.phoneNumber} readOnly style={{ ...styles.input, ...styles.inputWithIcon, ...styles.inputReadOnly }} />
                    </div>
                </div>
            </div>
             <div style={styles.fixedFooter}>
                <button onClick={handleSaveProfile} style={styles.button}>
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default ProfileEditScreen;