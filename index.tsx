import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// Import data and utilities
// FIX: `mockUserDatabase` and `promotions` will be exported from data.ts
import { mockUserDatabase, services, promotions, mockTrackingBooking, MOCK_COMPLETED_BOOKING, mockActivityNotifications, mockSystemNotifications } from './utils/data';
import { styles, PRIMARY_COLOR } from './utils/styles';

// Import screen components
import WelcomeScreen from './screens/auth/WelcomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import PhoneInputScreen from './screens/auth/PhoneInputScreen';
import OTPScreen from './screens/auth/OTPScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import LogoutSuccessScreen from './screens/auth/LogoutSuccessScreen';

import HomeScreen from './screens/main/HomeScreen';
import AccountScreen from './screens/main/AccountScreen';
import ActivityScreen from './screens/main/ActivityScreen';
import NotificationScreen from './screens/main/NotificationScreen';

import ProfileViewScreen from './screens/account/ProfileViewScreen';
import ProfileEditScreen from './screens/account/ProfileEditScreen';
import AddressFormScreen from './screens/account/AddressFormScreen';

// Import booking flow screens
import ServiceDetailScreen from './screens/booking/ServiceDetailScreen';
import SelectAddressScreen from './screens/booking/SelectAddressScreen';
import SelectDateTimeScreen from './screens/booking/SelectDateTimeScreen';
// FIX: This import will work after `BookingSummaryScreen.tsx` is updated to have named exports.
import { BookingSummaryScreen, PromoScreen } from './screens/booking/BookingSummaryScreen';
import SelectPaymentScreen from './screens/booking/SelectPaymentScreen';
import BookingSuccessScreen from './screens/booking/BookingSuccessScreen';
import BookingDetailScreen from './screens/booking/BookingDetailScreen';
import MomoPaymentScreen from './screens/booking/MomoPaymentScreen';
import TaskerTrackingScreen from './screens/booking/TaskerTrackingScreen';

// Import feedback flow screens
import RatingScreen from './screens/feedback/RatingScreen';
import FeedbackSuccessScreen from './screens/feedback/FeedbackSuccessScreen';
import ReviewDetailScreen from './screens/feedback/ReviewDetailScreen';
import EditReviewScreen from './screens/feedback/EditReviewScreen';


// Import shared components
import BottomNavBar from './components/BottomNavBar';
import ConfirmationModal from './components/ConfirmationModal';
import NotificationDetailModal from './components/NotificationDetailModal';

