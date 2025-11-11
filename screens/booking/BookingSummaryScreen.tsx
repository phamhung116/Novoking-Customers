import React, { useState, useEffect } from 'react';
// FIX: Import `PRIMARY_COLOR` and `SECONDARY_COLOR` to be used in inline styles.
import { styles, PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/styles';
import { formatAddress } from '../../utils/helpers';
import { promotions } from '../../utils/data';

interface BookingSummaryScreenProps {
    bookingData: any;
    user: any;
    onConfirm: () => void;
    onBack: () => void;
    setScreen: (screen: string) => void;
    updateBookingData: (data: any, nextScreen?: string) => void;
}

// --- SVG Icon Components ---
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const CashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="6" x2="6" y1="12" y2="12"/><line x1="18" x2="18" y1="12" y2="12"/><path d="M6 12h.01M18 12h.01"/></svg>
);
const BankTransferIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
);
const PromoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7" y1="7" y2="7"/></svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

interface ContactInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (name: string, phone: string) => void;
    currentName: string;
    currentPhone: string;
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({ isOpen, onClose, onUpdate, currentName, currentPhone }) => {
    const [name, setName] = useState(currentName);
    const [phone, setPhone] = useState(currentPhone);

    useEffect(() => {
        if (isOpen) {
            setName(currentName);
            setPhone(currentPhone);
        }
    }, [currentName, currentPhone, isOpen]);

    if (!isOpen) return null;

    const handleUpdate = () => {
        if (!name.trim() || !phone.trim()) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (!/^(0\d{9})$/.test(phone)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số bắt đầu bằng 0.");
            return;
        }
        onUpdate(name, phone);
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={{...styles.modalContent, borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px'}} onClick={e => e.stopPropagation()}>
                <div style={styles.contactModalHeader}>
                    <span>Thông tin liên hệ</span>
                    <button onClick={onClose} style={styles.contactModalClose}>&times;</button>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>SỐ ĐIỆN THOẠI</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        style={styles.input} 
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>TÊN LIÊN HỆ</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        style={styles.input} 
                    />
                </div>
                <button 
                    onClick={handleUpdate} 
                    style={{...styles.button, width: '100%', justifyContent: 'center', marginTop: '10px'}}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
};

export const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({ bookingData, user, onConfirm, onBack, setScreen, updateBookingData }) => {
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    
    const PLATFORM_FEE = 33000;
    const { service, package: pkg, address, dateTime, promoCode, paymentMethod = 'Tiền mặt' } = bookingData;

    // Price calculation for display
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

    // Time calculation and formatting
    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + (pkg.hours || 0) * 60 * 60 * 1000);
    
    const formatTime = (date: Date) => new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    
    const dayOfWeekViet = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const startTimeStr = formatTime(startTime);
    const endTimeStr = formatTime(endTime);
    const formattedManualDate = `${dayOfWeekViet[startTime.getDay()]}, ${String(startTime.getDate()).padStart(2, '0')}/${String(startTime.getMonth() + 1).padStart(2, '0')}/${startTime.getFullYear()} - ${startTimeStr}`;
    const durationStr = `${pkg.hours} giờ, ${startTimeStr} đến ${endTimeStr}`;

    const handleUpdateContact = (newName: string, newPhone: string) => {
        updateBookingData({ contactName: newName, contactPhone: newPhone });
        setContactModalOpen(false);
    };
    
    const handleProceed = () => {
        if (paymentMethod === 'Chuyển khoản') {
            setScreen('momo-payment');
        } else {
            onConfirm();
        }
    };
    
    const buttonText = paymentMethod === 'Chuyển khoản' ? 'Thanh toán' : 'Đăng việc';
    const paymentIcon = paymentMethod === 'Chuyển khoản' ? <BankTransferIcon /> : <CashIcon />;


    return (
        <div style={{ paddingBottom: '120px' }}>
            <div style={styles.pageHeader}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Xác nhận Booking</h2>
                <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            {/* The main content area now uses the app's background color */}
            <div style={{ ...styles.screenContent, backgroundColor: '#f9f9f9', padding: '0 15px' }}>

                {/* Section 1: Work Location */}
                <h2 style={{...styles.bookingSummarySectionTitle, marginTop: '20px'}}>Vị trí làm việc</h2>
                <div style={styles.bookingSummaryCard}>
                    <div style={{...styles.bookingSummaryRow, alignItems: 'flex-start', cursor: 'pointer'}} onClick={() => setScreen('booking-select-address')}>
                        <span style={{...styles.bookingSummaryIcon, fontSize: '24px'}}><LocationIcon /></span>
                        <div style={styles.bookingSummaryContent}>
                            <div style={styles.bookingSummaryMainText}>{address.streetNumber} {address.streetName}</div>
                            <div style={styles.bookingSummarySubText}>{formatAddress(address).replace('P. ', '')}</div>
                        </div>
                    </div>
                    <div style={{...styles.bookingSummaryRow, marginBottom: 0}}>
                        <span style={{...styles.bookingSummaryIcon, fontSize: '24px'}}><UserIcon /></span>
                        <div style={styles.bookingSummaryContent}>
                            <div style={styles.bookingSummaryMainText}>{bookingData.contactName}</div>
                            <div style={styles.bookingSummarySubText}>(+84) {bookingData.contactPhone.substring(1)}</div>
                        </div>
                        <button style={styles.bookingSummaryChangeButton} onClick={() => setContactModalOpen(true)}>Thay đổi</button>
                    </div>
                </div>

                {/* Section 2: Work Information */}
                <h2 style={styles.bookingSummarySectionTitle}>Thông tin công việc</h2>
                <div style={styles.bookingSummaryCard}>
                    <div style={styles.bookingSummarySubSectionTitle}>Thời gian làm việc</div>
                    <div style={styles.bookingSummaryDetailRow}>
                        <span style={{color: '#666'}}>Ngày làm việc</span>
                        <span>{formattedManualDate}</span>
                    </div>
                     <div style={{...styles.bookingSummaryDetailRow, color: '#666'}}>
                        <span>Làm trong</span>
                        <span>{durationStr}</span>
                    </div>
                    <div style={styles.bookingSummaryJobItemContainer}>
                        <div style={styles.bookingSummarySubSectionTitle}>Chi tiết công việc</div>
                        <div style={styles.bookingSummaryJobItem}>
                            <div style={styles.bookingSummaryJobDetails}>
                                <div style={styles.bookingSummaryMainText}>{service.name}</div>
                                <div style={styles.bookingSummaryJobPackage}>Gói: {pkg.name}</div>
                            </div>
                            <span style={styles.bookingSummaryMainText}>{pkg.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </div>

                {/* Section 3: Payment Method */}
                <h2 style={styles.bookingSummarySectionTitle}>Phương thức thanh toán</h2>
                <div style={styles.bookingSummaryPaymentContainer}>
                    <div style={styles.bookingSummaryPaymentOption} onClick={() => setScreen('booking-payment-method')}>
                        {/* FIX: Use imported `SECONDARY_COLOR` constant instead of trying to access it from the `styles` object. */}
                        {/* FIX: Use the imported SECONDARY_COLOR constant directly instead of accessing it from the styles object. */}
                        <span style={{fontSize: '24px', color: SECONDARY_COLOR}}>{paymentIcon}</span>
                        <span>{paymentMethod}</span>
                        <span style={{marginLeft: 'auto'}}>&gt;</span>
                    </div>
                    <div style={{borderLeft: '1px solid #f0f0f0'}}></div>
                    <div style={styles.bookingSummaryPaymentOption} onClick={() => setScreen('booking-promo')}>
                        {/* FIX: Use imported `SECONDARY_COLOR` constant instead of trying to access it from the `styles` object. */}
                        {/* FIX: Use the imported SECONDARY_COLOR constant directly instead of accessing it from the styles object. */}
                        <span style={{fontSize: '24px', color: SECONDARY_COLOR}}><PromoIcon /></span>
                        <div style={{ flex: 1 }}>
                            <span>Khuyến mãi</span>
                            {promo && (
                                <div style={{ color: PRIMARY_COLOR, fontSize: '14px', marginTop: '4px', fontWeight: 'bold' }}>
                                    {promo.id}
                                </div>
                            )}
                        </div>
                        <span style={{color: promo ? PRIMARY_COLOR : '#333'}}>&gt;</span>
                    </div>
                </div>

                {/* Section 4: Total */}
                <div style={styles.bookingSummaryTotalContainer}>
                    <span style={styles.bookingSummaryTotalLabel}>Tổng cộng</span>
                    <span style={styles.bookingSummaryTotalValue}>{finalPrice.toLocaleString('vi-VN')} VND</span>
                </div>
            </div>
             {/* Footer Button */}
            <div style={{...styles.fixedFooter, padding: '10px 20px', borderTop: 'none', backgroundColor: 'transparent' }}>
                <button onClick={handleProceed} style={{...styles.footerButton, justifyContent: 'center', borderRadius: '12px'}}>
                    {buttonText}
                </button>
            </div>
            <ContactInfoModal
                isOpen={isContactModalOpen}
                onClose={() => setContactModalOpen(false)}
                onUpdate={handleUpdateContact}
                currentName={bookingData.contactName}
                currentPhone={bookingData.contactPhone}
            />
        </div>
    );
};


interface PromoScreenProps {
    bookingData: any;
    onBack: () => void;
    onSelectPromo: (promoId: string | null) => void;
}

const CheckmarkIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const PromoScreen: React.FC<PromoScreenProps> = ({ bookingData, onBack, onSelectPromo }) => {
    const [manualPromo, setManualPromo] = useState('');
    const { promoCode } = bookingData;

    const renderPromoItem = (id, code, description) => {
        const isSelected = promoCode === id;
        return (
             <div 
                key={id || 'none'}
                style={{
                    ...styles.promoOptionCard,
                    ...(isSelected ? styles.promoOptionCardSelected : {})
                }} 
                onClick={() => onSelectPromo(id)}
            >
                <div style={styles.promoOptionIcon}><PromoIcon /></div>
                <div style={styles.promoOptionPerforatedEdge}></div>
                <div style={styles.promoOptionContent}>
                    <p style={styles.promoOptionCode}>{code}</p>
                    {description && <p style={styles.promoOptionDesc}>{description}</p>}
                </div>
                {isSelected && <div style={styles.paymentOptionCheckmark}><CheckmarkIcon /></div>}
            </div>
        );
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div style={{ ...styles.pageHeader, marginBottom: 0, backgroundColor: 'white' }}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chọn khuyến mãi</h2>
                 <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <div style={{...styles.screenContent, backgroundColor: '#f9f9f9'}}>
                 <input
                    type="text"
                    placeholder="Nhập mã khuyến mãi"
                    value={manualPromo}
                    onChange={e => setManualPromo(e.target.value)}
                    style={{ ...styles.input, width: '100%', boxSizing: 'border-box', marginBottom: '20px' }}
                />
                {promotions.map(promo => renderPromoItem(promo.id, promo.id, promo.description))}
                {renderPromoItem(null, 'Không dùng mã', null)}
            </div>
        </div>
    );
};