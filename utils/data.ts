// --- DATA ---
export const daNangWards = [
    "Hòa Hiệp Bắc", "Hòa Hiệp Nam", "Hòa Khánh Bắc", "Hòa Khánh Nam", "Hòa Minh",
    "Thanh Khê Tây", "Thanh Khê Đông", "Xuân Hà", "Chính Gián", "Thạc Gián", "An Khê",
    "Thanh Bình", "Thuận Phước", "Thạch Thang", "Hải Châu", "Phước Ninh", "Hòa Thuận Tây",
    "Bình Thuận", "Hòa Cường Bắc", "Hòa Cường Nam",
    "Thọ Quang", "Nại Hiên Đông", "Mân Thái", "An Hải Bắc", "Phước Mỹ", "An Hải Nam",
    "Mỹ An", "Khuê Mỹ", "Hoà Quý", "Hoà Hải",
    "Khuê Trung", "Hòa Phát", "Hòa An", "Hòa Thọ Tây", "Hòa Thọ Đông", "Hòa Xuân",
    "Hòa Bắc", "Hòa Liên", "Hòa Ninh", "Hòa Sơn", "Hòa Nhơn", "Hòa Phú",
    "Hòa Phong", "Hòa Châu", "Hòa Tiến", "Hòa Phước", "Hòa Khương"
];

export const services = [
    {
        id: 'dnd',
        name: 'Dọn dẹp nhà',
        description: 'Dọn dẹp nhà cửa cơ bản, lau chùi, hút bụi, làm sạch các bề mặt.',
        jobDetails: [
            'Lau bụi và lau tất cả các bề mặt',
            'Lau công tắc và tay cầm',
            'Lau sạch gương',
            'Sắp xếp lại giường cho gọn gàng (có thể thay khăn trải giường mới nếu bạn yêu cầu)',
            'Hút bụi và lau sàn'
        ],
        packages: [
            { hours: 2, price: 150000, name: 'Gói 2 giờ' },
            { hours: 3, price: 220000, name: 'Gói 3 giờ' },
            { hours: 4, price: 280000, name: 'Gói 4 giờ' },
        ]
    },
    {
        id: 'tvs',
        name: 'Tổng vệ sinh',
        description: 'Làm sạch sâu toàn bộ nhà cửa, bao gồm các khu vực khó tiếp cận.',
        jobDetails: [
            'Làm sạch sâu nhà bếp (tủ, bếp, bồn rửa)',
            'Tẩy rửa nhà vệ sinh (bồn cầu, vòi sen, bồn tắm)',
            'Lau cửa sổ và cửa ra vào',
            'Hút bụi kỹ các góc và khe kẽ',
            'Quét mạng nhện'
        ],
        packages: [
            { hours: 4, price: 400000, name: 'Gói 4 giờ' },
            { hours: 6, price: 580000, name: 'Gói 6 giờ' },
        ]
    },
    {
        id: 'vsml',
        name: 'Vệ sinh máy lạnh',
        description: 'Làm sạch và bảo dưỡng máy lạnh, giúp không khí trong lành hơn.',
        jobDetails: [
            'Vệ sinh dàn lạnh và lưới lọc',
            'Vệ sinh dàn nóng',
            'Kiểm tra và nạp gas (nếu cần thiết, có tính phí)',
            'Kiểm tra hoạt động tổng thể của máy'
        ],
        packages: [
            { units: 1, price: 200000, name: '1 máy' },
            { units: 2, price: 350000, name: '2 máy' },
        ]
    },
    {
        id: 'vssf',
        name: 'Vệ sinh sofa',
        description: 'Giặt và làm sạch sofa, loại bỏ vết bẩn và vi khuẩn.',
        jobDetails: [
            'Hút bụi bề mặt sofa',
            'Xử lý các vết bẩn cứng đầu',
            'Giặt sofa bằng dung dịch chuyên dụng',
            'Hút sạch nước bẩn bằng máy chuyên dụng',
            'Sấy khô sofa'
        ],
        packages: [
            { size: 'small', price: 300000, name: 'Sofa nhỏ' },
            { size: 'large', price: 500000, name: 'Sofa lớn' },
        ]
    },
    {
        id: 'vcn',
        name: 'Vệ sinh công nghiệp',
        description: 'Vệ sinh công nghiệp',
        jobDetails: [],
        packages: [{ price: 1000000, name: 'Gói cơ bản' }]
    },
    {
        id: 'dcn',
        name: 'Dịch vụ chuyển nhà',
        description: 'Dịch vụ chuyển nhà',
        jobDetails: [],
        packages: [{ price: 2000000, name: 'Gói cơ bản' }]
    }
];

