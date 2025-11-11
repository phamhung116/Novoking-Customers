import React from 'react';

// FIX: Export color constants to be used in other files.
export const PRIMARY_COLOR = '#972c2c'; // rgb(151, 44, 44)
// FIX: Exported color constant for use in other files.
export const PRIMARY_COLOR_LIGHT = 'rgba(151, 44, 44, 0.1)';
// FIX: Exported color constant for use in other files.
export const PRIMARY_COLOR_DARK = '#6d1f1f';
// FIX: Export color constants to be used in other files.
export const SECONDARY_COLOR = '#0a5c98'; // rgb(10, 92, 152)
// FIX: Exported color constant for use in other files.
export const MOMO_PRIMARY_COLOR = '#D82D8B';
// FIX: Exported color constant for use in other files.
export const MOMO_PRIMARY_DARK_COLOR = '#a9226c';
// FIX: Exported color constant for use in other files.
export const RATING_STAR_COLOR = '#ffdd56';


// FIX: Define common input style as a constant to avoid self-reference within the `styles` object.
const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#fff'
};

// FIX: Define common button styles as constants to avoid self-reference within the `styles` object.
const buttonBaseStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '15px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease, transform 0.1s ease, filter 0.1s ease'
};
const footerButtonBaseStyle: React.CSSProperties = {
    padding: '15px 20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: PRIMARY_COLOR,
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold'
};


