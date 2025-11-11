import React, { useState, useEffect } from 'react';
import { styles, PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils/styles';

// --- SVG Icons for main screen ---
const PhoneCallIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const MessageIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>);
const StarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#ffdd56" stroke="#ffdd56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const CarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.95A3.05 3.05 0 0 0 17 14c0-1.68-1.35-3-3-3s-3 1.32-3 3c0 .53.13 1.02.36 1.45L14 22.13l2.64-4.73zM14 14m-1 0a1 1 0 1 0 2 0 1 1 0 1 0-2 0"/><path d="M4.64 19.36c-3.5-3.5-3.5-9.2 0-12.7 3.5-3.5 9.2-3.5 12.7 0 1.7 1.7 2.6 4 2.6 6.4 0 2.3-1 4.6-2.6 6.3l-1.4-1.4c1.2-1.2 2-2.8 2-4.9 0-1.9-.8-3.7-2.1-5-2.8-2.8-7.2-2.8-10 .1-2.7 2.8-2.7 7.2.1 10l-1.3 1.2z"/></svg>);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

// --- NEW High-Fidelity Chat Screen ---
const ChatScreen: React.FC<{ tasker: any; onBack: () => void }> = ({ tasker, onBack }) => {
    const initialMessages = [
        { sender: 'tasker', text: 'Chào bạn, tôi là Bình, cộng tác viên sẽ thực hiện công việc. Tôi đang trên đường đến, dự kiến khoảng 10 phút nữa sẽ tới nơi ạ.', time: '14:20' },
        { sender: 'user', text: 'Ok, cảm ơn bạn. Khi đến gần bạn gọi tôi nhé.', time: '14:21' },
        { sender: 'tasker', text: 'Vâng ạ.', time: '14:21' },
    ];

    const [messages, setMessages] = useState(initialMessages);
    const [message, setMessage] = useState('');
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    // SVG icons for chat
    const CallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    const AttachmentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
    const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;

    
    // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleCall = () => {
        window.location.href = `tel:${tasker.phone}`;
    };

    const handleSendMessage = () => {
        if (!message.trim()) return;
        const newMessage = {
            sender: 'user',
            text: message.trim(),
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newMessage]);
        setMessage('');
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    return (
        <div style={styles.chatScreenContainer}>
            {/* Header */}
            <div style={styles.chatHeader}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px', color: '#333'}}><BackArrowIcon /></button>
                <div style={styles.chatHeaderTitleContainer}>
                    <h2 style={styles.chatHeaderTitle}>Trò chuyện với {tasker.name.split(' ').pop()}</h2>
                    <p style={styles.chatHeaderStatus}>
                        <span style={styles.chatHeaderStatusDot}></span>
                        Đang hoạt động
                    </p>
                </div>
                <button style={styles.chatHeaderAction} onClick={handleCall} aria-label="Gọi điện"><CallIcon /></button>
            </div>

            {/* Content */}
            <div ref={chatContainerRef} style={styles.chatContentArea}>
                {messages.map((msg, index) => (
                    <div key={index} style={{...styles.chatMessageRow, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                        {msg.sender === 'tasker' && <div style={styles.chatMessageAvatar}>👨‍🔧</div>}
                        <div style={styles.chatMessageContent}>
                            <div style={{
                                ...styles.chatMessageBubble,
                                ...(msg.sender === 'user' ? styles.chatMessageUser : styles.chatMessageTasker),
                            }}>
                                {msg.text}
                            </div>
                            <div style={{...styles.chatMessageTimestamp, textAlign: msg.sender === 'user' ? 'right' : 'left', padding: '0 5px'}}>
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Bar */}
            <div style={styles.chatInputBar}>
                <button style={styles.chatInputAttachments}><AttachmentIcon /></button>
                <input
                    type="text"
                    style={styles.chatInputField}
                    placeholder={`Nhắn tin cho ${tasker.name.split(' ').pop()}...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    style={{
                        ...styles.chatInputSendButton,
                        ...(!message.trim() && styles.chatInputSendButtonDisabled),
                        ...(message.trim() ? {transform: 'scale(1.1)'} : {})
                    }}
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};


interface TaskerTrackingScreenProps {
    booking: any;
    onBack: () => void;
}

// --- Child Components for Tracking UI ---
const TaskerTrackingMap: React.FC<{start: any, end: any, onEtaChange: (eta: number) => void, hasArrived: boolean}> = ({ start, end, onEtaChange, hasArrived }) => {
    const [taskerPosition, setTaskerPosition] = useState({ top: '0%', left: '0%' });
    const mapBounds = { minLat: 16.058, maxLat: 16.08, minLng: 108.145, maxLng: 108.185 };

    const getPositionStyle = (lat, lng) => {
        const top = 100 - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
        const left = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
        return { top: `${top}%`, left: `${left}%` };
    };

    const destinationPosition = getPositionStyle(end.lat, end.lng);

    useEffect(() => {
        const animationDuration = 30000; // 30s demo
        const totalTravelTimeMinutes = 15;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            const currentLat = start.lat + (end.lat - start.lat) * progress;
            const currentLng = start.lng + (end.lng - start.lng) * progress;
            setTaskerPosition(getPositionStyle(currentLat, currentLng));
            
            const remainingTime = totalTravelTimeMinutes * (1 - progress);
            onEtaChange(Math.max(0, Math.round(remainingTime)));

            if (progress >= 1) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [start, end, onEtaChange]);

    return (
        <div style={{
            ...styles.trackingMapContainer,
            ...(hasArrived ? styles.trackingMapArrived : {})
        }}>
            <div style={{ ...styles.destinationPin, ...destinationPosition }}></div>
            {!hasArrived && (
                <div style={{ ...styles.taskerPin, ...taskerPosition }}>
                    <div style={{ transform: 'rotate(45deg)' }}><CarIcon /></div>
                </div>
            )}
        </div>
    );
};

const TaskerInfoCard = ({ collaborator, onStartChat }) => {
    const [isChatPressed, setIsChatPressed] = useState(false);
    const [isCallPressed, setIsCallPressed] = useState(false);

    const handleCall = () => {
        window.location.href = `tel:${collaborator.phone}`;
    };
    
    return (
        <div style={styles.bookingDetailCard}>
            <div style={styles.taskerInfoCard}>
                {collaborator.avatarUrl ? (
                    <img src={collaborator.avatarUrl} alt={collaborator.name} style={styles.taskerAvatar} />
                ) : (
                    <div style={styles.taskerAvatar}>👨‍🔧</div>
                )}
                <div style={styles.taskerDetails}>
                    <p style={styles.taskerName}>{collaborator.name}</p>
                    <p style={styles.taskerRating}><StarIcon /> {collaborator.rating} / 5.0</p>
                </div>
                <div style={styles.taskerContactButtons}>
                    <button 
                        style={{...styles.taskerContactButton, ...(isChatPressed ? styles.buttonPressed : {})}} 
                        onClick={onStartChat}
                        onMouseDown={() => setIsChatPressed(true)}
                        onMouseUp={() => setIsChatPressed(false)}
                        onMouseLeave={() => setIsChatPressed(false)}
                        onTouchStart={() => setIsChatPressed(true)}
                        onTouchEnd={() => setIsChatPressed(false)}
                        aria-label="Nhắn tin với cộng tác viên"
                    >
                        <MessageIcon />
                    </button>
                    <button 
                        style={{...styles.taskerContactButton, ...(isCallPressed ? styles.buttonPressed : {})}} 
                        onClick={handleCall}
                        onMouseDown={() => setIsCallPressed(true)}
                        onMouseUp={() => setIsCallPressed(false)}
                        onMouseLeave={() => setIsCallPressed(false)}
                        onTouchStart={() => setIsCallPressed(true)}
                        onTouchEnd={() => setIsCallPressed(false)}
                        aria-label="Gọi điện cho cộng tác viên"
                    >
                        <PhoneCallIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

const TrackingStatusCard: React.FC<{ eta: number, hasArrived: boolean }> = ({ eta, hasArrived }) => (
     <div style={{...styles.bookingDetailCard, textAlign: 'center'}}>
        <p style={styles.etaText}>{hasArrived ? 'CTV đã đến nơi' : `Dự kiến đến trong ${eta} phút`}</p>
        <p style={styles.etaLabel}>{hasArrived ? 'CTV sẽ sớm bắt đầu công việc của bạn.' : 'CTV đang di chuyển đến vị trí của bạn'}</p>
    </div>
);


const TaskerTrackingScreen: React.FC<TaskerTrackingScreenProps> = ({ booking, onBack }) => {
    const [eta, setEta] = useState(15);
    const [hasArrived, setHasArrived] = useState(false);
    const { address, collaborator } = booking;
    const [isContactBtnPressed, setContactBtnPressed] = useState(false);
    const [isChatting, setIsChatting] = useState(false);
    
    const handleEtaChange = (newEta: number) => {
        setEta(newEta);
        if (newEta <= 0 && !hasArrived) {
            setHasArrived(true);
        }
    };

    if (isChatting) {
        return <ChatScreen tasker={collaborator} onBack={() => setIsChatting(false)} />;
    }

    return (
        <div style={{...styles.container, backgroundColor: '#f9f9f9'}}>
            <div style={{...styles.pageHeader, backgroundColor: '#f9f9f9', borderBottomColor: '#f0f0f0'}}>
                <button onClick={onBack} style={{...styles.backButton, fontSize: '28px', color: '#333'}}><BackArrowIcon /></button>
                <h2 style={styles.pageTitle}>Theo dõi CTV</h2>
                <div style={{width: '24px'}}></div>
            </div>
             <div style={{ padding: '0 15px' }}>
                <TrackingStatusCard eta={eta} hasArrived={hasArrived} />
                <TaskerTrackingMap 
                    start={collaborator.startLocation} 
                    end={address} 
                    onEtaChange={handleEtaChange}
                    hasArrived={hasArrived} 
                />
                <TaskerInfoCard collaborator={collaborator} onStartChat={() => setIsChatting(true)} />
                 {/* Support Card */}
                <div style={{...styles.bookingDetailCard, marginTop: '30px'}}>
                    <h3 style={{...styles.bookingDetailTitle, marginBottom: '15px'}}>Gọi tổng đài CSKH</h3>
                    <button
                        style={{...styles.supportButton, ...(isContactBtnPressed ? styles.buttonPressed : {})}}
                        onClick={() => window.location.href = 'tel:19001234'}
                        onMouseDown={() => setContactBtnPressed(true)}
                        onMouseUp={() => setContactBtnPressed(false)}
                        onMouseLeave={() => setContactBtnPressed(false)}
                    >
                        Liên Hệ Hỗ trợ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskerTrackingScreen;