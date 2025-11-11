import React from 'react';
import { styles } from '../../utils/styles';

interface SelectPaymentScreenProps {
    bookingData: any;
    onBack: () => void;
    onSelectPayment: (paymentMethod: string) => void;
}

// --- SVG Icon Components ---
const CashIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 22H54V29C54 31.2091 52.2091 33 50 33H14C11.7909 33 10 31.2091 10 29V22Z" fill="#D6EAD5"/>
        <path d="M10 31H54V42H10V31Z" fill="#8BC34A"/>
        <path d="M32 37C35.866 37 39 33.866 39 30C39 26.134 35.866 23 32 23C28.134 23 25 26.134 25 30C25 33.866 28.134 37 32 37Z" fill="#D6EAD5" stroke="#4CAF50" strokeWidth="2"/>
        <path d="M32 26V34" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
        <path d="M30 28H32C33.1046 28 34 28.8954 34 30C34 31.1046 33.1046 32 32 32H30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
        <rect x="8" y="20" width="48" height="24" rx="4" stroke="#4CAF50" strokeWidth="2"/>
    </svg>
);

const BankTransferIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="8" width="34" height="48" rx="4" fill="#E3F2FD"/>
        <rect x="15" y="8" width="34" height="48" rx="4" stroke="#2196F3" strokeWidth="2"/>
        <rect x="24" y="16" width="16" height="4" rx="2" fill="#BBDEFB"/>
        <path d="M22 50L28 44L22 38" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M42 28L36 34L42 40" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckmarkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const paymentMethods = [
    { id: 'Tiền mặt', name: 'Thanh toán tiền mặt', icon: <CashIcon /> },
    { id: 'Chuyển khoản', name: 'Chuyển khoản/QR Code', icon: <BankTransferIcon /> },
];

const SelectPaymentScreen: React.FC<SelectPaymentScreenProps> = ({ bookingData, onBack, onSelectPayment }) => {
    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div style={{ ...styles.pageHeader, marginBottom: 0, backgroundColor: 'white' }}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Phương thức thanh toán</h2>
                <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <div style={{...styles.screenContent, backgroundColor: '#f9f9f9'}}>
                {paymentMethods.map(method => {
                    const isSelected = (bookingData.paymentMethod || 'Tiền mặt') === method.id;
                    return (
                        <div
                            key={method.id}
                            style={{
                                ...styles.paymentOptionCard,
                                ...(isSelected ? styles.paymentOptionCardSelected : {})
                            }}
                            onClick={() => onSelectPayment(method.id)}
                        >
                            <div style={styles.paymentOptionIcon}>{method.icon}</div>
                            <span style={styles.paymentOptionText}>{method.name}</span>
                            {isSelected && <div style={styles.paymentOptionCheckmark}><CheckmarkIcon /></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectPaymentScreen;