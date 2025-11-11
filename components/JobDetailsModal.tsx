import React from 'react';
import { styles } from '../utils/styles';

interface JobDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    details: string[];
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ isOpen, onClose, title, details }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h3 style={styles.modalHeader}>{title}</h3>
                <div>
                    {details.map((item, index) => (
                        <div key={index} style={styles.modalListItem}>
                            <span style={styles.modalListIcon}>&#9733;</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <button style={styles.modalCloseButton} onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

export default JobDetailsModal;