import React, { useState, useRef, useEffect } from 'react';
import { styles } from '../../utils/styles';

interface OTPScreenProps {
    phoneNumber: string;
    onVerify: (otp: string) => void;
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onVerify, onBack }) => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [countdown, setCountdown] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(parseInt(element.value)) && element.value !== '') return; // Allow empty string for backspace
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const target = e.target as HTMLInputElement;
        if (e.key === "Backspace" && !otp[index] && target.previousSibling) {
             (target.previousSibling as HTMLInputElement).focus();
        }
    };

    const handleVerify = () => {
        if (otp.join("").length < 6) {
            alert("Vui lòng nhập đủ 6 số OTP.");
            return;
        }
        onVerify(otp.join(""));
    };

    return (
        <div style={{...styles.authContainer, padding: '0'}}>
            <div style={{...styles.pageHeader, margin: '0 0 20px 0' }}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Xác thực OTP</h2>
                 <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>

            <div style={{...styles.authContent, padding: '0 20px', justifyContent: 'flex-start', paddingTop: '10vh'}}>
                 <p style={{ textAlign: 'center', color: '#333', fontSize: '16px', lineHeight: 1.5 }}>
                    Mã OTP đã được gửi đến số <strong>{phoneNumber}</strong>
                </p>
                <div style={styles.otpContainer}>
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="tel"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            maxLength={1}
                            style={styles.otpInput}
                            ref={el => { inputRefs.current[index] = el; }}
                            onFocus={e => e.target.select()}
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                        />
                    ))}
                </div>
                <p style={styles.countdown}>
                    {countdown > 0 ? `Hiệu lực trong ${countdown} giây` : "Mã OTP đã hết hạn."}
                </p>
            </div>

            <div style={{...styles.authFooter, padding: '20px'}}>
                <button onClick={handleVerify} style={styles.button}>Xác nhận</button>
                <button
                    onClick={() => setCountdown(30)}
                    disabled={countdown > 0}
                    style={countdown > 0 ? { ...styles.button, ...styles.buttonDisabled, backgroundColor: '#d8d8d8', color: '#888' } : {...styles.button, backgroundColor: '#a9a9a9'}}
                >Gửi lại OTP</button>
            </div>
        </div>
    );
};

export default OTPScreen;