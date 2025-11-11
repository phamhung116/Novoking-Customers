import React from 'react';
import { styles } from '../utils/styles';

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
    isOpen, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = 'Đồng ý', 
    cancelText = 'Huỷ',
    confirmColor = '#28a745'
}) => {
    if (!isOpen) return null;

    return (
        <div style={{...styles.modalOverlay, alignItems: 'center'}} onClick={onCancel}>
            <div 
                style={{...styles.modalContent, maxWidth: '320px', borderRadius: '16px'}}
                onClick={e => e.stopPropagation()}
            >
                <p style={{textAlign: 'center', fontSize: '18px', margin: '20px 0 30px 0', color: '#333', lineHeight: 1.5}}>
                    {message}
                </p>
                <div style={{display: 'flex', gap: '10px'}}>
                    <button onClick={onCancel} style={{...styles.button, flex: 1, backgroundColor: '#6c757d', color: 'white'}}>
                        {cancelText}
                    </button>
                    <button onClick={onConfirm} style={{...styles.button, flex: 1, backgroundColor: confirmColor}}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;