// --- MAIN APP ---
const App = () => {
    const [screen, setScreen] = useState('welcome');
    const [user, setUser] = useState(null);
    const [tempData, setTempData] = useState<{ [key: string]: any }>({});
    const [activeTab, setActiveTab] = useState('home');
    const [editingAddress, setEditingAddress] = useState(null);
    
    // State for booking flow
    const [bookingData, setBookingData] = useState(null);
    const [viewingBooking, setViewingBooking] = useState(null);
    const [ratingBooking, setRatingBooking] = useState(null);
    const [editingReviewForBooking, setEditingReviewForBooking] = useState(null);
    const [viewingTrackingForBooking, setViewingTrackingForBooking] = useState(null);
    const [bookingCompletionMessage, setBookingCompletionMessage] = useState('');
    const [lastCompletedBooking, setLastCompletedBooking] = useState(null);
    const [confirmation, setConfirmation] = useState({ isOpen: false, message: '', onConfirm: () => {}, confirmText: 'Đồng ý', confirmColor: PRIMARY_COLOR });

    // State for notifications
    const [activityNotifications, setActivityNotifications] = useState(mockActivityNotifications);
    const [systemNotifications, setSystemNotifications] = useState(mockSystemNotifications);
    const [viewingNotification, setViewingNotification] = useState(null);

    // Check for full-screen auth pages to apply different container styles
    const isFullScreenAuth = !user && (screen === 'welcome' || screen === 'logout-success');


    const handleLoginVerify = (otp) => {
        const userData = mockUserDatabase[tempData.phoneNumber];

        // --- INJECT MOCK BOOKING FOR MAP TRACKING TEST ---
        const mockBookingWithFreshTimestamp = {
            ...mockTrackingBooking,
            dateTime: new Date(Date.now() + 30 * 60 * 1000), // Reset time on each login
             history: [
                { status: 'Đang chờ CTV', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
                { status: 'CTV đã nhận', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
                { status: 'CTV đang di chuyển', timestamp: new Date(Date.now()) },
            ],
        };
        const updatedBookings = [MOCK_COMPLETED_BOOKING, mockBookingWithFreshTimestamp, ...(userData.bookings || [])];
        // --- END INJECTION ---

        setUser({ ...userData, phoneNumber: tempData.phoneNumber, bookings: updatedBookings });
        setTempData({});
        setScreen('dashboard');
        setActiveTab('home');
    };

    const handleRegisterOtpVerify = (otp) => {
        setScreen('register-details');
    };

    const handleRegistrationSubmit = (registrationData) => {
        const newUser = { ...registrationData, dob: '', gender: 'Khác', bookings: [] };
        mockUserDatabase[tempData.phoneNumber] = newUser;
        setUser(null);
        setTempData({});
        // Navigation is now handled within RegisterScreen after the success modal
    };

    const closeConfirmation = () => {
        setConfirmation({ isOpen: false, message: '', onConfirm: () => {}, confirmText: 'Đồng ý', confirmColor: PRIMARY_COLOR });
    };
    
    const handleLogout = () => {
        setConfirmation({
            isOpen: true,
            message: 'Bạn có chắc chắn muốn đăng xuất không?',
            confirmText: 'Đăng xuất',
            confirmColor: PRIMARY_COLOR,
            onConfirm: () => {
                setScreen('logout-success');
                setUser(null);
                setTempData({});
                setBookingData(null);
                setViewingBooking(null);
                setActiveTab('home');
                closeConfirmation();
            }
        });
    };
    
    const handleSaveAddress = (addressData) => {
        let updatedAddresses = [...(user.addresses || [])];
        if (editingAddress) {
            updatedAddresses = updatedAddresses.map(addr =>
                addr.id === editingAddress.id ? { ...addr, ...addressData } : addr
            );
        } else {
            const newId = updatedAddresses.length > 0 ? Math.max(...updatedAddresses.map(a => a.id)) + 1 : 1;
            updatedAddresses.push({ ...addressData, id: newId });
        }
        if (addressData.isDefault) {
            updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: addr.id === (editingAddress ? editingAddress.id : updatedAddresses[updatedAddresses.length-1].id) }));
        }
        if (updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
            updatedAddresses[0].isDefault = true;
        }
        setUser({ ...user, addresses: updatedAddresses });
        setEditingAddress(null);
        setScreen('profile-view');
    };

    // --- Booking Flow Handlers ---
    const handleSelectService = (service) => {
        setBookingData({ 
            service,
            contactName: user.fullName,
            contactPhone: user.phoneNumber,
        });
        setScreen('booking-service-detail');
    };

    const updateBookingData = (data, nextScreen) => {
        setBookingData(prev => ({ ...prev, ...data }));
        if (nextScreen) {
           setScreen(nextScreen);
        }
    };
    
    const handleConfirmBooking = () => {
        const PLATFORM_FEE = 33000;
        const promo = bookingData.promoCode ? promotions.find(p => p.id === bookingData.promoCode) : null;
        const servicePrice = bookingData.package.price;
        
        const successMessage = bookingData.paymentMethod === 'Chuyển khoản' ? 'Thanh toán thành công!' : 'Đăng việc thành công!';
        setBookingCompletionMessage(successMessage);
        
        let finalPrice = servicePrice + PLATFORM_FEE;
        if (promo) {
            if (promo.type === 'percentage') {
                let discount = (servicePrice * promo.value) / 100;
                if (promo.maxDiscount && discount > promo.maxDiscount) {
                    discount = promo.maxDiscount;
                }
                finalPrice -= discount;
            } else if (promo.type === 'fixed') {
                finalPrice -= promo.value;
            }
        }

        const newBooking = {
            ...bookingData,
            id: `NOVOKING-${Date.now()}`,
            dateTime: bookingData.dateTime,
            status: 'Đang chờ CTV',
            collaborator: null,
            price: Math.round(finalPrice),
            paymentMethod: bookingData.paymentMethod || 'Tiền mặt',
            history: [{ status: 'Đang chờ CTV', timestamp: new Date() }]
        };

        const updatedUser = {
            ...user,
            bookings: [newBooking, ...(user.bookings || [])]
        };
        setUser(updatedUser);
        // Also update the "database" for persistence in this mock environment
        mockUserDatabase[user.phoneNumber].bookings = updatedUser.bookings;

        setLastCompletedBooking(newBooking);
        setBookingData(null);
        setScreen('booking-success');
    };

    const handleViewBookingDetailsFromSuccess = () => {
        if (lastCompletedBooking) {
            setViewingBooking(lastCompletedBooking);
            setLastCompletedBooking(null);
            setBookingCompletionMessage('');
        }
    };
    
    const handleCancelBooking = (bookingId) => {
        const performCancel = () => {
            const updatedBookings = user.bookings.map(b => 
                b.id === bookingId ? { ...b, status: 'Đã hủy bởi khách hàng', history: [...b.history, { status: 'Đã hủy bởi khách hàng', timestamp: new Date() }] } : b
            );
            const updatedUser = { ...user, bookings: updatedBookings };
            setUser(updatedUser);
            mockUserDatabase[user.phoneNumber].bookings = updatedUser.bookings;
            
            alert("Booking đã được hủy thành công.");
            setViewingBooking(null);
            setActiveTab('activity');
            setScreen('dashboard');
            closeConfirmation();
        };

        setConfirmation({
            isOpen: true,
            message: 'Bạn có chắc chắn muốn hủy booking này không?',
            confirmText: 'Hủy booking',
            confirmColor: PRIMARY_COLOR,
            onConfirm: performCancel
        });
    };
    
    const handleFeedbackSubmit = (feedbackData) => {
        setConfirmation({
            isOpen: true,
            message: 'Bạn có chắc chắn muốn gửi đánh giá này không? Đánh giá sẽ không thể thay đổi.',
            confirmText: 'Gửi đánh giá',
            confirmColor: PRIMARY_COLOR,
            onConfirm: () => {
                const { bookingId, rating, feedbackText, tags, images } = feedbackData;
                const updatedBookings = user.bookings.map(b =>
                    b.id === bookingId ? {
                        ...b,
                        isRated: true,
                        ratingData: {
                            stars: rating,
                            text: feedbackText,
                            tags: tags,
                            images: images,
                            timestamp: new Date()
                        }
                    } : b
                );
                const updatedUser = { ...user, bookings: updatedBookings };
                setUser(updatedUser);
                mockUserDatabase[user.phoneNumber].bookings = updatedUser.bookings;
    
                setScreen('feedback-success');
                closeConfirmation();
            }
        });
    };
    
    const handleUpdateReview = (reviewData) => {
        setConfirmation({
            isOpen: true,
            message: 'Bạn có chắc chắn muốn lưu các thay đổi này không?',
            confirmText: 'Lưu thay đổi',
            confirmColor: PRIMARY_COLOR,
            onConfirm: () => {
                const { bookingId, rating, feedbackText, tags } = reviewData;
                const updatedBookings = user.bookings.map(b =>
                    b.id === bookingId ? {
                        ...b,
                        ratingData: {
                            ...b.ratingData, // Preserve existing images, etc.
                            stars: rating,
                            text: feedbackText,
                            tags: tags,
                            timestamp: new Date(), // Update timestamp on edit
                        }
                    } : b
                );
                
                const updatedViewingBooking = updatedBookings.find(b => b.id === bookingId);
                const updatedUser = { ...user, bookings: updatedBookings };

                setUser(updatedUser);
                mockUserDatabase[user.phoneNumber].bookings = updatedUser.bookings;
                
                // Keep viewing the updated booking
                setViewingBooking(updatedViewingBooking); 
                
                setEditingReviewForBooking(null); // Exit edit mode
                alert("Cập nhật đánh giá thành công!");
                closeConfirmation();
            }
        });
    };
    
    // --- Notification Handlers ---
    const handleViewNotification = (notification) => {
        setViewingNotification(notification);
        // Mark notification as read
        if (notification.type === 'activity' || notification.type === 'activity') {
             setActivityNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
        } else {
             setSystemNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
        }
    };

    const hasUnreadNotifications = useMemo(() => 
        activityNotifications.some(n => !n.read) || systemNotifications.some(n => !n.read),
        [activityNotifications, systemNotifications]
    );

    const renderAuthScreens = () => {
        switch (screen) {
            case 'welcome': return <WelcomeScreen setScreen={setScreen} />;
            case 'login': return <LoginScreen setScreen={setScreen} setTempData={setTempData} />;
            case 'register-phone': return <PhoneInputScreen setScreen={setScreen} setTempData={setTempData} />;
            case 'register-otp': return <OTPScreen phoneNumber={tempData.phoneNumber} onVerify={handleRegisterOtpVerify} onBack={() => setScreen('register-phone')} />;
            case 'register-details': return <RegisterScreen onRegister={handleRegistrationSubmit} setScreen={setScreen} />;
            case 'logout-success': return <LogoutSuccessScreen setScreen={setScreen} />;
            case 'login-otp': return <OTPScreen phoneNumber={tempData.phoneNumber} onVerify={handleLoginVerify} onBack={() => setScreen('login')} />;
            default: return <WelcomeScreen setScreen={setScreen} />;
        }
    };
    
    const exitBookingFlow = () => {
        setBookingData(null);
        setScreen('dashboard');
    }

    const renderMainApp = () => {
        // Booking Flow Screens
        if (screen === 'booking-success' && lastCompletedBooking) {
             return <BookingSuccessScreen 
                        message={bookingCompletionMessage} 
                        booking={lastCompletedBooking}
                        onViewDetails={handleViewBookingDetailsFromSuccess} 
                    />;
        }

        if (bookingData) {
            let screenToRender;
            switch(screen) {
                case 'booking-service-detail': 
                    screenToRender = <ServiceDetailScreen bookingData={bookingData} onContinue={(data) => updateBookingData(data, 'booking-select-address')} onBack={exitBookingFlow} />;
                    break;
                case 'booking-select-address': 
                    screenToRender = <SelectAddressScreen user={user} bookingData={bookingData} onContinue={(data) => updateBookingData(data, 'booking-select-datetime')} onBack={() => setScreen('booking-service-detail')} />;
                    break;
                case 'booking-select-datetime': 
                    screenToRender = <SelectDateTimeScreen bookingData={bookingData} onContinue={(data) => updateBookingData(data, 'booking-summary')} onBack={() => setScreen('booking-select-address')} />;
                    break;
                case 'booking-summary': 
                    screenToRender = <BookingSummaryScreen bookingData={bookingData} user={user} onConfirm={handleConfirmBooking} onBack={() => setScreen('booking-select-datetime')} setScreen={setScreen} updateBookingData={updateBookingData} />;
                    break;
                case 'booking-promo':
                    screenToRender = <PromoScreen bookingData={bookingData} onBack={() => setScreen('booking-summary')} onSelectPromo={(promoId) => {
                        updateBookingData({ promoCode: promoId }, 'booking-summary');
                    }} />;
                    break;
                case 'booking-payment-method':
                    screenToRender = <SelectPaymentScreen bookingData={bookingData} onBack={() => setScreen('booking-summary')} onSelectPayment={(method) => {
                        updateBookingData({ paymentMethod: method }, 'booking-summary');
                    }} />;
                    break;
                 case 'momo-payment':
                    screenToRender = <MomoPaymentScreen bookingData={bookingData} onBack={() => setScreen('booking-summary')} onPaymentSuccess={handleConfirmBooking} />;
                    break;
                default:
                    // If the screen state is invalid, default to the first step to prevent errors.
                    screenToRender = <ServiceDetailScreen bookingData={bookingData} onContinue={(data) => updateBookingData(data, 'booking-select-address')} onBack={exitBookingFlow} />;
            }
            return screenToRender;
        }

        // Rating Flow Screens
        if (ratingBooking) {
            if (screen === 'rating') {
                return <RatingScreen 
                            booking={ratingBooking} 
                            onSubmit={handleFeedbackSubmit} 
                            onBack={() => setRatingBooking(null)} 
                        />;
            }
            if (screen === 'feedback-success') {
                return <FeedbackSuccessScreen onFinish={() => {
                    setRatingBooking(null);
                    setViewingBooking(null); 
                    setActiveTab('activity');
                    setScreen('dashboard');
                }} />;
            }
        }
        
        if (editingReviewForBooking) {
             return <EditReviewScreen 
                        booking={editingReviewForBooking} 
                        onSave={handleUpdateReview} 
                        onBack={() => setEditingReviewForBooking(null)}
                    />;
        }

        if (viewingTrackingForBooking) {
            return <TaskerTrackingScreen 
                        booking={viewingTrackingForBooking} 
                        onBack={() => setViewingTrackingForBooking(null)} 
                    />;
        }
        
        if (viewingBooking) {
            if (screen === 'review-detail') {
                return <ReviewDetailScreen 
                            booking={viewingBooking} 
                            onBack={() => setViewingBooking(null)} 
                            onEditReview={() => setEditingReviewForBooking(viewingBooking)}
                        />;
            }
            return <BookingDetailScreen 
                        booking={viewingBooking} 
                        onBack={() => setViewingBooking(null)} 
                        onCancelBooking={handleCancelBooking}
                        onTrackTasker={(b) => setViewingTrackingForBooking(b)}
                        onRateBooking={(b) => { setRatingBooking(b); setScreen('rating'); }}
                        onViewReviewDetails={() => setScreen('review-detail')}
                    />
        }

        // Other main app screens
        if (screen !== 'dashboard') {
            switch(screen) {
                case 'profile-view': return <ProfileViewScreen user={user} setUser={setUser} setScreen={setScreen} setEditingAddress={setEditingAddress} />;
                case 'profile-edit': return <ProfileEditScreen user={user} setUser={setUser} setScreen={setScreen} />;
                case 'address-form': return <AddressFormScreen addressToEdit={editingAddress} onSave={handleSaveAddress} onCancel={() => setScreen('profile-view')} />;
                default: setScreen('dashboard'); return null;
            }
        }

        const renderActiveTab = () => {
            switch(activeTab) {
                case 'home': return <HomeScreen user={user} onSelectService={handleSelectService}/>;
                case 'activity': return <ActivityScreen user={user} onViewDetails={(b) => { setViewingBooking(b); }} setActiveTab={setActiveTab} />;
                case 'notifications': return <NotificationScreen activityNotifications={activityNotifications} systemNotifications={systemNotifications} onViewNotification={handleViewNotification} />;
                case 'account': return <AccountScreen user={user} setScreen={setScreen} handleLogout={handleLogout} />;
                default: return <HomeScreen user={user} onSelectService={handleSelectService} />;
            }
        };

        return (
            <>
                {renderActiveTab()}
                <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} hasUnreadNotifications={hasUnreadNotifications} />
            </>
        );
    };

    return (
        <div style={isFullScreenAuth ? { fontFamily: styles.container.fontFamily } : styles.container}>
            {user ? renderMainApp() : renderAuthScreens()}
            <ConfirmationModal 
                isOpen={confirmation.isOpen}
                message={confirmation.message}
                onConfirm={confirmation.onConfirm}
                onCancel={closeConfirmation}
                confirmText={confirmation.confirmText}
                cancelText="Quay lại"
                confirmColor={confirmation.confirmColor}
            />
            <NotificationDetailModal 
                notification={viewingNotification}
                onClose={() => setViewingNotification(null)}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);