// FIX: Add mockUserDatabase and promotions exports
export const mockUserDatabase: { [key: string]: any } = {
    '0905123456': {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        dob: '1990-01-15',
        gender: 'Nam',
        addresses: [
            { id: 1, streetNumber: '123', streetName: 'Lê Duẩn', ward: 'Hải Châu', city: 'TP Đà Nẵng', isDefault: true },
            { id: 2, streetNumber: '45', streetName: 'Nguyễn Văn Linh', ward: 'Thanh Khê Tây', city: 'TP Đà Nẵng', isDefault: false },
        ],
        bookings: [
            {
                id: 'NOVOKING-1678886400000',
                service: services.find(s => s.id === 'dnd'),
                package: services.find(s => s.id === 'dnd')!.packages[0],
                address: { id: 1, streetNumber: '123', streetName: 'Lê Duẩn', ward: 'Hải Châu', city: 'TP Đà Nẵng', isDefault: true },
                dateTime: new Date('2023-03-15T09:00:00'),
                notes: 'Lau kỹ cửa sổ nhé.',
                paymentMethod: 'Tiền mặt (COD)',
                promoCode: 'NOVOKING20',
                status: 'Đã hoàn thành',
                price: 130000,
                isRated: true,
                ratingData: {
                    stars: 5,
                    text: 'Cộng tác viên làm việc rất chuyên nghiệp và cẩn thận. Nhà cửa sạch bong!',
                    tags: ['Thái độ tốt', 'Làm việc hiệu quả', 'Cẩn thận, tỉ mỉ'],
                    images: [],
                    timestamp: new Date('2023-03-15T12:30:00'),
                },
                history: [
                    { status: 'Đang chờ CTV', timestamp: new Date('2023-03-14T10:00:00') },
                    { status: 'CTV đã nhận', timestamp: new Date('2023-03-14T11:00:00') },
                    { status: 'Đang thực hiện', timestamp: new Date('2023-03-15T09:00:00') },
                    { status: 'Đã hoàn thành', timestamp: new Date('2023-03-15T11:00:00') },
                ]
            }
        ],
    },
    '0708445398': {
        fullName: 'Hà My',
        email: 'mytran024@gmail.com',
        dob: '1998-05-20',
        gender: 'Nữ',
        addresses: [
            { id: 1, streetNumber: '88', streetName: 'Trưng Nữ Vương', ward: 'Hòa Thuận Tây', city: 'TP Đà Nẵng', isDefault: true },
        ],
        bookings: [],
    },
};

export const promotions = [
    { id: 'NOVOKING20', type: 'percentage', value: 20, maxDiscount: 20000, description: 'Giảm 20% tối đa 20k' },
    { id: 'GIAM30K', type: 'fixed', value: 30000, description: 'Giảm thẳng 30k' },
];


export const novokingLogoUrl = "https://novoking.vn/wp-content/uploads/2022/09/LOGO-NOVOKING-2021-nho.png";

// --- MOCK BOOKING FOR TRACKING FEATURE ---
const mockTrackingAddress = {
    id: 99,
    streetNumber: '32',
    streetName: 'Âu Cơ',
    ward: 'Hòa Khánh Bắc',
    city: 'TP Đà Nẵng',
    isDefault: false,
    // Add coordinates for mapping
    lat: 16.076,
    lng: 108.151,
};

export const mockTrackingBooking = {
    id: 'MOCK-TRACKING-12345',
    service: services.find(s => s.id === 'dnd'),
    package: services.find(s => s.id === 'dnd')!.packages[0],
    address: mockTrackingAddress,
    dateTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    notes: 'Đây là booking giả lập để kiểm tra tính năng theo dõi. Vui lòng bỏ qua.',
    paymentMethod: 'Tiền mặt (COD)',
    promoCode: null,
    status: 'CTV đang di chuyển', // Matches condition to show map
    price: 183000,
    collaborator: {
        name: 'Trần Văn Bình',
        phone: '0987 654 321',
        rating: 4.9,
        // Add start location for tracking simulation
        startLocation: {
            lat: 16.060,
            lng: 108.180,
        },
    },
    history: [
        { status: 'Đang chờ CTV', timestamp: new Date(Date.now() - 10 * 60 * 1000) }, // 10 mins ago
        { status: 'CTV đã nhận', timestamp: new Date(Date.now() - 2 * 60 * 1000) }, // 2 mins ago
        { status: 'CTV đang di chuyển', timestamp: new Date(Date.now()) },
    ],
    // Add a flag to easily identify this special booking
    isTrackable: true,
};

