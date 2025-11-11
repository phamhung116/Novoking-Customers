import React, { useEffect } from 'react';
import { styles } from '../../utils/styles';

interface FeedbackSuccessScreenProps {
    onFinish: () => void;
}

// Re-using the animated checkmark component logic
const AnimatedCheckmark = () => {
    const keyframes = `
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
    `;

    return (
        <div style={styles.bookingSuccessCheckmarkContainer}>
            <style>{keyframes}</style>
            <svg style={styles.bookingSuccessCheckmarkSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle style={{...styles.checkmarkCircle, animationDelay: '0.1s'}} cx="26" cy="26" r="25"/>
                <path style={{...styles.checkmarkCheck, animationDelay: '0.6s'}} d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
    );
};

const FeedbackSuccessScreen: React.FC<FeedbackSuccessScreenProps> = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000); // Automatically redirect after 3 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);
    
    const keyframes = `
        @keyframes bookingSuccessFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bookingSuccessScaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;

    return (
        <div style={{...styles.screenContent, ...styles.bookingSuccessContainer}}>
             <style>{keyframes}</style>

            <AnimatedCheckmark />
            
            <h2 style={styles.bookingSuccessTitle}>Cảm ơn bạn đã đánh giá!</h2>

            <p style={styles.bookingSuccessSubtitle}>
                Ý kiến của bạn rất quan trọng để Novoking nâng cao chất lượng dịch vụ.
            </p>
        </div>
    );
};

export default FeedbackSuccessScreen;
