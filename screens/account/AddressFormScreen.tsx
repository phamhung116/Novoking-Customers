import React, { useState, useMemo } from 'react';
import { styles } from '../../utils/styles';
import { daNangWards } from '../../utils/data';

interface AddressFormScreenProps {
    addressToEdit: any | null;
    onSave: (address: any) => void;
    onCancel: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);


interface WardSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (ward: string) => void;
}

const WardSelectorModal: React.FC<WardSelectorModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredWards = daNangWards.filter(ward =>
        ward.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const animationStyle = `@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <style>{animationStyle}</style>
            <div style={{...styles.filterModalContent, animation: 'slideUp 0.3s ease-out forwards'}} onClick={e => e.stopPropagation()}>
                 <div style={styles.filterModalHeader}>
                    <h3 style={styles.filterModalTitle}>Chọn Phường/Xã</h3>
                    <button style={styles.filterModalCloseButton} onClick={onClose}>&times;</button>
                </div>
                 <input
                    type="text"
                    placeholder="Tìm kiếm phường/xã..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.wardModalSearchInput}
                />
                <div style={styles.wardModalList}>
                    {filteredWards.map(ward => (
                        <div 
                            key={ward} 
                            style={styles.wardModalListItem} 
                            onClick={() => { onSelect(ward); onClose(); }}
                        >
                            {ward}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const AddressFormScreen: React.FC<AddressFormScreenProps> = ({ addressToEdit, onSave, onCancel }) => {
    const [address, setAddress] = useState(addressToEdit || { streetNumber: '', streetName: '', ward: '', city: 'TP Đà Nẵng', isDefault: false });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isWardModalOpen, setWardModalOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        setAddress(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const handleSelectWard = (ward: string) => {
        setAddress(prev => ({ ...prev, ward }));
        if (errors.ward) {
            setErrors(prev => ({...prev, ward: ''}));
        }
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

    const renderInputField = (name: string, label: string, placeholder: string) => {
        const isFocused = focusedField === name;
        return (
            <div style={styles.addressFormInputContainer}>
                <label style={{
                    ...styles.addressFormLabel,
                    ...(isFocused && styles.addressFormLabelFocused)
                }}>{label}</label>
                <input
                    type="text"
                    name={name}
                    value={address[name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    placeholder={placeholder}
                    style={{
                        ...styles.addressFormInput,
                        ...(isFocused && styles.addressFormInputFocused)
                    }}
                />
                {errors[name] && <p style={styles.error}>{errors[name]}</p>}
            </div>
        );
    };
    
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>
            <div style={{...styles.pageHeader, backgroundColor: '#fff', margin: 0, borderBottom: '1px solid #f0f0f0' }}>
                <button onClick={onCancel} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>{addressToEdit ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h2>
                 <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <div style={{...styles.screenContent, backgroundColor: '#fff' }}>
                <div style={styles.form}>
                    {renderInputField("streetNumber", "SỐ NHÀ", "VD: 123/5A")}
                    {renderInputField("streetName", "TÊN ĐƯỜNG", "VD: Nguyễn Văn Linh")}

                    {/* Ward Selector */}
                    <div style={styles.addressFormInputContainer} onClick={() => setWardModalOpen(true)}>
                        <label style={{
                            ...styles.addressFormLabel,
                            ...(focusedField === 'ward' && styles.addressFormLabelFocused)
                        }}>PHƯỜNG/XÃ</label>
                         <div style={{
                            ...styles.addressFormInput,
                            ...(focusedField === 'ward' && styles.addressFormInputFocused),
                            display: 'flex', 
                            alignItems: 'center', 
                            cursor: 'pointer'
                        }}>
                             <span style={{color: address.ward ? '#333' : '#aaa'}}>{address.ward || '-- Chọn Phường/Xã --'}</span>
                         </div>
                         <div style={styles.addressFormSelectChevron}><ChevronDownIcon /></div>
                        {errors.ward && <p style={styles.error}>{errors.ward}</p>}
                    </div>

                    {/* City (Read-only) */}
                     <div style={styles.addressFormInputContainer}>
                        <label style={styles.addressFormLabel}>THÀNH PHỐ</label>
                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            readOnly
                            style={{...styles.addressFormInput, ...styles.addressFormInputReadOnly}}
                        />
                    </div>
                    
                    {/* Modern Checkbox */}
                    <div 
                        style={styles.modernCheckboxContainer} 
                        onClick={() => setAddress(prev => ({ ...prev, isDefault: !prev.isDefault }))}
                    >
                        <input 
                            type="checkbox" 
                            name="isDefault" 
                            checked={address.isDefault} 
                            onChange={() => {}} // onChange is handled by the container div
                            style={styles.checkboxInput}
                        />
                         <div style={{
                            ...styles.modernCheckboxBox,
                            ...(address.isDefault && styles.modernCheckboxBoxChecked)
                        }}>
                             <span style={{
                                ...styles.modernCheckboxCheckmark,
                                ...(address.isDefault && styles.modernCheckboxCheckmarkVisible)
                            }}>✓</span>
                        </div>
                        <span style={styles.modernCheckboxLabel}>Đặt làm địa chỉ mặc định</span>
                    </div>
                </div>
            </div>
             <div style={{...styles.fixedFooter, backgroundColor: '#fff'}}>
                <button onClick={handleSave} style={{...styles.button, borderRadius: '12px'}}>
                    {addressToEdit ? 'Lưu thay đổi' : 'Thêm địa chỉ'}
                </button>
            </div>
             <WardSelectorModal 
                isOpen={isWardModalOpen}
                onClose={() => setWardModalOpen(false)}
                onSelect={handleSelectWard}
            />
        </div>
    );
};

export default AddressFormScreen;