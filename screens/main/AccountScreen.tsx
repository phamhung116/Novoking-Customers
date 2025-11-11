import React from 'react';
import { styles, PRIMARY_COLOR } from '../../utils/styles';

interface AccountScreenProps {
    user: any;
    setScreen: (screen: string) => void;
    handleLogout: () => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ user, setScreen, handleLogout }) => (
    <div style={{...styles.screenContent, position: 'relative', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '20px'}}>
            <div style={styles.profileAvatar}>👤</div>
            <div>
                <h3 style={{margin: 0}}>{user.fullName}</h3>
                <span onClick={() => setScreen('profile-view')} style={{...styles.link, textAlign: 'left', marginTop: '5px', display: 'inline-block'}}>Xem hồ sơ &gt;</span>
            </div>
        </div>
        <div style={{borderTop: '1px solid #f0f0f0'}}>
             <button 
                onClick={handleLogout} 
                style={{
                    ...styles.accountListItem, 
                    color: PRIMARY_COLOR,
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    font: 'inherit',
                    textAlign: 'left'
                }}
             >
                <span style={styles.accountListText}>Đăng xuất</span>
                <span>&gt;</span>
            </button>
        </div>
    </div>
);

export default AccountScreen;