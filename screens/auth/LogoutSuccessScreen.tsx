import React, { useEffect } from 'react';
import { styles } from '../../utils/styles';
import { novokingLogoUrl } from '../../utils/data';

interface LogoutSuccessScreenProps {
    setScreen: (screen: string) => void;
}

const AnimatedCheckmark = () => {
    const SUCCESS_GREEN = '#4CAF50';
    // A simple animation effect using a style tag
    const animationStyle = `
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        .checkmark-circle { 
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke: ${SUCCESS_GREEN};
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.1s forwards; 
        }
        .checkmark-check { 
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            stroke-width: 3;
            stroke: ${SUCCESS_GREEN};
            fill: none;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
    `;

    return (
        <div style={styles.logoutSuccessIconContainer}>
             <style>{animationStyle}</style>
             <svg style={styles.logoutSuccessIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25"/>
                <path className="checkmark-check" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
    );
};

const LogoutSuccessScreen: React.FC<LogoutSuccessScreenProps> = ({ setScreen }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setScreen('login');
        }, 3000); // Automatically redirect after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [setScreen]);

    // Keyframes for animations are injected here for component encapsulation
    const keyframes = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    return (
        <div style={styles.logoutSuccessContainer}>
            <style>{keyframes}</style>
            <div style={styles.logoutSuccessContent}>
                <AnimatedCheckmark />
                <h2 style={styles.logoutSuccessTitle}>Đăng xuất thành công!</h2>
                <p style={styles.logoutSuccessSubtitle}>Bạn đã đăng xuất khỏi tài khoản. Hẹn gặp lại!</p>
            </div>
            <div style={styles.logoutSuccessFooter}>
                <img src={novokingLogoUrl} alt="Novoking Logo" style={styles.logoutSuccessLogo} />
            </div>
        </div>
    );
};

export default LogoutSuccessScreen;