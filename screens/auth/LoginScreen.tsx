import React, { useState } from 'react';
import { styles } from '../../utils/styles';
import { mockUserDatabase, novokingLogoUrl } from '../../utils/data';

interface LoginScreenProps {
    setScreen: (screen: string) => void;
    setTempData: (data: any) => void;
}

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);


const LoginScreen: React.FC<LoginScreenProps> = ({ setScreen, setTempData }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        setError('');
        if (!phoneNumber || !/^(0\d{9}|(\+84)\d{9})$/.test(phoneNumber)) {
            setError("Số điện thoại không hợp lệ.");
            return;
        }
        const formattedPhone = phoneNumber.startsWith('+84') ? '0' + phoneNumber.substring(3) : phoneNumber;
        if (!mockUserDatabase[formattedPhone]) {
            setError("Số điện thoại chưa được đăng ký.");
            return;
        }
        setTempData({ phoneNumber: formattedPhone });
        setScreen('login-otp');
    };

    return (
        <div style={styles.authContainer}>
            <div style={styles.authLogoContainer}>
                <img src={novokingLogoUrl} alt="Novoking Logo" style={styles.authLogo} />
            </div>

            <div style={styles.authContent}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Đăng nhập</h2>
                <div style={styles.formGroup}>
                     <label style={styles.formLabel}>Số điện thoại</label>
                    <div style={styles.inputWithIconContainer}>
                         <span style={styles.inputIcon}><PhoneIcon /></span>
                         <input 
                            type="tel" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            placeholder="Nhập số điện thoại" 
                            style={{...styles.input, ...styles.inputWithIcon}} 
                        />
                    </div>
                     {error && <p style={{...styles.error, textAlign: 'center'}}>{error}</p>}
                </div>
            </div>

            <div style={styles.authFooter}>
                 <button onClick={handleSubmit} style={styles.button}>Gửi mã OTP đăng nhập</button>
                 <p style={styles.link} onClick={() => { setTempData({}); setScreen('register-phone'); }}>Chưa có tài khoản? Đăng ký ngay</p>
            </div>
        </div>
    );
};

export default LoginScreen;
