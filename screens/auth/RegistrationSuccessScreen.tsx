import React, { useEffect } from 'react';
import { styles } from '../../utils/styles';

interface RegistrationSuccessScreenProps {
    setScreen: (screen: string) => void;
}

const RegistrationSuccessScreen: React.FC<RegistrationSuccessScreenProps> = ({ setScreen }) => {
    useEffect(() => {
        const timer = setTimeout(() => setScreen('login'), 2000);
        return () => clearTimeout(timer);
    }, [setScreen]);

    return (
        <div style={styles.screenContent}>
            <h2 style={{ ...styles.header, color: '#972c2c' }}>Đăng ký thành công!</h2>
            <p style={{ textAlign: 'center' }}>Tài khoản của bạn đã được tạo. Đang chuyển về trang đăng nhập...</p>
        </div>
    );
};

export default RegistrationSuccessScreen;