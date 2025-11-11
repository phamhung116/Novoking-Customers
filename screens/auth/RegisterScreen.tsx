import React, { useState, useEffect } from 'react';
import { styles } from '../../utils/styles';
import { daNangWards } from '../../utils/data';

// --- Components ---

// Success Modal Component
const SuccessModal = ({ isOpen }) => {
    if (!isOpen) return null;

    // A simple animation effect using a style tag
    const animationStyle = `
        @keyframes stroke { 100% { stroke-dashoffset: 0; } }
        @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
        #checkmark-circle { animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
        #checkmark-check { animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
        #checkmark-svg { animation: scale 0.3s ease-in-out 0.9s both; }
    `;

    return (
        <div style={styles.modalOverlay}>
            <style>{animationStyle}</style>
            <div style={styles.successModalContent}>
                <div style={styles.successModalIconContainer}>
                    <svg id="checkmark-svg" style={styles.successModalIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle id="checkmark-circle" style={styles.successModalIconCircle} cx="26" cy="26" r="25" fill="none"/>
                        <path id="checkmark-check" style={styles.successModalIconCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h2 style={styles.successModalTitle}>Đăng ký thành công!</h2>
                <p style={styles.successModalText}>Chào mừng bạn đến với Novoking. Bạn sẽ được chuyển đến trang đăng nhập.</p>
            </div>
        </div>
    );
};

// FIX: Add explicit prop types to resolve TypeScript inference errors.
interface FloatingLabelInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error: string | null;
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: () => void;
    isFocused: boolean;
}

// Floating Label Input Component
const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, label, value, onChange, type = 'text', error, onFocus, onBlur, isFocused }) => (
    <div style={styles.floatingInputContainer}>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder=" " // Required for the CSS to work
            style={{ 
                ...styles.floatingInput, 
                ...(isFocused && styles.floatingInputFocus), 
                ...(error && styles.floatingInputError) 
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id} style={{ ...styles.floatingLabel, ...((isFocused || value) && styles.floatingLabelActive), ...(error && styles.floatingLabelError) }}>
            {label}
        </label>
        {error && <span style={styles.inputErrorIcon}>!</span>}
        {error && <p id={`${id}-error`} style={{...styles.error, marginTop: '4px', marginBottom: 0}}>{error}</p>}
    </div>
);

// FIX: Add explicit prop types to resolve TypeScript inference errors.
interface FloatingLabelSelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    error: string | null;
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: () => void;
    isFocused: boolean;
}

// Floating Label Select Component
const FloatingLabelSelect: React.FC<FloatingLabelSelectProps> = ({ id, label, value, onChange, children, error, onFocus, onBlur, isFocused }) => (
     <div style={styles.floatingInputContainer}>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{ 
                ...styles.floatingInput, 
                ...(isFocused && styles.floatingInputFocus), 
                ...(error && styles.floatingInputError) 
            }}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        >
            {children}
        </select>
        <label htmlFor={id} style={{ ...styles.floatingLabel, ...(value ? styles.floatingLabelActive : styles.floatingLabelSelect), ...((isFocused || value) && styles.floatingLabelActive), ...(error && styles.floatingLabelError) }}>
            {label}
        </label>
        {error && <p id={`${id}-error`} style={{...styles.error, marginTop: '4px', marginBottom: 0}}>{error}</p>}
    </div>
);

interface RegisterScreenProps {
    onRegister: (data: any) => void;
    setScreen: (screen: string) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, setScreen }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        streetNumber: '',
        streetName: '',
        ward: '',
        city: 'TP Đà Nẵng',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

    useEffect(() => {
        let timer;
        if (isSuccessModalOpen) {
            timer = setTimeout(() => {
                setScreen('login');
            }, 4000);
        }
        return () => clearTimeout(timer);
    }, [isSuccessModalOpen, setScreen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => setFocusedInput(e.target.name);
    const handleBlur = () => setFocusedInput(null);

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ và tên.";
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.streetNumber.trim()) newErrors.streetNumber = "Vui lòng nhập số nhà.";
        if (!formData.streetName.trim()) newErrors.streetName = "Vui lòng nhập tên đường.";
        if (!formData.ward) newErrors.ward = "Vui lòng chọn phường/xã.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = () => {
        if (validateStep2()) {
            onRegister({ ...formData, addresses: [{...formData, isDefault: true, id: 1}] });
            setSuccessModalOpen(true);
        }
    };

    return (
        <div>
            <div style={{...styles.authFormContainer, paddingBottom: '100px'}}>
                <h2 style={{...styles.header, marginBottom: '15px' }}>Thông tin đăng ký</h2>
                <div style={styles.progressBarContainer}>
                    <div style={{ ...styles.progressBar, width: step === 1 ? '50%' : '100%' }}></div>
                </div>
                
                <div style={styles.formStepContainer}>
                    <div style={{ ...styles.formStep, transform: step === 1 ? 'translateX(0%)' : 'translateX(-50%)' }}>
                        {/* Step 1: Personal Info */}
                        <div style={styles.formStepContent}>
                            <h3 style={styles.stepTitle}>Thông tin cá nhân</h3>
                            <FloatingLabelInput id="fullName" label="Họ và tên" value={formData.fullName} onChange={handleChange} error={errors.fullName} onFocus={handleFocus} onBlur={handleBlur} isFocused={focusedInput === 'fullName'} />
                            <FloatingLabelInput id="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} onFocus={handleFocus} onBlur={handleBlur} isFocused={focusedInput === 'email'} />
                        </div>
                        
                        {/* Step 2: Address Info */}
                        <div style={styles.formStepContent}>
                            <h3 style={styles.stepTitle}>Địa chỉ mặc định</h3>
                            <FloatingLabelInput id="streetNumber" label="Số nhà" value={formData.streetNumber} onChange={handleChange} error={errors.streetNumber} onFocus={handleFocus} onBlur={handleBlur} isFocused={focusedInput === 'streetNumber'} />
                            <FloatingLabelInput id="streetName" label="Tên đường" value={formData.streetName} onChange={handleChange} error={errors.streetName} onFocus={handleFocus} onBlur={handleBlur} isFocused={focusedInput === 'streetName'} />
                            <FloatingLabelSelect id="ward" label="Phường/Xã" value={formData.ward} onChange={handleChange} error={errors.ward} onFocus={handleFocus} onBlur={handleBlur} isFocused={focusedInput === 'ward'}>
                                <option value="">-- Chọn Phường/Xã --</option>
                                {daNangWards.map(w => <option key={w} value={w}>{w}</option>)}
                            </FloatingLabelSelect>
                            <FloatingLabelInput id="city" label="Thành phố" value={formData.city} onChange={() => {}} isFocused={false} onFocus={()=>{}} onBlur={()=>{}} error={null} />
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.fixedFooter}>
                {step === 1 ? (
                    <button onClick={handleNext} style={styles.button}>Tiếp theo</button>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => setStep(1)} style={{ ...styles.button, flex: 1, backgroundColor: '#6c757d' }}>Quay lại</button>
                        <button onClick={handleSubmit} style={{ ...styles.button, flex: 2 }}>Hoàn tất đăng ký</button>
                    </div>
                )}
            </div>

            <SuccessModal isOpen={isSuccessModalOpen} />
        </div>
    );
};


export default RegisterScreen;