// --- STYLES ---
export const styles: { [key: string]: React.CSSProperties } = {
    // General
    container: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh', position: 'relative', paddingBottom: '70px', boxSizing: 'border-box' },
    screenContent: { padding: '20px', backgroundColor: '#fff', minHeight: 'calc(100vh - 120px)' },
    
    // --- Typography & Headers ---
    header: { textAlign: 'center', color: '#333' },
    pageHeader: { display: 'flex', alignItems: 'center', marginBottom: '15px', backgroundColor: '#fff', padding: 'calc(10px + env(safe-area-inset-top)) 20px 10px 20px', margin: '-20px -20px 20px -20px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 },
    pageTitle: { flexGrow: 1, textAlign: 'center', margin: 0, fontSize: '18px', fontWeight: 'bold' },
    backButton: { background: 'none', border: 'none', color: '#333', cursor: 'pointer', fontSize: '24px' },
    pageHeaderActionButton: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: SECONDARY_COLOR },
    link: { color: SECONDARY_COLOR, cursor: 'pointer', textAlign: 'center', marginTop: '10px', display: 'block', fontWeight: '500' },
    error: { color: '#dc3545', fontSize: '14px', marginTop: '5px' },

    // --- Forms ---
    form: { display: 'flex', flexDirection: 'column' },
    formGroup: { marginBottom: '20px' },
    formLabel: { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', color: '#555', textTransform: 'uppercase' },
    input: inputBaseStyle,
    inputWithIcon: { paddingLeft: '45px' },
    select: { width: '100%', boxSizing: 'border-box', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '16px', backgroundColor: 'white' },
    inputReadOnly: { backgroundColor: '#f0f0f0', color: '#555' },
    inputWithIconContainer: { position: 'relative' },
    inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: '20px' },
    
    // Custom Checkbox
    checkboxContainer: { display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' },
    checkboxInput: { position: 'absolute', opacity: 0, cursor: 'pointer', height: 0, width: 0 },
    checkboxCheckmark: { height: '20px', width: '20px', backgroundColor: '#eee', borderRadius: '4px', border: '1px solid #ccc', display: 'inline-block', position: 'relative', marginRight: '10px' },
    checkboxLabel: { fontSize: '16px' },

    // --- Buttons ---
    button: buttonBaseStyle,
    buttonDisabled: { backgroundColor: '#cccccc', cursor: 'not-allowed' },
    buttonOutline: { padding: '12px 20px', border: `1px solid ${SECONDARY_COLOR}`, borderRadius: '8px', backgroundColor: 'transparent', color: SECONDARY_COLOR, fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
    
    // --- Welcome Screen Redesign ---
    welcomeContainer: { 
        height: '100vh', 
        position: 'relative',
        overflow: 'hidden', // Contain the animated background
    },
    welcomeBackgroundImage: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(https://www.hourmaid.com/wp-content/uploads/2019/01/deep-clean.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        animation: 'kenBurns 20s ease-out forwards',
    },
    welcomeOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(25, 25, 25, 0.4)',
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, transparent 60%)',
    },
    welcomeContentWrapper: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '25px',
        boxSizing: 'border-box'
    },
    welcomeBottom: {
        flexShrink: 0,
        textAlign: 'center',
        paddingBottom: '15px'
    },
    welcomeHeadline: {
        fontSize: '38px',
        fontWeight: 700,
        color: 'white',
        margin: '0 0 15px 0',
        textShadow: '0 2px 5px rgba(0,0,0,0.6)',
        letterSpacing: '0.5px',
        opacity: 0, // Initial state for animation
        animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
    },
    welcomeDescriptor: {
        fontSize: '17px',
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: '40px',
        lineHeight: 1.6,
        maxWidth: '350px',
        margin: '0 auto 40px auto',
        textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        opacity: 0, // Initial state for animation
        animation: 'fadeInUp 0.8s ease-out 1.0s forwards',
    },
    welcomeButton: {
        padding: '18px 20px',
        borderRadius: '10px',
        fontSize: '18px',
        width: '100%',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
        opacity: 0, // Initial state for animation
        animation: 'fadeInUp 0.8s ease-out 1.4s forwards, pulse 2.5s ease-in-out infinite 4s',
    },

    // --- NEW STYLES for Welcome Screen Logo/Title ---
    welcomeTop: {
        flexShrink: 0,
        textAlign: 'center',
        paddingTop: 'calc(60px + env(safe-area-inset-top))',
        opacity: 0, // Initial state for animation
        animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
    },
    welcomeLogo: {
        maxWidth: '120px',
        height: 'auto',
        marginBottom: '15px',
    },
    welcomeAppTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.95)',
        textShadow: '0 1px 4px rgba(0,0,0,0.6)',
        margin: 0,
        letterSpacing: '0.5px',
    },

    // --- Auth Screens Redesign ---
    authContainer: { display: 'flex', flexDirection: 'column', height: '100vh', padding: '20px' },
    authFormContainer: { padding: '20px', backgroundColor: '#fff' },
    authLogoContainer: { flexShrink: 0, textAlign: 'center', padding: '30px 0' },
    authLogo: { maxWidth: '200px', height: 'auto' },
    authContent: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    authFooter: { flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px 0' },
    
    // OTP
    otpContainer: { 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '2.5vw', 
        margin: '20px 0',
        maxWidth: '350px',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    otpInput: { 
        width: '13vw', 
        height: '13vw',
        maxWidth: '50px', 
        maxHeight: '50px',
        minWidth: '38px',
        minHeight: '38px',
        textAlign: 'center', 
        fontSize: '1.2rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    countdown: { textAlign: 'center', color: '#555', margin: '20px 0' },
    
    // Navigation
    navBar: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderTop: '1px solid #e0e0e0', zIndex: 1000, padding: '8px 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)' },
    navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#888', gap: '4px' },
    navItemActive: { color: PRIMARY_COLOR },
    navItemIcon: { width: '24px', height: '24px' },
    navItemLabel: { fontSize: '11px', fontWeight: '500' },
    notificationBadge: { position: 'absolute', top: '-2px', right: '-4px', width: '8px', height: '8px', backgroundColor: PRIMARY_COLOR, borderRadius: '50%', border: '1.5px solid white' },
    
    // Profile & Account
    accountListItem: { display: 'flex', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' },
    accountListText: { flexGrow: 1, marginLeft: '15px' },
    
    // Address
    addressItem: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer', backgroundColor: 'white' },
    addressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    
    // --- Booking Flow Redesign ---
    stepperContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px', backgroundColor: '#fff', borderBottom: '1px solid #eee' },
    step: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'},
    stepCircle: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#fff', color: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', border: '2px solid #ccc', transition: 'all 0.3s ease' },
    stepCircleActive: { backgroundColor: PRIMARY_COLOR, color: 'white', borderColor: PRIMARY_COLOR },
    stepCircleCompleted: { backgroundColor: PRIMARY_COLOR, color: 'white', borderColor: PRIMARY_COLOR },
    stepLabel: { fontSize: '12px', marginTop: '8px', color: '#888', fontWeight: '500', maxWidth: '70px' },
    stepLabelActive: { color: '#333', fontWeight: 'bold' },
    stepperLine: { flex: 1, height: '2px', backgroundColor: '#ccc', margin: '0 10px', marginBottom: '30px', transition: 'background-color 0.3s ease' },
    stepperLineCompleted: { backgroundColor: PRIMARY_COLOR },
    packageOption: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer'},
    packageOptionSelected: { borderColor: PRIMARY_COLOR, borderWidth: '2px', backgroundColor: PRIMARY_COLOR_LIGHT },

    // Date/Time Picker Redesign
    dateTimeSectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    dateTimeSectionTitle: { margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '15px' },
    dateTimeMonthYear: { fontWeight: 'bold', color: '#555' },
    datePickerContainer: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0', scrollbarWidth: 'none' },
    datePickerPill: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '56px', height: '72px', borderRadius: '16px', border: '1px solid #eee', backgroundColor: '#f9f9f9', cursor: 'pointer', userSelect: 'none', transition: 'all 0.2s ease' },
    datePickerPillSelected: { backgroundColor: PRIMARY_COLOR, color: 'white', borderColor: PRIMARY_COLOR, boxShadow: `0 4px 15px ${PRIMARY_COLOR_LIGHT}` },
    dateItemDayOfWeek: { fontWeight: 'bold', fontSize: '14px' },
    dateItemDayOfMonth: { fontSize: '18px', marginTop: '4px', fontWeight: 'bold' },
    timePickerCard: { display: 'inline-flex', alignItems: 'center', padding: '10px 16px', borderRadius: '14px', backgroundColor: '#f9f9f9', border: '1px solid #eee' },
    timePickerCardIcon: { fontSize: '22px', color: SECONDARY_COLOR, marginRight: '10px' },
    timePickerCardText: { display: 'flex', alignItems: 'center', gap: '5px' },
    timeSelectModern: { padding: '8px 2px', border: 'none', fontSize: '18px', fontWeight: 'bold', backgroundColor: 'transparent', appearance: 'none', cursor: 'pointer' },
    notesTextareaModern: {
        ...inputBaseStyle,
        resize: 'vertical',
        borderRadius: '12px',
        backgroundColor: '#fff',
        border: '1px solid #f0f0f0',
        minHeight: '120px',
        transition: 'border-color 0.2s ease',
        padding: '15px',
        paddingBottom: '30px',
    },
    
    // Fixed Footer
    fixedFooter: { position: 'fixed', bottom: 0, left: 0, right: 0, padding: '15px 20px', backgroundColor: '#fff', borderTop: '1px solid #eee', boxShadow: '0 -2px 5px rgba(0,0,0,0.05)', zIndex: 100 },
    footerButton: footerButtonBaseStyle,
    
    // --- Modals ---
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', zIndex: 2000 },
    modalContent: { backgroundColor: 'white', width: '100%', maxWidth: '480px', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '20px', maxHeight: '80vh', overflowY: 'auto', boxSizing: 'border-box' },
    modalHeader: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' },
    modalListItem: { display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0', fontSize: '16px' },
    modalListIcon: { color: SECONDARY_COLOR, marginRight: '15px', fontSize: '18px' },
    modalCloseButton: { padding: '12px 20px', border: 'none', borderRadius: '8px', backgroundColor: '#f0f0f0', color: '#333', fontSize: '16px', cursor: 'pointer', width: '100%', marginTop: '20px', fontWeight: 'bold' },
    
    // Job Details Button on Service Screen
    detailsButton: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderRadius: '8px', backgroundColor: '#f7f7f7', border: '1px solid #eee', cursor: 'pointer', marginTop: '20px' },
    detailsButtonText: { display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' },
    detailsButtonIcon: { color: SECONDARY_COLOR, fontSize: '20px' },

    // Booking Summary
    bookingSummaryIcon: { fontSize: '20px', color: SECONDARY_COLOR, width: '24px', marginRight: '15px', textAlign: 'center' },
    bookingSummaryChangeButton: { backgroundColor: 'white', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}`, borderRadius: '20px', padding: '6px 16px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', marginLeft: '10px' },

    // --- Screen Specific Redesigns ---
    // HomeScreen
    homeHeaderContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'calc(15px + env(safe-area-inset-top)) 20px 15px 20px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(249, 249, 249, 0.8)', backdropFilter: 'blur(10px)' },
    homeHeaderLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    homeAvatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: '#aaa', border: '2px solid white' },
    homeGreetingContainer: { display: 'flex', flexDirection: 'column' },
    homeGreeting: { margin: 0, fontSize: '14px', color: '#666' },
    homeUserName: { margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' },
    homeSearchContainer: { padding: '0 20px 15px 20px', position: 'relative' },
    homeSearchInput: { width: '100%', boxSizing: 'border-box', padding: '15px 20px 15px 50px', border: '1px solid #eee', borderRadius: '16px', fontSize: '16px', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' },
    homeSearchIcon: { position: 'absolute', left: '38px', top: '24px', transform: 'translateY(-50%)', color: '#aaa', fontSize: '20px' },
    homeQuickActionsContainer: { display: 'flex', gap: '10px', overflowX: 'auto', padding: '0 20px 20px 20px', scrollbarWidth: 'none' },
    homeQuickActionChip: { padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '20px', fontSize: '14px', color: '#555', cursor: 'pointer', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
    homeServiceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', padding: '0 20px 20px 20px', position: 'relative', zIndex: 2 },
    serviceCard: { backgroundColor: 'white', borderRadius: '18px', padding: '15px 10px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'transform 0.2s ease, box-shadow 0.2s ease', minHeight: '100px', userSelect: 'none' },
    serviceCardIcon: { width: '36px', height: '36px', color: SECONDARY_COLOR },
    serviceCardLabel: { fontSize: '13px', fontWeight: '500', color: '#333', lineHeight: 1.3 },
    homeSectionTitle: { fontSize: '20px', fontWeight: 'bold', color: '#333', padding: '0 20px', marginTop: '10px', marginBottom: '15px' },

    // Profile View
    profileViewHeader: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 20px', margin: '-20px -20px 0 -20px', borderBottom: '1px solid #eee', position: 'relative' },
    profileViewTitle: { margin: 0, fontSize: '18px', fontWeight: 'bold' },
    profileViewUserInfoSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0', borderBottom: '1px solid #f0f0f0', marginBottom: '20px' },
    profileAvatar: { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', color: '#aaa', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    profileViewUserName: { margin: '15px 0 5px 0', fontSize: '20px', fontWeight: 'bold' },
    profileViewUserPhone: { margin: 0, color: '#666', fontSize: '16px' },
    profileViewEditIcon: { background: 'none', border: 'none', cursor: 'pointer', color: SECONDARY_COLOR, fontSize: '20px', padding: '5px' },
    profileViewAddressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    profileViewAddressTitle: { fontSize: '16px', fontWeight: 'bold', color: '#333', margin: 0 },
    profileViewAddNewAddressButton: { padding: '6px 16px', fontSize: '14px', borderRadius: '20px' },
    profileViewAddressCard: { backgroundColor: 'white', borderRadius: '12px', padding: '15px', marginBottom: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: '15px' },
    profileViewAddressIcon: { color: SECONDARY_COLOR, fontSize: '24px', marginTop: '2px' },
    profileViewAddressContent: { flex: 1 },
    profileViewAddressText: { margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' },
    profileViewAddressPhone: { margin: 0, color: '#777' },
    profileViewDefaultBadge: { backgroundColor: PRIMARY_COLOR_LIGHT, color: PRIMARY_COLOR, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
    
    // --- Redesigned Payment & Promo Screens ---
    paymentOptionCard: { display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '12px', marginBottom: '15px', cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s ease' },
    paymentOptionCardSelected: { borderColor: PRIMARY_COLOR, borderWidth: '2px', backgroundColor: PRIMARY_COLOR_LIGHT },
    paymentOptionIcon: { width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    paymentOptionText: { fontSize: '18px', fontWeight: 'bold', flex: 1 },
    paymentOptionCheckmark: { fontSize: '24px', color: PRIMARY_COLOR },
    
    promoOptionCard: { display: 'flex', alignItems: 'center', gap: '25px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px', marginBottom: '15px', cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' },
    promoOptionCardSelected: { borderColor: PRIMARY_COLOR, borderWidth: '2px', backgroundColor: PRIMARY_COLOR_LIGHT },
    promoOptionIcon: { width: '32px', height: '32px', color: SECONDARY_COLOR, flexShrink: 0 },
    promoOptionContent: { flex: 1 },
    promoOptionCode: { fontSize: '16px', fontWeight: 'bold', margin: '0 0 5px 0' },
    promoOptionDesc: { fontSize: '14px', color: '#666', margin: 0 },
    promoOptionPerforatedEdge: { position: 'absolute', left: '62px', top: 0, bottom: 0, width: '2px', background: 'repeating-linear-gradient(0deg, #ddd, #ddd 5px, transparent 5px, transparent 10px)'},

    // Momo Payment Screen
    momoScreenContainer: { backgroundColor: MOMO_PRIMARY_COLOR, minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column' },
    momoHeader: { padding: 'calc(15px + env(safe-area-inset-top)) 20px 15px 20px', display: 'flex', alignItems: 'center', backgroundColor: MOMO_PRIMARY_DARK_COLOR },
    momoHeaderTitle: { flex: 1, textAlign: 'center', fontSize: '18px', fontWeight: 'bold', paddingRight: '24px' },
    momoBackButton: { background: 'none', border: 'none', color: 'white', fontSize: '28px', cursor: 'pointer' },
    momoContent: { flex: 1, padding: '20px', backgroundColor: '#fff', color: '#333', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', textAlign: 'center' },
    momoQrContainer: { marginTop: '20px', padding: '10px', border: '3px solid #eee', borderRadius: '8px', display: 'inline-block' },
    momoQrCode: { width: '200px', height: '200px' },
    momoInfoBox: { marginTop: '30px', backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'left' },
    momoInfoRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' },
    momoInfoLabel: { color: '#666' },
    momoInfoValue: { fontWeight: 'bold' },
    momoTotalValue: { fontWeight: 'bold', color: MOMO_PRIMARY_COLOR, fontSize: '20px' },
    momoTimerBox: { marginTop: '20px', backgroundColor: 'rgba(216, 45, 139, 0.1)', padding: '15px', borderRadius: '12px', textAlign: 'center' },
    momoTimerLabel: { fontSize: '14px', color: MOMO_PRIMARY_COLOR },
    momoTimerValueContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' },
    momoTimerDigitBox: { backgroundColor: MOMO_PRIMARY_COLOR, color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '20px', fontWeight: 'bold', minWidth: '30px' },
    momoReturnLink: { marginTop: '30px', fontSize: '14px', color: MOMO_PRIMARY_COLOR, fontWeight: 'bold', cursor: 'pointer' },
    
    // Activity / Booking List (Deprecated, use new styles)
    bookingItem: { padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer', backgroundColor: 'white' },
    bookingStatus: { padding: '3px 8px', borderRadius: '10px', fontSize: '12px', color: 'white' },
    
    // --- Activity Screen Redesign ---
    activityScreenContainer: { backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - 70px)' },
    activityHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'calc(15px + env(safe-area-inset-top)) 20px 20px 20px', position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#f9f9f9' },
    activityTitle: { color: '#333', textAlign: 'left', margin: 0, fontSize: '28px', fontWeight: 'bold' },
    filterButton: { background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    filterButtonIcon: { width: '24px', height: '24px', color: '#555' },

    // New Booking Card Styles
    activityBookingCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
        cursor: 'pointer',
        transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        userSelect: 'none',
    },
    activityBookingCardPressed: {
        transform: 'scale(0.98)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    },
    activityCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    activityCardTitle: { margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' },
    activityCardStatusChip: { padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
    activityCardInfoRow: { display: 'flex', alignItems: 'center', gap: '10px', color: '#555', marginTop: '8px' },
    activityCardInfoIcon: { fontSize: '16px', color: '#888' },
    activityCardInfoText: { fontSize: '14px' },
    
    // Activity Filter Modal Redesign
    filterModalContent: { 
        backgroundColor: 'white', 
        width: '100%', 
        maxWidth: '480px', 
        borderTopLeftRadius: '20px', 
        borderTopRightRadius: '20px', 
        padding: '10px 20px 100px 20px',
        maxHeight: '85vh', 
        overflowY: 'auto', 
        boxSizing: 'border-box',
        boxShadow: '0 -5px 20px rgba(0,0,0,0.1)',
        animation: 'slideUp 0.3s ease-out forwards'
    },
    filterModalHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '20px',
        position: 'relative'
    },
    filterModalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0
    },
    filterModalCloseButton: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#f0f0f0',
        border: 'none',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#555',
        lineHeight: '1'
    },
    filterModalSection: { marginBottom: '30px' },
    filterModalSectionTitle: { 
        fontSize: '13px', 
        fontWeight: '600', 
        color: '#666', 
        marginBottom: '15px', 
        textTransform: 'uppercase', 
        letterSpacing: '0.5px' 
    },
    filterModalOptionsContainer: { display: 'flex', flexWrap: 'wrap', gap: '12px' },
    filterModalOption: { 
        padding: '8px 16px', 
        borderRadius: '20px', 
        backgroundColor: '#f0f0f0', 
        color: '#333', 
        cursor: 'pointer', 
        border: '1px solid #f0f0f0',
        transition: 'all 0.2s ease', 
        fontSize: '14px',
        fontWeight: '500'
    },
    filterStatusOptionSelected: {
        backgroundColor: 'rgba(10, 92, 152, 0.1)', 
        color: SECONDARY_COLOR, 
        fontWeight: '600', 
        borderColor: 'rgba(10, 92, 152, 0.3)'
    },
    filterSortOptionSelected: {
        backgroundColor: PRIMARY_COLOR_LIGHT, 
        color: PRIMARY_COLOR, 
        fontWeight: '600', 
        borderColor: 'rgba(151, 44, 44, 0.3)'
    },
    filterModalActions: { 
        display: 'flex', 
        gap: '10px', 
        padding: '15px 20px', 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderTop: '1px solid #f0f0f0'
    },
    filterModalResetButton: {
        flex: 1,
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        color: '#333',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease'
    },
    filterModalApplyButton: {
        flex: 2,
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: PRIMARY_COLOR,
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease'
    },

    // Activity Screen Empty State
    activityEmptyStateContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 'calc(100vh - 200px)', padding: '20px' },
    activityEmptyStateIllustration: { width: '100px', height: '100px', marginBottom: '20px' },
    activityEmptyStateTitle: { fontSize: '20px', fontWeight: 'bold', color: '#333', margin: '0 0 10px 0' },
    activityEmptyStateSubtitle: { fontSize: '16px', color: '#666', marginBottom: '30px', maxWidth: '300px' },
    
    // --- NEW STYLES for Logout Success Screen ---
    logoutSuccessContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        paddingTop: 'calc(20px + env(safe-area-inset-top))',
        boxSizing: 'border-box'
    },
    logoutSuccessContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    logoutSuccessIconContainer: {
        width: '100px',
        height: '100px',
        marginBottom: '30px',
    },
    logoutSuccessIcon: {
        width: '100px',
        height: '100px',
    },
    logoutSuccessTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        margin: '0 0 10px 0',
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out 0.8s forwards',
    },
    logoutSuccessSubtitle: {
        fontSize: '16px',
        color: '#666',
        lineHeight: 1.5,
        margin: 0,
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out 1.0s forwards',
    },
    logoutSuccessFooter: {
        flexShrink: 0,
        paddingBottom: '20px',
    },
    logoutSuccessButton: {
        padding: '16px 20px',
        fontSize: '18px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(151, 44, 44, 0.2)',
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out 1.2s forwards',
    },
    logoutSuccessLogo: {
        display: 'block',
        margin: '30px auto 0 auto',
        maxWidth: '120px',
        opacity: 0,
        filter: 'grayscale(1) opacity(0.5)',
        animation: 'fadeInUp 0.6s ease-out 1.4s forwards',
    },
    
    // Other inherited styles for brevity...
    summaryGroup: { marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' },
    summaryLabel: { fontWeight: 'bold', color: '#555', marginBottom: '8px' },
    summaryValue: { color: '#333' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    totalRow: { fontWeight: 'bold', fontSize: '18px', color: PRIMARY_COLOR },
    bookingSummarySectionTitle: { fontSize: '20px', fontWeight: 'bold', color: '#333', margin: '25px 0 10px 0' },
    bookingSummaryCard: { backgroundColor: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
    bookingSummaryRow: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
    bookingSummaryContent: { flex: 1 },
    bookingSummaryMainText: { fontWeight: 'bold', fontSize: '16px', color: '#333' },
    bookingSummarySubText: { color: '#666', fontSize: '14px', marginTop: '4px' },
    bookingSummarySubSectionTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' },
    bookingSummaryDetailRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#555' },
    bookingSummaryJobItemContainer: { paddingTop: '15px', marginTop: '15px', borderTop: '1px solid #f0f0f0' },
    bookingSummaryJobItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    bookingSummaryJobDetails: { paddingLeft: '15px', borderLeft: '2px solid #eee' },
    bookingSummaryJobPackage: { color: '#888', fontSize: '14px', marginTop: '4px' },
    bookingSummaryPaymentContainer: { display: 'flex', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' },
    bookingSummaryPaymentOption: { flex: 1, padding: '20px 15px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '16px', fontWeight: '500' },
    bookingSummaryTotalContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' },
    bookingSummaryTotalLabel: { fontSize: '18px', fontWeight: 'bold' },
    bookingSummaryTotalValue: { fontSize: '22px', fontWeight: 'bold', color: PRIMARY_COLOR },
    contactModalHeader: { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' },
    contactModalClose: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', lineHeight: 1, padding: '0 5px' },

    // --- NEW STYLES FOR REGISTER SCREEN ---
    // Progress Bar
    progressBarContainer: { width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', height: '8px', overflow: 'hidden', marginBottom: '30px' },
    progressBar: { height: '100%', backgroundColor: SECONDARY_COLOR, borderRadius: '5px', transition: 'width 0.4s ease-in-out' },
    
    // Form Steps
    formStepContainer: { overflow: 'hidden', position: 'relative' },
    formStep: { display: 'flex', width: '200%', transition: 'transform 0.4s ease-in-out' },
    formStepContent: { width: '50%', padding: '0 5px', boxSizing: 'border-box' },
    stepTitle: { fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '25px', textAlign: 'center' },

    // Floating Label Inputs
    floatingInputContainer: { position: 'relative', marginBottom: '35px' },
    floatingInput: {
        fontSize: '16px',
        padding: '10px 0',
        display: 'block',
        width: '100%',
        border: 'none',
        borderBottom: '1px solid #ccc',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.2s ease, border-width 0.2s ease',
    },
    floatingLabel: {
        color: '#999',
        fontSize: '16px',
        fontWeight: 'normal',
        position: 'absolute',
        pointerEvents: 'none',
        left: '0px',
        top: '10px',
        transition: '0.2s ease all',
    },
    floatingInputFocus: {
        borderBottomColor: SECONDARY_COLOR,
        borderBottomWidth: '2px',
    },
    floatingInputError: { borderBottomColor: PRIMARY_COLOR },
    floatingLabelError: { color: PRIMARY_COLOR },
    inputErrorIcon: {
        color: PRIMARY_COLOR,
        position: 'absolute',
        right: '0px',
        top: '10px',
        fontWeight: 'bold'
    },
    floatingLabelActive: {
         top: '-20px',
        fontSize: '12px',
        color: SECONDARY_COLOR,
    },
     floatingLabelSelect: {
        top: '-20px',
        fontSize: '12px',
        color: '#999',
    },
    
    // Success Modal
    successModalContent: {
        backgroundColor: 'white',
        padding: '30px 40px',
        borderRadius: '16px',
        textAlign: 'center',
        width: '90%',
        maxWidth: '350px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transform: 'scale(1)',
        opacity: 1,
    },
    successModalIconContainer: {
        margin: '0 auto 20px auto',
        width: '80px',
        height: '80px',
    },
    successModalIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'block',
        strokeWidth: 2,
        stroke: '#4CAF50',
        strokeMiterlimit: 10,
        boxShadow: 'inset 0px 0px 0px #4CAF50',
    },
    successModalIconCircle: {
        strokeDasharray: '166',
        strokeDashoffset: '166',
        strokeWidth: 2,
        strokeMiterlimit: 10,
        stroke: '#4CAF50',
        fill: 'none',
    },
    successModalIconCheck: {
        transformOrigin: '50% 50%',
        strokeDasharray: '48',
        strokeDashoffset: '48',
    },
    successModalTitle: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    successModalText: {
        fontSize: '16px',
        color: '#666',
        lineHeight: 1.5,
    },

    // --- NEW STYLES FOR CONTACT SUPPORT MODAL ---
    contactModalOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        marginBottom: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    },
    contactModalOptionDisabled: {
        cursor: 'not-allowed',
        backgroundColor: '#f0f0f0',
        color: '#aaa',
    },
    contactModalOptionIcon: {
        fontSize: '24px',
        color: SECONDARY_COLOR,
    },
    contactModalOptionText: {
        fontWeight: 'bold',
        color: '#333',
    },
    contactModalDisabledText: {
        fontSize: '12px',
        color: '#777',
        fontWeight: 'normal',
        margin: '4px 0 0 0',
        lineHeight: 1.4,
    },

    // --- NEW STYLES for Booking Detail Screen Overhaul ---
    bookingDetailCard: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid #f0f0f0',
    },
    bookingDetailStatusChip: {
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        display: 'inline-block',
    },
    bookingDetailId: {
        marginTop: '10px',
        color: '#555',
        fontSize: '14px',
        textAlign: 'center'
    },
    bookingDetailIdCode: {
        fontWeight: 'bold',
        color: '#333',
        letterSpacing: '1px'
    },
    bookingDetailSection: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
    },
    bookingDetailIcon: {
        fontSize: '22px',
        color: SECONDARY_COLOR,
        marginTop: '2px',
        width: '24px',
        textAlign: 'center',
        flexShrink: 0,
    },
    bookingDetailContent: {
        flex: 1,
    },
    bookingDetailTitle: {
        margin: 0,
        fontSize: '13px',
        fontWeight: '500',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '6px'
    },
    bookingDetailText: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },

    // Payment Details
    paymentBreakdownRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '15px',
        color: '#555',
        marginBottom: '12px'
    },
    paymentBreakdownDivider: {
        height: '1px',
        backgroundColor: '#f0f0f0',
        margin: '15px 0'
    },
    paymentBreakdownTotalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentBreakdownTotalLabel: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    paymentBreakdownTotalValue: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    paymentMethodRow: {
        marginTop: '15px',
        paddingTop: '15px',
        borderTop: '1px solid #f0f0f0',
        fontSize: '15px',
        color: '#555'
    },

    // Timeline
    timelineContainer: {
        position: 'relative',
        padding: '10px 0 0 0',
    },
    timelineItem: {
        display: 'flex',
        position: 'relative',
        paddingLeft: '30px',
        paddingBottom: '25px',
    },
    timelineItemClickable: {
        cursor: 'pointer',
    },
    timelineConnector: {
        position: 'absolute',
        left: '7px',
        top: '12px',
        width: '2px',
        height: 'calc(100% - 5px)',
        backgroundColor: '#e0e0e0',
    },
    timelineDot: {
        position: 'absolute',
        left: 0,
        top: '5px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        border: '3px solid white',
        zIndex: 1,
        boxShadow: '0 0 0 1px #e0e0e0'
    },
    timelineDotActive: {
        backgroundColor: SECONDARY_COLOR,
    },
    timelinePulse: {
        animation: 'pulseAnimation 2s infinite cubic-bezier(0.4, 0, 0.6, 1)',
    },
    timelineContent: {
        flex: 1
    },
    timelineTitle: {
        margin: 0,
        fontWeight: '600',
        color: '#333',
        fontSize: '15px'
    },
    timelineTimestamp: {
        margin: '4px 0 0 0',
        fontSize: '13px',
        color: '#777'
    },
    timelineActionLink: {
        margin: '8px 0 0 0',
        fontSize: '14px',
        color: SECONDARY_COLOR,
        fontWeight: '600',
        cursor: 'pointer',
    },

    // Support Button
    supportButton: {
        ...buttonBaseStyle,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        color: '#333',
    },
    cancelBookingButton: {
        ...footerButtonBaseStyle,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
    },
    buttonPressed: {
        transform: 'scale(0.98)',
        filter: 'brightness(0.9)',
    },

    // --- NEW STYLES for Tasker Tracking ---
    trackingMapContainer: {
        position: 'relative',
        height: '200px',
        backgroundColor: '#e9e9e9',
        borderRadius: '12px',
        overflow: 'hidden',
        marginTop: '15px',
        background: 'url(https://lh3.googleusercontent.com/gg/AIJ2gl-By-K1M_vXRAMjBe-Xs9uw_zfA1go8K7xayVYVNQaSEe0LRVyUrNqKs8Q9z0BZw-9rNCXVqm5r9k6fXN7Yy6JevsILIwGD1M9O0JHeDB3AXEot_L3qrGRfyZvvqqd_i4bhG0bXL6jAlaI_y_EMjAtylkovTm5U9BvzPrEhPJE9t9nRf8eR4I8r2BKVz6bq0Y9Acg54azgVh13PrwhLkRhvk9rjZk3d9LcF-Fdkwab9fTHzJVMRqRQ9m71YyVJwOh0UZ_Vd89Sd2KxeusSYCMiG3dx0tf-clyAHXhsKlUo5iNOVHVQ_jgObj2xJNStD4OMXBrEsZmHz8vknPJ47TMuv=s1024-rj)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
    },
    trackingMapArrived: {
        background: 'url(https://i.imgur.com/BnzrRSf.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    mapPin: {
        position: 'absolute',
        width: '30px',
        height: '30px',
        transform: 'translate(-50%, -100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskerPin: {
        backgroundColor: SECONDARY_COLOR,
        borderRadius: '50% 50% 50% 0',
        transform: 'translate(-50%, -100%) rotate(-45deg)',
        width: '28px',
        height: '28px',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        border: '2px solid white',
        transition: 'left 1s linear, top 1s linear',
    },
    destinationPin: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        border: '3px solid white',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        transform: 'translate(-50%, -50%)',
    },
    taskerInfoCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    taskerAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: '#aaa',
        flexShrink: 0,
        objectFit: 'cover',
    },
    taskerDetails: {
        flex: 1,
    },
    taskerName: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: '16px',
    },
    taskerRating: {
        margin: '4px 0 0 0',
        color: '#666',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    taskerContactButtons: {
        display: 'flex',
        gap: '10px'
    },
    taskerContactButton: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #ddd',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    trackingStatusCard: {
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #eee',
    },
    etaText: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        margin: '0 0 5px 0'
    },
    etaLabel: {
        fontSize: '14px',
        color: '#555'
    },

    // --- NEW STYLES for Chat Screen ---
    chatScreenContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f9f9f9', // Light background for the whole screen
    },
    chatHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: 'calc(10px + env(safe-area-inset-top)) 20px 10px 20px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #eee',
        flexShrink: 0,
    },
    chatHeaderTitleContainer: {
        flexGrow: 1,
        textAlign: 'center',
        paddingRight: '24px' // Spacer for the right icon
    },
    chatHeaderTitle: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    chatHeaderStatus: {
        margin: '2px 0 0 0',
        fontSize: '13px',
        color: '#28a745', // Green for online
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
    },
    chatHeaderStatusDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#28a745',
    },
    chatHeaderAction: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '22px',
        color: '#333',
    },
    chatContentArea: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 15px',
    },
    chatMessageRow: {
        display: 'flex',
        marginBottom: '10px',
        gap: '10px',
        alignItems: 'flex-end',
    },
    chatMessageAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        color: '#aaa',
        flexShrink: 0,
    },
    chatMessageBubble: {
        padding: '10px 15px',
        borderRadius: '18px',
        maxWidth: '75%',
        lineHeight: 1.5,
        fontSize: '15px',
    },
    chatMessageContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    chatMessageTasker: {
        backgroundColor: '#fff',
        border: '1px solid #eee',
        borderBottomLeftRadius: '4px',
        color: '#333',
    },
    chatMessageUser: {
        backgroundColor: SECONDARY_COLOR,
        borderBottomRightRadius: '4px',
        color: 'white',
        marginLeft: 'auto', // Align to the right
    },
    chatMessageTimestamp: {
        fontSize: '11px',
        color: '#999',
        marginTop: '6px',
    },
    chatInputBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 15px',
        backgroundColor: '#fff',
        borderTop: '1px solid #eee',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
    },
    chatInputAttachments: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#555',
    },
    chatInputField: {
        flex: 1,
        border: 'none',
        padding: '10px 15px',
        borderRadius: '20px',
        backgroundColor: '#f0f0f0',
        fontSize: '15px',
        outline: 'none',
    },
    chatInputSendButton: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        background: '#f44336',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        transition: 'transform 0.1s ease, background-color 0.2s ease',
    },
    chatInputSendButtonDisabled: {
        backgroundColor: '#972c2c',
        cursor: 'not-allowed',
    },

    // --- NEW STYLES for Address Form Redesign ---
    addressFormInputContainer: {
        position: 'relative',
        marginBottom: '25px',
    },
    addressFormInput: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px 12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        outline: 'none',
    },
    addressFormInputFocused: {
        borderColor: SECONDARY_COLOR,
        boxShadow: `0 0 0 3px rgba(10, 92, 152, 0.1)`,
    },
    addressFormLabel: {
        position: 'absolute',
        top: '-10px',
        left: '10px',
        backgroundColor: '#fff', // to cut through the border
        padding: '0 5px',
        fontSize: '12px',
        color: '#666',
        transition: 'color 0.2s ease',
        pointerEvents: 'none',
    },
    addressFormLabelFocused: {
        color: SECONDARY_COLOR,
    },
    addressFormInputReadOnly: {
        backgroundColor: '#f5f5f5',
        color: '#777',
        cursor: 'not-allowed',
    },
    addressFormSelectChevron: {
        position: 'absolute',
        right: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#888',
        pointerEvents: 'none',
    },
    modernCheckboxContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '10px 0'
    },
    modernCheckboxBox: {
        width: '22px',
        height: '22px',
        border: '2px solid #ccc',
        borderRadius: '6px',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
    },
    modernCheckboxBoxChecked: {
        backgroundColor: PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
        transform: 'scale(1.05)',
    },
    modernCheckboxCheckmark: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        transition: 'opacity 0.1s ease',
        opacity: 0,
    },
    modernCheckboxCheckmarkVisible: {
        opacity: 1,
    },
    modernCheckboxLabel: {
        fontSize: '16px',
    },
    wardModalSearchInput: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '12px 15px',
        border: '1px solid #eee',
        borderRadius: '8px',
        fontSize: '16px',
        marginBottom: '15px',
        outline: 'none',
    },
    wardModalList: {
        maxHeight: '40vh',
        overflowY: 'auto',
    },
    wardModalListItem: {
        padding: '15px 10px',
        borderBottom: '1px solid #f0f0f0',
        cursor: 'pointer',
        fontSize: '16px',
    },
    
    // --- NEW STYLES for Booking Success Screen ---
    bookingSuccessContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        boxSizing: 'border-box',
        animation: 'bookingSuccessFadeIn 0.5s ease-out, bookingSuccessScaleUp 0.5s ease-out',
    },
    bookingSuccessCheckmarkContainer: {
        width: '80px',
        height: '80px',
        marginBottom: '20px',
    },
    bookingSuccessCheckmarkSvg: {
        width: '100%',
        height: '100%',
    },
    checkmarkCircle: {
        strokeDasharray: 166,
        strokeDashoffset: 166,
        strokeWidth: 2,
        stroke: '#4CAF50',
        fill: 'none',
        animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
    },
    checkmarkCheck: {
        strokeDasharray: 48,
        strokeDashoffset: 48,
        strokeWidth: 3,
        strokeLinecap: 'round',
        stroke: '#4CAF50',
        fill: 'none',
        animation: 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards',
    },
    bookingSuccessTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0 0 10px 0',
        opacity: 0,
        animation: 'fadeInUp 0.5s ease-out 0.6s forwards',
    },
    bookingSuccessSubtitle: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '30px',
        maxWidth: '320px',
        textAlign: 'center',
        lineHeight: 1.5,
        opacity: 0,
        animation: 'fadeInUp 0.5s ease-out 0.8s forwards',
    },
    bookingSuccessSummaryCard: {
        width: '100%',
        maxWidth: '380px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0',
    },
    bookingSuccessSummaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #f5f5f5',
        opacity: 0,
        animation: 'fadeInUp 0.5s ease-out forwards',
    },
    bookingSuccessTotalValue: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        fontSize: '18px',
    },
    bookingSuccessButton: {
        padding: '16px 20px',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: PRIMARY_COLOR,
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '380px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease, transform 0.1s ease, filter 0.1s ease, box-shadow 0.2s ease',
        marginTop: '30px',
        boxShadow: `0 8px 20px rgba(151, 44, 44, 0.25)`,
        opacity: 0,
        animation: 'fadeInUp 0.5s ease-out 1.2s forwards',
    },

    // --- NEW STYLES for Rating & Feedback Flow ---
    ratingTaskerCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        marginBottom: '20px',
    },
    ratingTaskerAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#e0e0e0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: '#aaa',
        flexShrink: 0,
        objectFit: 'cover',
    },
    ratingTaskerName: {
        margin: 0,
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#333',
    },
    ratingTaskerService: {
        margin: '4px 0 0 0',
        color: '#666',
        fontSize: '14px',
    },
    ratingStarsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        margin: '30px 0 15px 0',
    },
    ratingStar: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out',
    },
    ratingDescriptor: {
        textAlign: 'center',
        minHeight: '24px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: RATING_STAR_COLOR,
        transition: 'opacity 0.2s ease-in-out',
    },
    feedbackSection: {
        maxHeight: '0px',
        opacity: 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out, margin-top 0.5s ease-in-out',
        marginTop: '0px',
    },
    feedbackSectionVisible: {
        maxHeight: '1000px',
        opacity: 1,
        marginTop: '40px',
    },
    feedbackTagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    feedbackTag: {
        padding: '8px 16px',
        borderRadius: '20px',
        backgroundColor: '#fff',
        color: '#333',
        cursor: 'pointer',
        border: '1px solid #ddd',
        transition: 'all 0.2s ease',
        fontSize: '14px',
        fontWeight: '500',
    },
    feedbackTagSelected: {
        backgroundColor: `rgba(10, 92, 152, 0.1)`, 
        color: SECONDARY_COLOR, 
        fontWeight: '600', 
        borderColor: SECONDARY_COLOR,
    },
    feedbackCharCounter: {
        fontSize: '12px',
        color: '#999',
    },
    feedbackImageUploadContainer: {
        marginTop: '20px',
    },
    fileUploadButton: {
        ...buttonBaseStyle,
        backgroundColor: PRIMARY_COLOR_LIGHT,
        border: 'none',
        color: PRIMARY_COLOR,
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
    },

    // --- NEW STYLES for Review Summary & Detail ---
    reviewSummaryCard: {
        ...buttonBaseStyle,
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid #f0f0f0',
        display: 'block',
        textAlign: 'left',
        color: '#333'
    },
    reviewSummaryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    reviewSummaryStars: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: 'bold',
        fontSize: '16px',
        color: RATING_STAR_COLOR,
    },
    reviewSummaryStarIcon: {
        width: '20px',
        height: '20px',
    },
    reviewSummaryAction: {
        fontSize: '14px',
        fontWeight: '600',
        color: SECONDARY_COLOR,
    },
    reviewDetailText: {
        ...inputBaseStyle,
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        minHeight: '120px',
        lineHeight: 1.6,
        color: '#555'
    },
    
    // --- NEW STYLES for Notification Center ---
    notificationScreenContainer: { backgroundColor: '#f9f9f9', minHeight: 'calc(100vh - 70px)' },
    notificationTabsContainer: { display: 'flex', padding: '10px 20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee', gap: '15px' },
    notificationTab: { padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#666', backgroundColor: '#e9e9e9', transition: 'all 0.2s ease' },
    notificationTabActive: { backgroundColor: PRIMARY_COLOR, color: 'white', boxShadow: '0 4px 10px rgba(151, 44, 44, 0.2)' },
    notificationList: { padding: '10px 15px 15px 15px' },
    notificationItem: { display: 'flex', gap: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', border: '1px solid #f0f0f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'background-color 0.2s ease' },
    notificationItemUnread: { backgroundColor: 'rgba(10, 92, 152, 0.05)' },
    notificationItemIcon: { fontSize: '24px', color: SECONDARY_COLOR, flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(10, 92, 152, 0.1)' },
    notificationItemContent: { flex: 1, display: 'flex', flexDirection: 'column' },
    notificationItemTitle: { margin: 0, fontWeight: 'bold', fontSize: '15px', color: '#333' },
    notificationItemMessage: { margin: '4px 0 8px 0', fontSize: '14px', color: '#555', lineHeight: 1.5 },
    notificationItemTimestamp: { fontSize: '12px', color: '#888' },
    notificationUnreadDot: { width: '8px', height: '8px', backgroundColor: SECONDARY_COLOR, borderRadius: '50%', marginRight: '8px', flexShrink: 0, alignSelf: 'center' },
    
    // UPDATED STYLES for Notification Modal
    notificationModalContent: {
        backgroundColor: 'white',
        width: 'calc(100% - 40px)',
        maxWidth: '380px',
        borderRadius: '20px',
        padding: '30px',
        boxSizing: 'border-box',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    notificationModalIconContainer: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: PRIMARY_COLOR_LIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: PRIMARY_COLOR,
        fontSize: '24px',
        margin: '0 auto 20px auto',
    },
    notificationModalHeader: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#111',
        marginBottom: '8px',
        lineHeight: 1.3,
    },
    notificationModalTimestamp: {
        fontSize: '13px',
        color: '#888',
        marginBottom: '25px',
    },
    notificationModalBody: {
        fontSize: '15px',
        color: '#444',
        lineHeight: 1.7,
        marginBottom: '30px',
    },

};