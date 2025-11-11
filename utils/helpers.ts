// --- HELPER FUNCTIONS ---
export const formatAddress = (address: any): string => {
    if (!address || !address.streetNumber || !address.streetName || !address.ward || !address.city) return "";
    return `${address.streetNumber}, ${address.streetName}, P. ${address.ward}, ${address.city}`;
};

export const formatDateTime = (date: Date): string => {
    if (!date) return "";
    return new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds} giây trước`;
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    
    return new Intl.DateTimeFormat('vi-VN', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(date);
};