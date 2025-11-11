import React, { useState, useEffect } from 'react';
import { styles, PRIMARY_COLOR } from '../../utils/styles';
import { formatAddress, formatDateTime } from '../../utils/helpers';

interface BookingSuccessScreenProps {
    message: string;
    booking: any;
    onViewDetails: () => void;
}

// --- Animated SVG Checkmark Component ---
const AnimatedCheckmark = () => {
    // Keyframes for animations are injected here for component encapsulation
    const keyframes = `
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.1, 1.1, 1); }
        }
    `;

    return (
        <div style={styles.bookingSuccessCheckmarkContainer}>
            <style>{keyframes}</style>
            <svg style={styles.bookingSuccessCheckmarkSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle style={styles.checkmarkCircle} cx="26" cy="26" r="25"/>
                <path style={styles.checkmarkCheck} d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
        </div>
    );
};


// --- Main Screen Component ---
const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ message, booking, onViewDetails }) => {
    const [displayPrice, setDisplayPrice] = useState(0);
    const [isPressed, setIsPressed] = useState(false);

    // Effect for the price count-up animation
    useEffect(() => {
        if (!booking || !booking.price) return;

        let startTimestamp: number | null = null;
        const duration = 800; // Animation duration in ms
        const finalPrice = booking.price;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentPrice = Math.floor(progress * finalPrice);
            setDisplayPrice(currentPrice);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);

    }, [booking]);


    if (!booking) {
        return <div style={styles.screenContent}><p style={{ textAlign: 'center' }}>Đang tải thông tin...</p></div>;
    }

    const { service, package: pkg, address, dateTime } = booking;
    
    // Keyframes for animations are injected here for component encapsulation
    const keyframes = `
        @keyframes bookingSuccessFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bookingSuccessScaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;

    return (
        <div style={{...styles.screenContent, ...styles.bookingSuccessContainer}}>
             <style>{keyframes}</style>

            <AnimatedCheckmark />
            
            <h2 style={styles.bookingSuccessTitle}>{message || 'Đặt lịch thành công!'}</h2>

            <p style={styles.bookingSuccessSubtitle}>
                Yêu cầu của bạn đã được gửi. Chúng tôi sẽ sớm tìm cộng tác viên phù hợp.
            </p>
            
            <div style={styles.bookingSuccessSummaryCard}>
                <div style={{...styles.bookingSuccessSummaryRow, animationDelay: '0.9s'}}>
                    <span style={{color: '#666'}}>Dịch vụ</span>
                    <span style={{fontWeight: 'bold', textAlign: 'right'}}>{service.name} ({pkg.name})</span>
                </div>
                 <div style={{...styles.bookingSuccessSummaryRow, animationDelay: '1.0s'}}>
                    <span style={{color: '#666'}}>Thời gian</span>
                    <span style={{fontWeight: 'bold', textAlign: 'right'}}>{formatDateTime(new Date(dateTime))}</span>
                </div>
                 <div style={{...styles.bookingSuccessSummaryRow, animationDelay: '1.1s'}}>
                    <span style={{color: '#666'}}>Địa chỉ</span>
                    <span style={{fontWeight: 'bold', textAlign: 'right'}}>{formatAddress(address)}</span>
                </div>
                <div style={{...styles.bookingSuccessSummaryRow, borderBottom: 'none', animationDelay: '1.2s'}}>
                    <span style={{color: '#666', fontWeight: 'bold'}}>Tổng cộng</span>
                    <span style={styles.bookingSuccessTotalValue}>
                        {displayPrice.toLocaleString('vi-VN')}đ
                    </span>
                </div>
            </div>

            <button 
                onClick={onViewDetails} 
                style={{
                    ...styles.bookingSuccessButton,
                    ...(isPressed ? styles.buttonPressed : {})
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
            >
                Xem trạng thái booking
            </button>
        </div>
    );
};

export default BookingSuccessScreen;