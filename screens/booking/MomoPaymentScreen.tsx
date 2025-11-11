import React, { useState, useEffect, useMemo } from 'react';
import { styles } from '../../utils/styles';
import { promotions } from '../../utils/data';
import { generateQRCodeDataURL } from '../../utils/qrcode';

interface MomoPaymentScreenProps {
    bookingData: any;
    onBack: () => void;
    onPaymentSuccess: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const MomoPaymentScreen: React.FC<MomoPaymentScreenProps> = ({ bookingData, onBack, onPaymentSuccess }) => {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // Price calculation
    const PLATFORM_FEE = 33000;
    const { service, package: pkg, promoCode } = bookingData;
    const promo = promoCode ? promotions.find(p => p.id === promoCode) : null;
    let discountAmount = 0;
    if (promo) {
        if (promo.type === 'percentage') {
            let discount = (pkg.price * promo.value) / 100;
            if (promo.maxDiscount && discount > promo.maxDiscount) {
                discount = promo.maxDiscount;
            }
            discountAmount = discount;
        } else if (promo.type === 'fixed') {
            discountAmount = promo.value;
        }
    }
    const finalPrice = Math.round(pkg.price + PLATFORM_FEE - discountAmount);
    
    const orderId = useMemo(() => `NOV-${Date.now()}`.substring(0,18), []);

    // Countdown timer effect
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Auto-success mock payment effect
    useEffect(() => {
        const paymentTimer = setTimeout(() => {
            onPaymentSuccess();
        }, 10000); // 10 seconds
        return () => clearTimeout(paymentTimer);
    }, [onPaymentSuccess]);
    
    // QR Code Generation Effect
    useEffect(() => {
        const paymentInfo = JSON.stringify({
            orderId: orderId,
            amount: finalPrice,
            customer: bookingData.contactName,
            service: bookingData.service.name
        });
        const url = generateQRCodeDataURL(paymentInfo);
        setQrCodeUrl(url);
    }, [bookingData, finalPrice, orderId]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0'),
        };
    };

    const { minutes, seconds } = formatTime(timeLeft);

    return (
        <div style={styles.momoScreenContainer}>
            <div style={styles.momoHeader}>
                <button onClick={onBack} style={styles.momoBackButton}><BackArrowIcon /></button>
                <div style={styles.momoHeaderTitle}>Cổng thanh toán</div>
            </div>
            <div style={styles.momoContent}>
                <h3 style={{fontWeight: 'bold', margin: '10px 0'}}>Quét mã QR để thanh toán</h3>
                
                <div style={styles.momoQrContainer}>
                    {qrCodeUrl ? (
                         <img src={qrCodeUrl} alt="Dynamic MoMo QR Code" style={styles.momoQrCode} />
                    ) : (
                        <div style={{...styles.momoQrCode, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            Loading...
                        </div>
                    )}
                </div>
                
                <p style={{marginTop: '20px', fontSize: '14px', color: '#555'}}>
                    Sử dụng <b>App Ngân hàng</b> hoặc ứng dụng camera hỗ trợ QR code để quét mã
                </p>

                <div style={styles.momoInfoBox}>
                    <div style={styles.momoInfoRow}>
                        <span style={styles.momoInfoLabel}>Nhà cung cấp</span>
                        <span style={styles.momoInfoValue}>NovokingPay</span>
                    </div>
                     <div style={styles.momoInfoRow}>
                        <span style={styles.momoInfoLabel}>Mã đơn hàng</span>
                        <span style={styles.momoInfoValue}>{orderId}</span>
                    </div>
                     <div style={{...styles.momoInfoRow, justifyContent: 'flex-start', gap: '10px'}}>
                        <span style={styles.momoInfoLabel}>Mô tả</span>
                        <div style={{...styles.momoInfoValue, textAlign: 'right', fontSize: '14px', flex: 1}}>
                            <div>{bookingData.contactName} thanh toán</div>
                            <div style={{marginTop: '4px'}}>dịch vụ {bookingData.service.name}</div>
                        </div>
                    </div>
                     <div style={{...styles.momoInfoRow, borderBottom: 'none'}}>
                        <span style={styles.momoInfoLabel}>Số tiền</span>
                        <span style={styles.momoTotalValue}>
                            {finalPrice.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                </div>

                <div style={styles.momoTimerBox}>
                    <div style={styles.momoTimerLabel}>Đơn hàng sẽ hết hạn sau:</div>
                    <div style={styles.momoTimerValueContainer}>
                        <span style={styles.momoTimerDigitBox}>{minutes}</span>
                        <span style={{fontSize: '20px', fontWeight: 'bold', color: '#D82D8B'}}>:</span>
                        <span style={styles.momoTimerDigitBox}>{seconds}</span>
                    </div>
                </div>
                 <p style={styles.momoReturnLink} onClick={onBack}>
                    Quay về
                </p>
            </div>
        </div>
    );
};

export default MomoPaymentScreen;