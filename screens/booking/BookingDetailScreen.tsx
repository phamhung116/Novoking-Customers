import React, { useState, useEffect } from 'react';
import { styles, PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/styles';
import { formatAddress, formatDateTime } from '../../utils/helpers';
import { promotions } from '../../utils/data';

interface BookingDetailScreenProps {
    booking: any;
    onBack: () => void;
    onCancelBooking: (bookingId: string) => void;
    onTrackTasker: (booking: any) => void;
    onRateBooking: (booking: any) => void;
    onViewReviewDetails: (booking: any) => void;
}

// --- NEW SVG Icon Components ---
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);
const NotesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
);
// --- SVG Icon Components for Modal ---
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const TaskerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

// FIX: Add explicit prop types for the StarIcon component to prevent TypeScript errors.
interface StarIconProps {
    filled?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ filled = true }) => (
    <div style={styles.reviewSummaryStarIcon}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    </div>
);


const getStatusChipStyle = (status: string): React.CSSProperties => {
    switch (status) {
        case 'Đã hoàn thành': return { backgroundColor: 'rgba(40, 167, 69, 0.1)', color: '#28a745' };
        case 'Đang chờ CTV': return { backgroundColor: 'rgba(255, 152, 0, 0.1)', color: '#FF9800' };
        case 'Đã hủy bởi khách hàng': return { backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' };
        case 'CTV đã nhận': return { backgroundColor: 'rgba(23, 162, 184, 0.1)', color: '#17a2b8' };
        case 'Đang thực hiện': return { backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff' };
        case 'CTV đang di chuyển': return { backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff' };
        default: return { backgroundColor: '#f0f0f0', color: '#555' };
    }
};

const ContactSupportModal: React.FC<{ isOpen: boolean; onClose: () => void; bookingStatus: string; onTrackTasker: () => void; }> = ({ isOpen, onClose, bookingStatus, onTrackTasker }) => {
    if (!isOpen) return null;
    
    const isTaskerContactDisabled = bookingStatus === 'Đang chờ CTV';
    const animationStyle = `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`;

    const handleTaskerContact = () => {
        if (isTaskerContactDisabled) return;
        onTrackTasker();
        onClose();
    };

    const handleCskhContact = () => {
        window.location.href = 'tel:19001234';
    };

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <style>{animationStyle}</style>
            <div style={{...styles.filterModalContent, padding: '10px 0 20px 0'}} onClick={e => e.stopPropagation()}>
                 <div style={{...styles.filterModalHeader, borderBottom: 'none'}}>
                    <h3 style={styles.filterModalTitle}>Liên hệ hỗ trợ</h3>
                    <button style={styles.filterModalCloseButton} onClick={onClose}>&times;</button>
                </div>
                
                <div style={{padding: '0 20px'}}>
                    <div
                        style={{
                            ...styles.contactModalOption,
                            ...(isTaskerContactDisabled ? styles.contactModalOptionDisabled : {})
                        }}
                        onClick={handleTaskerContact}
                    >
                        <span style={styles.contactModalOptionIcon}><TaskerIcon /></span>
                        <div>
                            <span style={styles.contactModalOptionText}>Liên Hệ với Cộng Tác Viên</span>
                            {isTaskerContactDisabled && (
                                <p style={styles.contactModalDisabledText}>
                                    Chức năng này sẽ khả dụng sau khi có CTV nhận việc.
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={styles.contactModalOption} onClick={handleCskhContact}>
                         <span style={styles.contactModalOptionIcon}><PhoneIcon /></span>
                         <span style={styles.contactModalOptionText}>Gọi Tổng Đài CSKH</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


const BookingDetailScreen: React.FC<BookingDetailScreenProps> = ({ booking, onBack, onCancelBooking, onTrackTasker, onRateBooking, onViewReviewDetails }) => {
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isContactBtnPressed, setContactBtnPressed] = useState(false);
    const [isCancelBtnPressed, setCancelBtnPressed] = useState(false);
    const [isRateBtnPressed, setRateBtnPressed] = useState(false);
    
    const { 
        service, 
        package: pkg, 
        address, 
        dateTime, 
        notes, 
        paymentMethod, 
        promoCode, 
        status, 
        price, 
        id, 
        history,
        isRated
    } = booking;
    
    const showCancelButton = status === 'Đang chờ CTV';
    const showRateButton = status === 'Đã hoàn thành' && !isRated;

    const PLATFORM_FEE = 33000;
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

    const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Date & Time Formatting
    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + (pkg.hours || 0) * 60 * 60 * 1000);
    const dayOfWeekViet = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const formattedDate = `${dayOfWeekViet[startTime.getDay()]}, ${String(startTime.getDate()).padStart(2, '0')}/${String(startTime.getMonth() + 1).padStart(2, '0')}/${startTime.getFullYear()}`;
    const formatTime = (date: Date) => new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    const timeRange = `${formatTime(startTime)} - ${formatTime(endTime)} (${pkg.hours || 'N/A'} giờ)`;

    const pulseAnimation = `@keyframes pulseAnimation { 0%, 100% { box-shadow: 0 0 0 0 rgba(10, 92, 152, 0.4); } 50% { box-shadow: 0 0 0 8px rgba(10, 92, 152, 0); } }`;

    return (
        <div style={{...styles.container, backgroundColor: '#f9f9f9', paddingBottom: (showCancelButton || showRateButton) ? '100px' : '20px'}}>
            <style>{pulseAnimation}</style>
            <div style={{...styles.pageHeader, backgroundColor: '#f9f9f9', borderBottomColor: '#f0f0f0'}}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px', color: '#333'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chi tiết Booking</h2>
                <div style={{width: '24px'}}></div>
            </div>

            <div style={{ padding: '0 15px' }}>
                {/* Status Header Card */}
                <div style={{...styles.bookingDetailCard, textAlign: 'center'}}>
                    <span style={{...styles.bookingDetailStatusChip, ...getStatusChipStyle(status)}}>
                        {status}
                    </span>
                    <p style={styles.bookingDetailId}>
                        Mã đặt lịch: <span style={styles.bookingDetailIdCode}>{id}</span>
                    </p>
                </div>
                
                {/* Time Card */}
                <div style={styles.bookingDetailCard}>
                    <div style={styles.bookingDetailSection}>
                        <div style={styles.bookingDetailIcon}><ClockIcon /></div>
                        <div style={styles.bookingDetailContent}>
                            <h3 style={styles.bookingDetailTitle}>Thời gian làm việc</h3>
                            <p style={styles.bookingDetailText}>{formattedDate}</p>
                            <p style={{...styles.bookingDetailText, fontSize: '15px', color: '#555', fontWeight: '500'}}>{timeRange}</p>
                        </div>
                    </div>
                </div>

                {/* Location Card */}
                <div style={styles.bookingDetailCard}>
                    <div style={styles.bookingDetailSection}>
                        <div style={styles.bookingDetailIcon}><LocationIcon /></div>
                        <div style={styles.bookingDetailContent}>
                             <h3 style={styles.bookingDetailTitle}>Địa điểm</h3>
                            <p style={styles.bookingDetailText}>{formatAddress(address)}</p>
                        </div>
                    </div>
                </div>

                {/* Review Summary Card (NEW) */}
                {status === 'Đã hoàn thành' && isRated && booking.ratingData && (
                    <button style={styles.reviewSummaryCard} onClick={() => onViewReviewDetails(booking)}>
                        <h3 style={{...styles.bookingDetailTitle, margin: '0 0 10px 0'}}>Đánh giá của bạn</h3>
                        <div style={styles.reviewSummaryHeader}>
                            <span style={styles.reviewSummaryStars}>
                                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled={i < booking.ratingData.stars} />)}
                            </span>
                            <span style={styles.reviewSummaryAction}>Xem chi tiết &rarr;</span>
                        </div>
                        <p style={{fontSize: '12px', color: '#777', margin: '8px 0 0 0', textAlign: 'right'}}>
                           Ngày {new Date(booking.ratingData.timestamp).toLocaleDateString('vi-VN')}
                        </p>
                    </button>
                )}

                {/* Payment Card */}
                <div style={styles.bookingDetailCard}>
                    <h3 style={{...styles.bookingDetailTitle, marginBottom: '15px'}}>Chi tiết thanh toán</h3>
                    <div style={styles.paymentBreakdownRow}>
                        <span>{service.name} ({pkg.name})</span>
                        <span>{pkg.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div style={styles.paymentBreakdownRow}>
                        <span>Phí nền tảng</span>
                        <span>{PLATFORM_FEE.toLocaleString('vi-VN')}đ</span>
                    </div>
                    {promo && (
                         <div style={{...styles.paymentBreakdownRow, color: PRIMARY_COLOR}}>
                            <span>Khuyến mãi ({promo.id})</span>
                            <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                        </div>
                    )}
                    <div style={styles.paymentBreakdownDivider} />
                    <div style={styles.paymentBreakdownTotalRow}>
                        <span style={styles.paymentBreakdownTotalLabel}>Tổng cộng</span>
                        <span style={styles.paymentBreakdownTotalValue}>{price.toLocaleString('vi-VN')}đ</span>
                    </div>
                     <div style={styles.paymentMethodRow}>
                        <span>Phương thức: </span>
                        <span style={{fontWeight: 'bold'}}>{paymentMethod}</span>
                    </div>
                </div>

                {/* Notes Card */}
                {notes && (
                    <div style={styles.bookingDetailCard}>
                        <div style={styles.bookingDetailSection}>
                            <div style={styles.bookingDetailIcon}><NotesIcon /></div>
                            <div style={styles.bookingDetailContent}>
                                 <h3 style={styles.bookingDetailTitle}>Ghi chú</h3>
                                <p style={{...styles.bookingDetailText, whiteSpace: 'pre-wrap', fontWeight: '500'}}>{notes}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* History Timeline Card */}
                <div style={styles.bookingDetailCard}>
                    <h3 style={{...styles.bookingDetailTitle, marginBottom: '20px'}}>Lịch sử trạng thái</h3>
                    <div style={styles.timelineContainer}>
                        {sortedHistory.map((h, index) => {
                             const isTrackableStatus = h.status === 'CTV đang di chuyển';
                             const timelineItemStyles = {
                                ...styles.timelineItem,
                                ...(isTrackableStatus ? styles.timelineItemClickable : {}),
                             };
                             const handleClick = isTrackableStatus ? () => onTrackTasker(booking) : undefined;

                            return (
                                <div key={index} style={timelineItemStyles} onClick={handleClick}>
                                    {index < sortedHistory.length - 1 && <div style={styles.timelineConnector}></div>}
                                    <div style={{
                                        ...styles.timelineDot, 
                                        ...(index === 0 ? {...styles.timelineDotActive, ...(h.status !== 'Đã hủy bởi khách hàng' && h.status !== 'Đã hoàn thành' ? styles.timelinePulse : {})} : {})
                                    }}></div>
                                    <div style={styles.timelineContent}>
                                        <p style={{...styles.timelineTitle, ...(index === 0 ? {color: SECONDARY_COLOR} : {})}}>{h.status}</p>
                                        <p style={styles.timelineTimestamp}>
                                           {formatDateTime(new Date(h.timestamp))}
                                        </p>
                                        {isTrackableStatus && (
                                            <p style={styles.timelineActionLink}>
                                                Xem chi tiết trên bản đồ &rarr;
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {/* Support Card */}
                <div style={styles.bookingDetailCard}>
                     <h3 style={{...styles.bookingDetailTitle, marginBottom: '15px'}}>Hỗ Trợ & Liên Hệ</h3>
                    <button
                        style={{...styles.supportButton, ...(isContactBtnPressed ? styles.buttonPressed : {})}}
                        onClick={() => setContactModalOpen(true)}
                        onMouseDown={() => setContactBtnPressed(true)}
                        onMouseUp={() => setContactBtnPressed(false)}
                        onMouseLeave={() => setContactBtnPressed(false)}
                    >
                        Liên Hệ Hỗ trợ
                    </button>
                </div>
            </div>

            {(showCancelButton || showRateButton) && (
                <div style={styles.fixedFooter}>
                    {showCancelButton && (
                        <button 
                            onClick={() => onCancelBooking(id)} 
                            style={{...styles.cancelBookingButton, ...(isCancelBtnPressed ? styles.buttonPressed : {})}}
                            onMouseDown={() => setCancelBtnPressed(true)}
                            onMouseUp={() => setCancelBtnPressed(false)}
                            onMouseLeave={() => setCancelBtnPressed(false)}
                        >
                            Hủy Booking
                        </button>
                    )}
                    {showRateButton && (
                         <button 
                            onClick={() => onRateBooking(booking)} 
                            style={{...styles.footerButton, justifyContent: 'center', ...(isRateBtnPressed ? styles.buttonPressed : {})}}
                            onMouseDown={() => setRateBtnPressed(true)}
                            onMouseUp={() => setRateBtnPressed(false)}
                            onMouseLeave={() => setRateBtnPressed(false)}
                        >
                            Đánh giá & Nhận xét
                        </button>
                    )}
                </div>
            )}
             <ContactSupportModal
                isOpen={isContactModalOpen}
                onClose={() => setContactModalOpen(false)}
                bookingStatus={status}
                onTrackTasker={() => onTrackTasker(booking)}
            />
        </div>
    );
};

export default BookingDetailScreen;