import React from 'react';
import { styles } from '../../utils/styles';

interface ReviewDetailScreenProps {
    booking: any;
    onBack: () => void;
    onEditReview: () => void;
}

// --- SVG Icon Components ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        {/* FIX: Corrected the malformed 'points' attribute in the polyline element. */}
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);


// FIX: Add explicit prop types for the StaticStarIcon component to prevent TypeScript errors.
interface StaticStarIconProps {
    filled: boolean;
    color?: string;
}

const StaticStarIcon: React.FC<StaticStarIconProps> = ({ filled, color = '#E0E0E0' }) => {
    return (
        <div style={{...styles.reviewSummaryStarIcon, cursor: 'default'}}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </div>
    );
};

const ReviewDetailScreen: React.FC<ReviewDetailScreenProps> = ({ booking, onBack, onEditReview }) => {
    const { collaborator, service, ratingData } = booking;
    const { stars, text, tags, timestamp, images } = ratingData || {};

    if (!ratingData) {
        return (
             <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
                <div style={{...styles.pageHeader, backgroundColor: '#fff', margin: 0 }}>
                    <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                    <h2 style={styles.pageTitle}>Chi tiết đánh giá</h2>
                    <div style={{width: '24px'}}></div>
                </div>
                <p style={{textAlign: 'center', marginTop: '30px'}}>Không tìm thấy dữ liệu đánh giá.</p>
            </div>
        );
    }
    
    return (
        <div style={{...styles.container, backgroundColor: '#f9f9f9'}}>
            <div style={{...styles.pageHeader, backgroundColor: '#f9f9f9'}}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chi tiết đánh giá</h2>
                 <button onClick={onEditReview} style={styles.pageHeaderActionButton}>
                    <EditIcon />
                </button>
            </div>

            <div style={{padding: '0 15px'}}>
                {/* Tasker Info Card */}
                 <div style={{...styles.bookingDetailCard, marginTop: '15px'}}>
                     <div style={styles.taskerInfoCard}>
                        {collaborator.avatarUrl ? (
                            <img src={collaborator.avatarUrl} alt={collaborator.name} style={styles.taskerAvatar} />
                        ) : (
                            <div style={styles.taskerAvatar}>👨‍🔧</div>
                        )}
                        <div style={styles.taskerDetails}>
                            <p style={styles.taskerName}>{collaborator.name}</p>
                            <p style={{...styles.taskerRating, margin: '4px 0 0 0'}}>{service.name}</p>
                        </div>
                    </div>
                </div>
                
                 {/* Rating & Timestamp Card */}
                <div style={styles.bookingDetailCard}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{...styles.ratingStarsContainer, margin: 0, gap: '5px'}}>
                            {[1, 2, 3, 4, 5].map(index => (
                                <StaticStarIcon key={index} color="#ffdd56" filled={index <= stars} />
                            ))}
                        </div>
                        <p style={{fontSize: '13px', color: '#888', margin: 0}}>
                            {new Date(timestamp).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                </div>

                {/* Feedback Details */}
                <div style={{...styles.feedbackSection, ...styles.feedbackSectionVisible, marginTop: '15px'}}>
                    {tags && tags.length > 0 && (
                        <div style={{...styles.bookingDetailCard, paddingBottom: '5px'}}>
                            <h3 style={{...styles.dateTimeSectionTitle, marginTop: 0}}>Nhận xét nhanh</h3>
                            <div style={{...styles.feedbackTagsContainer, cursor: 'default', paddingBottom: '10px'}}>
                                {tags.map(tag => (
                                    <div key={tag} style={{...styles.feedbackTag, ...styles.feedbackTagSelected, cursor: 'default'}}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {text && (
                        <div style={styles.bookingDetailCard}>
                            <h3 style={styles.dateTimeSectionTitle}>Chi tiết nhận xét của bạn</h3>
                            <div style={{...styles.reviewDetailText, whiteSpace: 'pre-wrap'}}>
                                {text}
                            </div>
                        </div>
                    )}

                    {images && images.length > 0 && (
                        <div style={styles.bookingDetailCard}>
                            <h3 style={{...styles.dateTimeSectionTitle, marginTop: 0}}>Hình ảnh đính kèm</h3>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                {images.map((imgSrc, index) => (
                                    <img
                                        key={index}
                                        src={imgSrc}
                                        alt={`Review image ${index + 1}`}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewDetailScreen;
