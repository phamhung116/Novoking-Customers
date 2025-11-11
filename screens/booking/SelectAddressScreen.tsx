import React, { useState, useEffect } from 'react';
import { styles } from '../../utils/styles';
import BookingStepper from '../../components/BookingStepper';
import { formatAddress } from '../../utils/helpers';
import { daNangWards } from '../../utils/data';

interface SelectAddressScreenProps {
    user: any;
    bookingData: any;
    onContinue: (data: { address: any }) => void;
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

// A compact, inline form for adding a temporary address
const TempAddressForm: React.FC<{ onSave: (address: any) => void, onCancel: () => void }> = ({ onSave, onCancel }) => {
    const [address, setAddress] = useState({ streetNumber: '', streetName: '', ward: '', city: 'TP Đà Nẵng' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!address.streetNumber) newErrors.streetNumber = "Vui lòng nhập số nhà.";
        if (!address.streetName) newErrors.streetName = "Vui lòng nhập tên đường.";
        if (!address.ward) newErrors.ward = "Vui lòng chọn phường/xã.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        onSave(address);
    };

    return (
        <div>
            <h3 style={{marginTop: 0, marginBottom: '20px'}}>Thêm địa chỉ làm việc mới</h3>
             <div style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Số nhà</label>
                    <input type="text" name="streetNumber" value={address.streetNumber} onChange={handleChange} placeholder="VD: 123/5A" style={styles.input} />
                    {errors.streetNumber && <p style={styles.error}>{errors.streetNumber}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Tên đường</label>
                    <input type="text" name="streetName" value={address.streetName} onChange={handleChange} placeholder="VD: Nguyễn Văn Linh" style={styles.input} />
                    {errors.streetName && <p style={styles.error}>{errors.streetName}</p>}
                </div>
                <div style={styles.formGroup}>
                     <label style={styles.formLabel}>Phường/Xã</label>
                    <select name="ward" value={address.ward} onChange={handleChange} style={styles.select}>
                        <option value="">-- Chọn Phường/Xã --</option>
                        {daNangWards.map(ward => <option key={ward} value={ward}>{ward}</option>)}
                    </select>
                    {errors.ward && <p style={styles.error}>{errors.ward}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Thành phố</label>
                    <input type="text" name="city" value={address.city} readOnly style={{ ...styles.input, ...styles.inputReadOnly }} />
                </div>
                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <button onClick={onCancel} style={{...styles.button, backgroundColor: '#6c757d', flex: 1 }}>Hủy</button>
                    <button onClick={handleSave} style={{...styles.button, flex: 1 }}>Sử dụng địa chỉ này</button>
                </div>
            </div>
        </div>
    );
};


const SelectAddressScreen: React.FC<SelectAddressScreenProps> = ({ user, bookingData, onContinue, onBack }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [tempAddress, setTempAddress] = useState(null);

    useEffect(() => {
        // Auto-select default or first address on load
        if (tempAddress) {
            setSelectedAddress(tempAddress);
        } else {
            const defaultAddress = user.addresses.find(a => a.isDefault);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            } else if (user.addresses.length > 0) {
                setSelectedAddress(user.addresses[0]);
            }
        }
    }, [user.addresses, tempAddress]);

    const handleContinue = () => {
        if (!selectedAddress) {
            alert("Vui lòng chọn hoặc thêm một địa chỉ.");
            return;
        }
        onContinue({ address: selectedAddress });
    };
    
    const handleSaveTempAddress = (newAddressData: any) => {
        const newTempAddress = {
            ...newAddressData,
            id: `temp-${Date.now()}`, // Give it a unique temporary ID
            isTemporary: true,
        };
        setTempAddress(newTempAddress);
        setIsAddingAddress(false);
    };

    const allAddresses = [...user.addresses];
    if (tempAddress) {
        // To prevent duplicates if user adds, goes back, and adds again
        const existingTemp = allAddresses.find(a => a.id === tempAddress.id);
        if (!existingTemp) {
            allAddresses.push(tempAddress);
        }
    }
    
    const getPackageDurationText = (pkg) => {
        if (!pkg) return '';
        if (pkg.hours) return `/${pkg.hours}h`;
        if (pkg.units) return `/${pkg.units} máy`;
        return '';
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
            <div style={styles.pageHeader}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chọn địa chỉ</h2>
                 <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <BookingStepper steps={['Dịch vụ', 'Địa chỉ', 'Thời gian', 'Thanh toán']} currentStep={2} />
            <div style={styles.screenContent}>
                {isAddingAddress ? (
                    <TempAddressForm onSave={handleSaveTempAddress} onCancel={() => setIsAddingAddress(false)} />
                ) : (
                    <>
                        {allAddresses.map(addr => (
                            <div
                                key={addr.id}
                                onClick={() => setSelectedAddress(addr)}
                                style={{
                                    ...styles.addressItem,
                                    ...(selectedAddress?.id === addr.id ? styles.packageOptionSelected : {}),
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontWeight: 'bold', margin: 0, flex: 1, paddingRight: '10px' }}>{formatAddress(addr)}</p>
                                    <div style={{ flexShrink: 0 }}>
                                        {addr.isDefault && <span style={styles.profileViewDefaultBadge}>Mặc định</span>}
                                        {addr.isTemporary && <span style={{...styles.profileViewDefaultBadge, backgroundColor: '#6c757d', color: 'white'}}>Tạm thời</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => setIsAddingAddress(true)}
                            style={{...styles.buttonOutline, width: '100%', marginTop: '15px'}}
                        >
                            + Thêm địa chỉ mới
                        </button>
                    </>
                )}
            </div>
            
             <div style={styles.fixedFooter}>
                 <button 
                    onClick={handleContinue} 
                    style={{...styles.footerButton, ...(!selectedAddress ? styles.buttonDisabled : {})}}
                    disabled={!selectedAddress}
                 >
                    <span>
                         {bookingData?.package?.price.toLocaleString('vi-VN')} VND{getPackageDurationText(bookingData?.package)}
                    </span>
                    <span>Tiếp theo</span>
                </button>
            </div>
        </div>
    );
};

export default SelectAddressScreen;