// --- MOCK BOOKING FOR RATING FEATURE ---
export const MOCK_COMPLETED_BOOKING = {
    id: 'MOCK-RATING-56789',
    service: services.find(s => s.id === 'tvs'),
    package: services.find(s => s.id === 'tvs')!.packages[0],
    address: { id: 1, streetNumber: '123', streetName: 'Lê Duẩn', ward: 'Hải Châu', city: 'TP Đà Nẵng', isDefault: true },
    dateTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    notes: 'Đây là booking giả lập để kiểm tra tính năng đánh giá.',
    paymentMethod: 'Tiền mặt (COD)',
    promoCode: null,
    status: 'Đã hoàn thành',
    price: 433000,
    collaborator: {
        name: 'Nguyễn Thị Cúc',
        phone: '0912 987 654',
        rating: 4.8,
        avatarUrl: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/490182216_1227811656011444_5117381466698244513_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=n4RkM-Fs1YYQ7kNvwFTiUF7&_nc_oc=AdlhXhSikObWONdd9hbIJWUKiFt3SHgx2eJoTPGN1Ne0b-XM0oTSA9Zc6KI4vKHQ-8PjR7vVs93cnHY2jzjyzzTX&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=PhVz9xcjX82uYpNyqgOfmQ&oh=00_AfiDOcwEVuhABa0PBXi43hWxjnH6DCApnl3vzED0z_48Cg&oe=691386F9'
    },
    history: [
        { status: 'Đang chờ CTV', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 120 * 60 * 1000) },
        { status: 'CTV đã nhận', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 110 * 60 * 1000) },
        { status: 'Đang thực hiện', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        { status: 'Đã hoàn thành', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 240 * 60 * 1000) },
    ],
    isRated: false, // Key to trigger the rating feature
};

// --- MOCK NOTIFICATIONS ---
export const mockActivityNotifications = [
    {
        id: 'act-1',
        type: 'activity',
        title: 'CTV đã nhận việc',
        message: 'Booking MOCK-TRACKING-12345 đã được nhận bởi CTV Trần Văn Bình. CTV sẽ sớm di chuyển đến chỗ bạn.',
        bookingId: 'MOCK-TRACKING-12345',
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
        read: false,
    },
    {
        id: 'act-2',
        type: 'activity',
        title: 'Booking đã hoàn thành',
        message: 'Booking NOVOKING-1678886400000 đã được hoàn thành. Cảm ơn bạn đã sử dụng dịch vụ. Vui lòng đánh giá để giúp chúng tôi cải thiện.',
        bookingId: 'NOVOKING-1678886400000',
        timestamp: new Date('2023-03-15T11:05:00'),
        read: true,
    },
     {
        id: 'act-3',
        type: 'activity',
        title: 'Booking đã được tạo',
        message: 'Bạn đã tạo thành công booking MOCK-RATING-56789. Chúng tôi đang tìm kiếm CTV phù hợp.',
        bookingId: 'MOCK-RATING-56789',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 - 120 * 60 * 1000), // from mock data
        read: true,
    }
];

export const mockSystemNotifications = [
    {
        id: 'sys-1',
        type: 'promo',
        title: 'Ưu đãi cuối tuần - Giảm 20%!',
        message: 'Nhập mã WEEKEND20 để được giảm giá 20% (tối đa 30k) cho tất cả các dịch vụ dọn dẹp nhà cửa vào thứ Bảy và Chủ nhật tuần này. Đừng bỏ lỡ!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: false,
    },
    {
        id: 'sys-2',
        type: 'news',
        title: 'Cập nhật chính sách mới',
        message: 'Novoking đã cập nhật một số chính sách về việc hủy booking và hỗ trợ khách hàng. Vui lòng xem chi tiết trong mục Điều khoản Dịch vụ để biết thêm thông tin.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        read: true,
    },
    {
        id: 'sys-3',
        type: 'promo',
        title: 'Giới thiệu bạn bè, nhận ngay 50k',
        message: 'Chia sẻ mã giới thiệu của bạn cho bạn bè. Khi họ hoàn thành booking đầu tiên, cả hai sẽ nhận được voucher 50,000đ cho lần đặt dịch vụ tiếp theo.',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        read: true,
    },
];