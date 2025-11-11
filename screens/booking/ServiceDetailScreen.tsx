import React, { useState } from 'react';
import { styles } from '../../utils/styles';
import BookingStepper from '../../components/BookingStepper';
import JobDetailsModal from '../../components/JobDetailsModal';

interface ServiceDetailScreenProps {
    bookingData: any;
    onContinue: (data: { package: any }) => void;
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({ bookingData, onContinue, onBack }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { service } = bookingData;

    const handleContinue = () => {
        if (!selectedPackage) {
            alert("Vui lòng chọn một gói dịch vụ.");
            return;
        }
        onContinue({ package: selectedPackage });
    };
    
    const getPackageDurationText = (pkg) => {
        if (!pkg) return '';
        if (pkg.hours) return `/${pkg.hours}h`;
        if (pkg.units) return `/${pkg.units} máy`;
        return '';
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
            <JobDetailsModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Chi tiết công việc"
                details={service.jobDetails || []}
            />
            <div style={styles.pageHeader}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>{service.name}</h2>
                 <div style={{width: '24px'}}></div> {/* Spacer */}
            </div>
            <BookingStepper steps={['Dịch vụ', 'Địa chỉ', 'Thời gian', 'Thanh toán']} currentStep={1} />
            <div style={styles.screenContent}>
                <div style={styles.detailsButton} onClick={() => setIsModalOpen(true)}>
                     <span style={styles.detailsButtonText}>
                        <span style={styles.detailsButtonIcon}>&#9776;</span>
                        Chi tiết công việc
                    </span>
                    <span>&gt;</span>
                </div>
                
                <h3 style={{ marginTop: '30px' }}>Chọn gói</h3>
                <div>
                    {service.packages.map((pkg, index) => (
                        <div 
                            key={index} 
                            style={{
                                ...styles.packageOption,
                                ...(selectedPackage === pkg ? styles.packageOptionSelected : {})
                            }} 
                            onClick={() => setSelectedPackage(pkg)}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{pkg.name}</span>
                                <span style={{fontWeight: 'bold'}}>{pkg.price.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                    ))}
                </div>
                {service.id === 'dnd' && (
                    <p style={{fontSize: '13px', color: '#777', fontStyle: 'italic', marginTop: '15px'}}>
                        *Lưu ý: Dịch vụ chỉ hỗ trợ tối đa 4h. Nếu bạn muốn đặt nhiều hơn, vui lòng đặt dịch vụ "Tổng vệ sinh", hoặc đặt 02 công việc có khung thời gian gần nhau.
                    </p>
                )}
            </div>
            
            <div style={styles.fixedFooter}>
                 <button 
                    onClick={handleContinue} 
                    style={{...styles.footerButton, ...(!selectedPackage ? styles.buttonDisabled : {})}}
                    disabled={!selectedPackage}
                 >
                    <span>
                         {selectedPackage ? `${selectedPackage.price.toLocaleString('vi-VN')} VND${getPackageDurationText(selectedPackage)}` : 'Vui lòng chọn gói'}
                    </span>
                    <span>Tiếp theo</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceDetailScreen;