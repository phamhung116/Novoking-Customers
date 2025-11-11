import React, { useState, useMemo, useEffect } from 'react';
import { styles, PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/styles';
import { formatDateTime } from '../../utils/helpers';

interface ActivityScreenProps {
    user: any;
    onViewDetails: (booking: any) => void;
    setActiveTab: (tab: string) => void;
}

// --- Constants ---
const ALL_BOOKING_STATUSES = ['Tất cả', 'Đang chờ CTV', 'CTV đã nhận', 'Đang thực hiện', 'Đã hoàn thành', 'Đã hủy bởi khách hàng'];
const TIME_FILTER_OPTIONS = ['Tất cả', 'Tuần này', 'Tuần trước', 'Tháng này', 'Tháng trước'];

// --- SVG Icons ---
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

const EmptyStateIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const HashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9"></line>
        <line x1="4" y1="15" x2="20" y2="15"></line>
        <line x1="10" y1="3" x2="8" y2="21"></line>
        <line x1="16" y1="3" x2="14" y2="21"></line>
    </svg>
);


// --- Helper Functions ---
const getStatusChipStyle = (status: string): React.CSSProperties => {
    switch (status) {
        case 'Đã hoàn thành': return { backgroundColor: 'rgba(40, 167, 69, 0.1)', color: '#28a745' };
        case 'Đang chờ CTV': return { backgroundColor: 'rgba(255, 193, 7, 0.1)', color: '#b9900a' };
        case 'Đã hủy bởi khách hàng': return { backgroundColor: 'rgba(220, 53, 69, 0.1)', color: '#dc3545' };
        case 'CTV đã nhận': return { backgroundColor: 'rgba(23, 162, 184, 0.1)', color: '#17a2b8' };
        case 'Đang thực hiện': return { backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff' };
        case 'CTV đang di chuyển': return { backgroundColor: 'rgba(0, 123, 255, 0.1)', color: '#007bff' };
        default: return { backgroundColor: '#f0f0f0', color: '#555' };
    }
};

const filterBookingsByTime = (bookings, timeFilter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    };

    switch (timeFilter) {
        case 'Tuần này': {
            const startOfWeek = getStartOfWeek(today);
            return bookings.filter(b => new Date(b.dateTime) >= startOfWeek);
        }
        case 'Tuần trước': {
            const startOfThisWeek = getStartOfWeek(today);
            const startOfLastWeek = new Date(startOfThisWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
            return bookings.filter(b => {
                const bookingDate = new Date(b.dateTime);
                return bookingDate >= startOfLastWeek && bookingDate < startOfThisWeek;
            });
        }
        case 'Tháng này':
            return bookings.filter(b => new Date(b.dateTime).getMonth() === today.getMonth() && new Date(b.dateTime).getFullYear() === today.getFullYear());
        case 'Tháng trước': {
            const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
            const year = lastMonth === 11 ? today.getFullYear() - 1 : today.getFullYear();
            return bookings.filter(b => new Date(b.dateTime).getMonth() === lastMonth && new Date(b.dateTime).getFullYear() === year);
        }
        default:
            return bookings;
    }
};

// --- Child Components ---

// FIX: Add explicit prop types for the BookingItem component to prevent TypeScript errors with the `key` prop.
interface BookingItemProps {
    booking: any;
    onViewDetails: (booking: any) => void;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking, onViewDetails }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div
            style={{
                ...styles.activityBookingCard,
                ...(isPressed ? styles.activityBookingCardPressed : {})
            }}
            onClick={() => onViewDetails(booking)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
        >
            <div style={styles.activityCardHeader}>
                <h3 style={styles.activityCardTitle}>{booking.service.name}</h3>
                <span style={{...styles.activityCardStatusChip, ...getStatusChipStyle(booking.status)}}>
                    {booking.status}
                </span>
            </div>
            <div style={styles.activityCardInfoRow}>
                <span style={styles.activityCardInfoIcon}><HashIcon /></span>
                <span style={styles.activityCardInfoText}>{booking.id}</span>
            </div>
            <div style={styles.activityCardInfoRow}>
                <span style={styles.activityCardInfoIcon}><CalendarIcon /></span>
                <span style={styles.activityCardInfoText}>{formatDateTime(new Date(booking.dateTime))}</span>
            </div>
        </div>
    );
};


