import React, { useState } from 'react';
import { styles } from '../../utils/styles';
import { novokingLogoUrl } from '../../utils/data';

interface WelcomeScreenProps {
    setScreen: (screen: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setScreen }) => {
    const [isPressed, setIsPressed] = useState(false);

    // Keyframes for animations are injected here for component encapsulation
    const keyframes = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
            50% { transform: scale(1.02); box-shadow: 0 10px 30px rgba(151, 44, 44, 0.4); }
            100% { transform: scale(1); box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        }
        @keyframes kenBurns {
            0% { transform: scale(1.1) rotate(1deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;

    return (
        <div style={styles.welcomeContainer}>
            <style>{keyframes}</style>
            <div style={styles.welcomeBackgroundImage} />
            <div style={styles.welcomeOverlay} />
            <div style={styles.welcomeContentWrapper}>
                <div style={styles.welcomeTop}>
                    <img src={novokingLogoUrl} alt="Novoking Logo" style={styles.welcomeLogo} />
                    <p style={styles.welcomeAppTitle}>Novoking Smartbooking</p>
                </div>

                <div style={{ flex: 1 }} />
                
                <div style={styles.welcomeBottom}>
                    <h1 style={styles.welcomeHeadline}>Sống Thảnh Thơi</h1>
                    <p style={styles.welcomeDescriptor}>
                        Đặt dịch vụ dọn dẹp chuyên nghiệp chỉ trong vài giây.
                    </p>
                    <button
                        style={{
                            ...styles.button,
                            ...styles.welcomeButton,
                            ...(isPressed ? { transform: 'scale(0.98)', backgroundColor: '#6d1f1f', animation: 'none' } : {})
                        }}
                        onMouseDown={() => setIsPressed(true)}
                        onMouseUp={() => setIsPressed(false)}
                        onMouseLeave={() => setIsPressed(false)}
                        onTouchStart={() => setIsPressed(true)}
                        onTouchEnd={() => setIsPressed(false)}
                        onClick={() => setScreen('login')}
                    >
                        Bắt Đầu Ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;