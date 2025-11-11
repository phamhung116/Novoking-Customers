import React, { useState, useMemo, useEffect, useRef } from 'react';
import { styles, SECONDARY_COLOR, PRIMARY_COLOR } from '../../utils/styles';

interface RatingScreenProps {
    booking: any;
    onSubmit: (data: any) => void;
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
const MAX_IMAGES = 3;


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

const RatingScreen: React.FC<RatingScreenProps> = ({ booking, onSubmit, onBack }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPulsing, setIsPulsing] = useState(0);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const { collaborator, service } = booking;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSetRating = (rate: number) => {
        setRating(rate);
        setIsPulsing(rate);
        setTimeout(() => setIsPulsing(0), 400); // Animation duration
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Vui lòng chọn số sao để đánh giá.');
            return;
        }
        onSubmit({
            bookingId: booking.id,
            rating: rating,
            feedbackText: feedbackText,
            tags: selectedTags,
            images: images,
        });
    };
    
    const handleTriggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const currentImageCount = images.length;
            if (currentImageCount + files.length > MAX_IMAGES) {
                alert(`Bạn chỉ có thể tải lên tối đa ${MAX_IMAGES} hình ảnh.`);
                // Reset file input value to allow re-selection of the same file later
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            Array.from(files).forEach(file => {
                const reader = new FileReader();
                // FIX: Updated file reading logic to be more robust by using the event target from the onload callback. This ensures the correct context is used and resolves potential TypeScript type inference errors.
                reader.onload = (event) => {
                    if (event.target?.result && typeof event.target.result === 'string') {
                        setImages(prev => [...prev, event.target.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
             if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
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
                <h2 style={styles.pageTitle}>Đánh giá Dịch vụ</h2>
                 <div style={{width: '24px'}}></div>
            </div>

            <div style={styles.screenContent}>
                <div style={styles.ratingTaskerCard}>
                    {collaborator.avatarUrl ? (
                        <img src={collaborator.avatarUrl} alt={collaborator.name} style={styles.ratingTaskerAvatar} />
                    ) : (
                        <div style={styles.ratingTaskerAvatar}>👨‍🔧</div>
                    )}
                    <div>
                        <p style={styles.ratingTaskerName}>{collaborator.name}</p>
                        <p style={styles.ratingTaskerService}>{service.name}</p>
                    </div>
                </div>

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

                <div style={{...styles.feedbackSection, ...(rating > 0 && styles.feedbackSectionVisible)}}>
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

                    <h3 style={{...styles.dateTimeSectionTitle, marginTop: '40px'}}>Chia sẻ cảm nhận của bạn</h3>
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
                    
                     <div style={styles.feedbackImageUploadContainer}>
                         <h3 style={{...styles.dateTimeSectionTitle, marginTop: '40px'}}>Hình ảnh minh chứng (nếu có)</h3>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            multiple
                            accept="image/*"
                            style={{ display: 'none' }}
                            aria-hidden="true"
                         />
                         <button 
                            style={{...styles.fileUploadButton, ...((images.length >= MAX_IMAGES) && styles.buttonDisabled)}}
                            onClick={handleTriggerFileUpload}
                            disabled={images.length >= MAX_IMAGES}
                        >
                            + Tải lên hình ảnh ({images.length}/{MAX_IMAGES})
                         </button>
                     </div>
                     
                    {images.length > 0 && (
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {images.map((imageSrc, index) => (
                                <div key={index} style={{ position: 'relative' }}>
                                    <img src={imageSrc} alt={`Preview ${index + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        aria-label={`Remove image ${index + 1}`}
                                        style={{
                                            position: 'absolute',
                                            top: '-5px',
                                            right: '-5px',
                                            background: 'rgba(0,0,0,0.7)',
                                            color: 'white',
                                            border: '1px solid white',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            padding: 0,
                                            fontSize: '12px',
                                            lineHeight: '1'
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>

            <div style={styles.fixedFooter}>
                <button 
                    onClick={handleSubmit} 
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
                    Gửi đánh giá
                </button>
            </div>
        </div>
    );
};

export default RatingScreen;