const ActivityScreen: React.FC<ActivityScreenProps> = ({ user, onViewDetails, setActiveTab }) => {
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Tất cả');
    const [selectedTime, setSelectedTime] = useState('Tất cả');

    const bookings = user.bookings || [];

    const filteredBookings = useMemo(() => {
        let result = [...bookings];

        // Status filter
        if (selectedStatus !== 'Tất cả') {
            if (selectedStatus === 'Đang thực hiện') {
                result = result.filter(b => b.status === 'Đang thực hiện' || b.status === 'CTV đang di chuyển');
            } else {
                result = result.filter(b => b.status === selectedStatus);
            }
        }

        // Time filter
        result = filterBookingsByTime(result, selectedTime);

        // Always sort by newest first
        result.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
        
        return result;
    }, [bookings, selectedStatus, selectedTime]);

    const handleApplyFilter = (status, time) => {
        setSelectedStatus(status);
        setSelectedTime(time);
        setFilterModalOpen(false);
    };

    const FilterModal = () => {
        const [tempStatus, setTempStatus] = useState(selectedStatus);
        const [tempTime, setTempTime] = useState(selectedTime);

        if (!isFilterModalOpen) return null;

        const animationStyle = `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`;

        return (
            <div style={styles.modalOverlay} onClick={() => setFilterModalOpen(false)}>
                <style>{animationStyle}</style>
                <div style={styles.filterModalContent} onClick={e => e.stopPropagation()}>
                    <div style={styles.filterModalHeader}>
                        <h3 style={styles.filterModalTitle}>Lọc và Sắp xếp</h3>
                        <button style={styles.filterModalCloseButton} onClick={() => setFilterModalOpen(false)}>&times;</button>
                    </div>
                    <div style={styles.filterModalSection}>
                        <h4 style={styles.filterModalSectionTitle}>Trạng thái</h4>
                        <div style={styles.filterModalOptionsContainer}>
                            {ALL_BOOKING_STATUSES.map(status => (
                                <div
                                    key={status}
                                    style={tempStatus === status ? { ...styles.filterModalOption, ...styles.filterStatusOptionSelected } : styles.filterModalOption}
                                    onClick={() => setTempStatus(status)}
                                >{status}</div>
                            ))}
                        </div>
                    </div>
                    <div style={styles.filterModalSection}>
                        <h4 style={styles.filterModalSectionTitle}>Thời gian</h4>
                        <div style={styles.filterModalOptionsContainer}>
                            {TIME_FILTER_OPTIONS.map(time => (
                                <div
                                    key={time}
                                    style={tempTime === time ? { ...styles.filterModalOption, ...styles.filterSortOptionSelected } : styles.filterModalOption}
                                    onClick={() => setTempTime(time)}
                                >{time}</div>
                            ))}
                        </div>
                    </div>
                    <div style={styles.filterModalActions}>
                         <button style={styles.filterModalResetButton} onClick={() => { setTempStatus('Tất cả'); setTempTime('Tất cả'); }}>Đặt lại</button>
                         <button style={styles.filterModalApplyButton} onClick={() => handleApplyFilter(tempStatus, tempTime)}>Áp dụng</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.activityScreenContainer}>
            <div style={styles.activityHeader}>
                <h2 style={styles.activityTitle}>Hoạt động</h2>
                <button style={styles.filterButton} onClick={() => setFilterModalOpen(true)}>
                    <div style={styles.filterButtonIcon}><FilterIcon /></div>
                </button>
            </div>
            {filteredBookings.length > 0 ? (
                <div style={{padding: '0 20px'}}>
                    {filteredBookings.map(booking => (
                        <BookingItem key={booking.id} booking={booking} onViewDetails={onViewDetails} />
                    ))}
                </div>
            ) : (
                <div style={styles.activityEmptyStateContainer}>
                    <div style={styles.activityEmptyStateIllustration}><EmptyStateIcon /></div>
                    <h3 style={styles.activityEmptyStateTitle}>Chưa có hoạt động nào</h3>
                    <p style={styles.activityEmptyStateSubtitle}>Tất cả các công việc bạn đặt sẽ được hiển thị ở đây.</p>
                    <button onClick={() => setActiveTab('home')} style={{...styles.button, width: 'auto', padding: '12px 25px'}}>Đặt dịch vụ ngay</button>
                </div>
            )}
            <FilterModal />
        </div>
    );
};

export default ActivityScreen;