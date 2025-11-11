import React, { useState, useEffect, useMemo } from 'react';
import { styles } from '../../utils/styles';
import BookingStepper from '../../components/BookingStepper';

interface SelectDateTimeScreenProps {
    bookingData: any;
    onContinue: (data: { dateTime: Date; notes: string }) => void;
    onBack: () => void;
}

const getNext7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        dates.push(nextDay);
    }
    return dates;
};

// --- SVG Icons ---
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const dayOfWeekMap = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const hoursOptions = Array.from({ length: 18 }, (_, i) => String(i + 6).padStart(2, '0')); // 6 AM (6) to 11 PM (23)
const minutesOptions = ['00', '30'];

const SelectDateTimeScreen: React.FC<SelectDateTimeScreenProps> = ({ bookingData, onContinue, onBack }) => {
    const [availableDates] = useState(getNext7Days());
    const [selectedDate, setSelectedDate] = useState<Date | null>(availableDates[1] || availableDates[0]); // Default to tomorrow
    const [selectedHour, setSelectedHour] = useState('09');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [notes, setNotes] = useState('');
    
    const monthYear = useMemo(() => {
        if (!selectedDate) return '';
        return `Tháng ${selectedDate.getMonth() + 1}, ${selectedDate.getFullYear()}`;
    }, [selectedDate]);

    const handleContinue = () => {
        if (!selectedDate || !selectedHour || !selectedMinute) {
            alert("Vui lòng chọn ngày và giờ thực hiện.");
            return;
        }

        const combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(parseInt(selectedHour, 10), parseInt(selectedMinute, 10), 0, 0);

        const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
        if (combinedDateTime <= oneHourFromNow) {
            alert("Vui lòng đặt lịch trước ít nhất 1 giờ.");
            return;
        }

        onContinue({ dateTime: combinedDateTime, notes });
    };

    const getPackageDurationText = (pkg) => {
        if (!pkg) return '';
        if (pkg.hours) return `/${pkg.hours}h`;
        if (pkg.units) return `/${pkg.units} máy`;
        return '';
    };

    return (
        <div style={{ paddingBottom: '120px', backgroundColor: '#fff', minHeight: '100vh' }}>
            <div style={styles.pageHeader}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chọn thời gian</h2>
                <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <BookingStepper steps={['Dịch vụ', 'Địa chỉ', 'Thời gian', 'Thanh toán']} currentStep={3} />
            <div style={{...styles.screenContent, backgroundColor: '#fff'}}>
                <div style={styles.dateTimeSectionHeader}>
                     <h3 style={styles.dateTimeSectionTitle}>Chọn ngày làm</h3>
                     <span style={styles.dateTimeMonthYear}>{monthYear}</span>
                </div>
                <div style={styles.datePickerContainer}>
                    {availableDates.map(date => (
                        <div
                            key={date.toISOString()}
                            style={{
                                ...styles.datePickerPill,
                                ...(selectedDate?.toDateString() === date.toDateString() ? styles.datePickerPillSelected : {})
                            }}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span style={styles.dateItemDayOfWeek}>{dayOfWeekMap[date.getDay()]}</span>
                            <span style={styles.dateItemDayOfMonth}>{date.getDate()}</span>
                        </div>
                    ))}
                </div>

                <div style={{marginTop: '40px'}}>
                    <h3 style={styles.dateTimeSectionTitle}>Chọn giờ làm</h3>
                    <div style={styles.timePickerCard}>
                        <span style={styles.timePickerCardIcon}><ClockIcon /></span>
                        <div style={styles.timePickerCardText}>
                            <select value={selectedHour} onChange={e => setSelectedHour(e.target.value)} style={styles.timeSelectModern}>
                                {hoursOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span style={{fontSize: '18px', color: '#ccc', fontWeight: 'bold'}}>:</span>
                             <select value={selectedMinute} onChange={e => setSelectedMinute(e.target.value)} style={styles.timeSelectModern}>
                                {minutesOptions.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                </div>


                <div style={{ marginTop: '40px' }}>
                    <h3 style={styles.dateTimeSectionTitle}>Ghi chú</h3>
                    <p style={{ color: '#666', marginTop: 0, fontSize: '13px' }}>Ghi chú này sẽ giúp cộng tác viên làm nhanh và tốt hơn.</p>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        maxLength={300}
                        rows={4}
                        placeholder="Bạn có yêu cầu gì thêm, hãy nhập ở đây nhé"
                        style={styles.notesTextareaModern}
                    />
                </div>
            </div>
            
            <div style={styles.fixedFooter}>
                 <button onClick={handleContinue} style={{...styles.footerButton, borderRadius: '12px'}}>
                    <span>
                         {bookingData?.package?.price.toLocaleString('vi-VN')} VND{getPackageDurationText(bookingData?.package)}
                    </span>
                    <span>Tiếp theo</span>
                </button>
            </div>
        </div>
    );
};

export default SelectDateTimeScreen;