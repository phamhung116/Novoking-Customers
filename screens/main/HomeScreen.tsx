import React, { useState } from 'react';
import { styles } from '../../utils/styles';
import { services } from '../../utils/data';

interface HomeScreenProps {
    user: any; 
    onSelectService: (service: any) => void;
}

// --- SVG Icon Components ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);

// Dọn dẹp nhà (House Cleaning) - Mop Icon
const DndIcon = () => (
    <img 
        src="https://i.imgur.com/hg9CgKJ.png" 
        alt="Dọn dẹp nhà" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
);

// Tổng vệ sinh (Deep Cleaning) - Sparkling House Icon
const TvsIcon = () => (
    <img 
        src="https://i.imgur.com/pzjCOWB.png" 
        alt="Tổng vệ sinh" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
);

// Vệ sinh máy lạnh (AC Cleaning) - AC Unit Icon
const VsmlIcon = () => (
    <img 
        src="https://i.imgur.com/IULUJdN.png" 
        alt="Vệ sinh máy lạnh" 
        style={{ width: '120%', height: '120%', objectFit: 'contain' }}
    />
);

// Vệ sinh sofa (Sofa Cleaning) - Sofa Icon
const VssfIcon = () => (
    <img 
        src="https://i.imgur.com/yFm7qgF.jpeg" 
        alt="Vệ sinh sofa" 
        style={{ width: '110%', height: '110%', objectFit: 'contain' }}
    />
);

const VcnIcon = () => (
    <img 
        src="https://i.imgur.com/qshpKdf.png" 
        alt="Vệ sinh công nghiệp" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
);
const DcnIcon = () => (
   <img 
        src="https://i.imgur.com/2ckLrh6.png" 
        alt="DỊch vụ chuyển nhà" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
);
const serviceIcons: { [key: string]: React.FC } = {
    'dnd': DndIcon,
    'tvs': TvsIcon,
    'vsml': VsmlIcon,
    'vssf': VssfIcon,
    'vcn': VcnIcon,
    'dcn': DcnIcon
};

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onSelectService }) => {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const quickActions = ["Dọn dẹp nhanh", "Vệ sinh sofa", "Máy lạnh", "Tổng vệ sinh"];

    const handleQuickActionClick = (action: string) => {
        let query = action;
        // Map chip text to a searchable keyword.
        if (action === "Dọn dẹp nhanh") {
            query = "Dọn dẹp";
        } else if (action === "Máy lạnh") {
            query = "Máy lạnh";
        }
        setSearchQuery(query);
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    return (
        // Use a wrapper div that doesn't have the default screen padding
        <div>
            {/* New Sticky Header */}
            <div style={styles.homeHeaderContainer}>
                <div style={styles.homeHeaderLeft}>
                    <div style={styles.homeAvatar}>👤</div>
                    <div style={styles.homeGreetingContainer}>
                        <p style={styles.homeGreeting}>Novoking xin chào,</p>
                        <h2 style={styles.homeUserName}>{user.fullName.split(' ').pop()}</h2>
                    </div>
                </div>
            </div>

            {/* New Search Bar */}
            <div style={styles.homeSearchContainer}>
                 <span style={styles.homeSearchIcon}><SearchIcon /></span>
                <input 
                    type="text" 
                    placeholder="Bạn cần dịch vụ gì hôm nay?" 
                    style={styles.homeSearchInput} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* New Quick Actions */}
            <div style={styles.homeQuickActionsContainer}>
                {quickActions.map(action => (
                    <div 
                        key={action} 
                        style={styles.homeQuickActionChip}
                        onClick={() => handleQuickActionClick(action)}
                    >
                        {action}
                    </div>
                ))}
            </div>

            <h3 style={styles.homeSectionTitle}>Dịch vụ chính</h3>

            {filteredServices.length > 0 ? (
                <div style={styles.homeServiceGrid}>
                    {filteredServices.map(service => {
                        const IconComponent = serviceIcons[service.id];
                        return (
                             <div 
                                key={service.id} 
                                onClick={() => onSelectService(service)}
                                onMouseDown={() => setActiveCard(service.id)}
                                onMouseUp={() => setActiveCard(null)}
                                onMouseLeave={() => setActiveCard(null)} // For desktop users
                                onTouchStart={() => setActiveCard(service.id)}
                                onTouchEnd={() => setActiveCard(null)}
                                style={{
                                    ...styles.serviceCard,
                                    ...(activeCard === service.id ? { 
                                        transform: 'scale(0.97)', 
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
                                    } : {})
                                }}
                            >
                                <div style={styles.serviceCardIcon}>
                                    {IconComponent ? <IconComponent /> : <span style={{fontSize: '36px'}}>⭐️</span>}
                                </div>
                                <span style={styles.serviceCardLabel}>{service.name}</span>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                    Không tìm thấy dịch vụ nào phù hợp.
                </p>
            )}
        </div>
    );
};

export default HomeScreen;