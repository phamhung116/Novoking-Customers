import React, { useState, useEffect, useMemo } from 'react';
import { styles, SECONDARY_COLOR, PRIMARY_COLOR } from '../../utils/styles';

interface EditReviewScreenProps {
    booking: any;
    onSave: (data: any) => void;
    onBack: () => void;
}

// --- Constants & Data ---
const RATING_DESCRIPTORS = {
    1: 'Rất tệ',
    2: 'Tệ',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Tuyệt vời',
};
const POSITIVE_TAGS = ['Thái độ tốt', 'Đúng giờ', 'Làm việc hiệu quả', 'Cẩn thận, tỉ mỉ'];
const NEGATIVE_TAGS = ['Đến trễ', 'Thái độ kém', 'Làm việc ẩu', 'Chưa sạch sẽ'];
const MAX_FEEDBACK_LENGTH = 500;

// --- SVG Icon Components ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const StarIcon = ({ filled, filledColor = '#ffdd56', defaultColor = '#ccc', isPulsing }) => {
    const animationStyle = `@keyframes starPulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`;
    const color = filled ? filledColor : defaultColor;
    return (
        <div style={{...styles.ratingStar, ...(isPulsing && {animation: 'starPulse 0.4s ease-in-out'}) }}>
            <style>{animationStyle}</style>
            <svg width="100%" height="100%" viewBox="0 0 24 24" 
                 fill={filled ? filledColor : 'none'} 
                 stroke={color} 
                 strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        </div>
    );
};

const EditReviewScreen: React.FC<EditReviewScreenProps> = ({ booking, onSave, onBack }) => {
    const [rating, setRating] = useState(booking.ratingData?.stars || 0);
    const [feedbackText, setFeedbackText] = useState(booking.ratingData?.text || '');
    const [selectedTags, setSelectedTags] = useState<string[]>(booking.ratingData?.tags || []);
    const [hoverRating, setHoverRating] = useState(0);
    const [isPulsing, setIsPulsing] = useState(0);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSetRating = (rate: number) => {
        setRating(rate);
        setIsPulsing(rate);
        setTimeout(() => setIsPulsing(0), 400); // Animation duration
    };
    
    const handleSaveChanges = () => {
        if (rating === 0) {
            alert('Vui lòng chọn số sao để đánh giá.');
            return;
        }
        onSave({
            bookingId: booking.id,
            rating: rating,
            feedbackText: feedbackText,
            tags: selectedTags,
        });
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const feedbackTagsToShow = useMemo(() => {
        if (rating >= 4) return { title: 'Bạn hài lòng về điều gì?', tags: POSITIVE_TAGS };
        if (rating > 0 && rating <= 2) return { title: 'Cần cải thiện điều gì?', tags: NEGATIVE_TAGS };
        if (rating === 3) return { title: 'Nhận xét thêm', tags: [...POSITIVE_TAGS, ...NEGATIVE_TAGS]};
        return { title: '', tags: [] };
    }, [rating]);

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>
            <div style={{...styles.pageHeader, backgroundColor: '#fff', margin: 0 }}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Chỉnh sửa Đánh giá</h2>
                <div style={{width: '24px'}}></div>
            </div>

            <div style={styles.screenContent}>
                 <div style={styles.ratingStarsContainer}>
                    {[1, 2, 3, 4, 5].map(index => (
                        <div 
                            key={index}
                            onMouseEnter={() => setHoverRating(index)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => handleSetRating(index)}
                        >
                            <StarIcon 
                                filled={(hoverRating || rating) >= index}
                                isPulsing={isPulsing === index}
                            />
                        </div>
                    ))}
                </div>
                
                <p style={{...styles.ratingDescriptor, opacity: (hoverRating || rating) > 0 ? 1 : 0}}>
                    {RATING_DESCRIPTORS[hoverRating || rating]}
                </p>

                {rating > 0 && (
                    <div style={{...styles.feedbackSection, ...styles.feedbackSectionVisible, marginTop: '20px'}}>
                        <h3 style={styles.dateTimeSectionTitle}>{feedbackTagsToShow.title}</h3>
                        <div style={styles.feedbackTagsContainer}>
                            {feedbackTagsToShow.tags.map(tag => (
                                 <div 
                                    key={tag} 
                                    style={{
                                        ...styles.feedbackTag,
                                        ...(selectedTags.includes(tag) ? styles.feedbackTagSelected : {})
                                    }} 
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                <div style={{marginTop: '40px'}}>
                     <h3 style={styles.dateTimeSectionTitle}>Chia sẻ cảm nhận của bạn</h3>
                     <div style={{ position: 'relative' }}>
                        <textarea
                            value={feedbackText}
                            onChange={e => setFeedbackText(e.target.value)}
                            maxLength={MAX_FEEDBACK_LENGTH}
                            rows={5}
                            placeholder="Dịch vụ có tốt không? Bạn có muốn nhắn nhủ gì tới CTV không?"
                            onFocus={() => setIsTextareaFocused(true)}
                            onBlur={() => setIsTextareaFocused(false)}
                            style={{
                                ...styles.notesTextareaModern,
                                ...(isTextareaFocused && { 
                                    borderColor: SECONDARY_COLOR, 
                                })
                            }}
                        />
                        <p style={{
                            ...styles.feedbackCharCounter,
                            position: 'absolute',
                            bottom: '12px',
                            right: '15px',
                            margin: 0,
                        }}>
                            {feedbackText.length}/{MAX_FEEDBACK_LENGTH}
                        </p>
                    </div>
                </div>
            </div>

            <div style={styles.fixedFooter}>
                <button 
                    onClick={handleSaveChanges} 
                    style={{
                        ...styles.footerButton, 
                        justifyContent: 'center', 
                        ...(!rating && styles.buttonDisabled),
                        ...(isButtonPressed && styles.buttonPressed)
                    }}
                    disabled={!rating}
                    onMouseDown={() => setIsButtonPressed(true)}
                    onMouseUp={() => setIsButtonPressed(false)}
                    onMouseLeave={() => setIsButtonPressed(false)}
                    onTouchStart={() => setIsButtonPressed(true)}
                    onTouchEnd={() => setIsButtonPressed(false)}
                >
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default EditReviewScreen;