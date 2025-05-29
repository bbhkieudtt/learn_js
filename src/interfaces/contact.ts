/** Lưu dữ liệu contact */
export interface Contact {
    /** ID bản ghi dạng UUID */
    id?: string

    /** ID định danh khách hàng */
    identifier_id?: string

    /** id được hash ra từ avatar */
    hash_id?: string

    /** Tên gọi */
    first_name?: string

    /** Tên họ */
    last_name?: string

    /** Ảnh đại diện */
    avatar?: string

    /** Gợi ý số điện thoại */
    suggest_phone?: string

    /** Danh sách sdt */
    phones?: string[]

    /** Gợi ý email */
    suggest_email?: string

    /** Danh sách email */
    emails?: string[]

    /** Gợi ý psid */
    suggest_psid?: string

    /** Danh sách psid */
    psids?: string[]

    /** Gợi ý page_id */
    suggest_page_id?: string

    /** Danh sách page_id */
    page_ids?: string[]

    /** Danh sách label_id */
    label_ids?: string[]

    /** Danh sách địa chỉ */
    addresses?: any[]

    /** Giới tính */
    gender?: string

    /** Sinh nhật */
    birthday?: Date | string

    /** Tên công ty */
    company?: string

    /** ID doanh nghiệp */
    business_id?: string

    /** ID chi nhánh */
    branch_id?: string

    /** ID Phòng ban */
    department_id?: string

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string

    /** ID nhân viên */
    employee_id?: string

    /** ID user */
    user_id?: string

    /** Danh sách SDT đã được xác thực */
    verified_phones?: string[]

    /** Danh sách email đã được xác thực */
    verified_emails?: string[]

    /** Danh sách nhân viên đã được assign vào */
    assigned_employees?: string[]

    /** Thời gian tạo record */
    createdAt?: Date

    /** Thời gian cập nhật record */
    updatedAt?: Date

    /** Thời gian tạo Note cuối cùng */
    last_time_note?: Date

    /** Thông tin người đọc note */
    unread?: {
        [user_id: string]: {
            is_read: boolean
            last_time_read: Date
        }
    }

    /** Tên gợi nhớ theo user */
    alias_names?: {
        [user_id: string]: {
            display_name: string
            search_name: string
        }
    }

    /** Dữ liệu gim trên contact */
    pin_content?: string

    /** Trạng thái tính thu nhập cho marketing */
    marketing_income?: boolean

    /** Dữ liệu tên để tìm kiếm */
    search_name?: string;

    /** Gợi ý fb_user_id */
    suggest_fb_user_id?: string;

    /** Danh sách fb_user_id */
    fb_user_ids?: string[];

    /** Gợi ý chatbox client id */
    suggest_chatbox_client_id?: string;

    /** Danh sách chatbox client ids */
    chatbox_client_ids?: string[];

    /** Trạng thái khách hàng */
    stage?: CustomerStage;

    /** Gắn nhãn ưu tiên */
    priority_level_labels?: any[]; // Kiểu chưa rõ, dùng any[]

    /** Thời gian lần cuối liên hệ */
    last_contacted?: Date;

    /** Thời gian phản hồi khách hàng (unix timestamp) */
    customer_response_time?: number;

    /** Tổng số đơn hàng */
    total_orders?: number;

    /** Tổng doanh thu */
    total_revenue?: number;

    /** Tổng tiền còn phải thu */
    total_unpaid?: number;

    /** Tổng tiền phải hoàn lại */
    total_refund?: number;

    /** Tổng số ticket */
    total_tickets?: number;

    /** Ghi chú nội bộ */
    internal_note?: string;

    /** Nguồn khách hàng */
    customer_source?: string;

    /** Đánh giá của khách hàng */
    customer_rating?: keyof typeof CustomerRating;

    /** Trạng thái khách hàng */
    customer_status?: keyof typeof CustomerStatus;

    /** Danh sách công ty */
    companies?: any[]; // Kiểu chưa rõ, dùng any[]

    /** Trạng thái kết bạn Zalo */
    add_zalo_friend?: boolean;

    /** Quan hệ với bảng cache query */
    cache_query?: any[]; // Kiểu chưa rõ, dùng any[]

    /** Lịch sử sử dụng mã khuyến mãi */
    promotion_usage_histories?: any[]; // Kiểu chưa rõ, dùng any[]

    /** Điểm tích lũy */
    loyalty_points?: number;

    /** Lịch sử tích điểm */
    loyalty_points_histories?: any[]; // Kiểu chưa rõ, dùng any[]

    /** Danh sách mã khuyến mãi gán cho khách hàng */
    promotions?: any[]; // Kiểu chưa rõ, dùng any[]
}

/** 
 * Dữ liệu activity
 */
export interface Activity {
    /** ID bản ghi dạng UUID */
    id?: string

    /** Dạng dữ liệu activity */
    type: 'CREATE' | 'UPDATE' | 'DELETE' | 'GET'

    /** ID liên hệ người dùng thao tác */
    contact_id?: string

    /** Dữ liệu người dùng thao tác */
    data?: { [index: string]: string }

    /** ID doanh nghiệp */
    business_id?: string

    /** ID chi nhánh */
    branch_id?: string

    /** ID Phòng ban */
    department_id?: string

    /** ID đội nhóm (dữ liệu này lúc có lúc không) */
    team_id?: string

    /** ID nhân viên */
    employee_id?: string

    /** ID user */
    user_id?: string

    /** Thời gian tạo record */
    createdAt?: Date

    /** Thời gian cập nhật record */
    updatedAt?: Date
}

/** Danh sách key được suggest */
export type view_keys = 'suggest_phone' |
    'suggest_email' |
    'suggest_psid' |
    'suggest_page_id'

/** Danh sách key được mã hóa */
export type encrypt_keys = 'phone' | 'email' | 'psid' | 'page_id'

/** Dữ liệu data upload */
export interface ContactUpload {
    'Tên liên hệ'?: string;
    'Số điện thoại'?: string;
    'Email'?: string;
    'PSID'?: string;
    'PAGE_ID'?: string;
    'Giới tính'?: string;
    'Ngày sinh'?: string;
    'Địa chỉ'?: string;
    'Tên công ty'?: string;
    'Nhân viên phụ trách'?: string;
    'Nhãn'?: string;
}

/** Dữ liệu import contact */
export interface ContactHandle {

    /** Tên gọi */
    first_name?: string

    /** Danh sách sdt */
    phones?: string[]

    /** Danh sách email */
    emails?: string[]

    /** Danh sách psid */
    psids?: string[]

    /** Danh sách page_id */
    page_ids?: string[]

    /** Giới tính */
    gender?: string

    /** Sinh nhật */
    birthday?: Date | string

    /** Địa chỉ */
    addresses?: [{
        address?: string,
        province?: string,
        district?: string,
        ward?: string
        phone?: string
        name?: string
    }]

    /** Tên công ty */
    company?: string

    /** Danh sách nhân viên đã được assign vào */
    assigned_employees?: string[]

    /** Labels */
    label_ids?: string[]
}

/** Thông tin nhãn */
export interface Label {
    /** Id bản ghi */
    id?: string
    /** Id nhãn */
    label_id?: string
    /** Màu nhãn */
    bg_color?: string
    /** Id page */
    fb_page_id?: string
    /** Màu chữ */
    text_color?: string
    /** Tên nhãn */
    title?: string
    /** Thời gian update */
    updatedAt?: string
    /** Time tạo */
    createdAt?: string
}

export enum CustomerStage {
    /** Đang xử lý */
    IN_PROGRESS = 'IN_PROGRESS',
    /** Đăng ký */
    REGISTERED = 'REGISTERED',
    /** Tiềm năng */
    PROSPECT = 'PROSPECT',
    /** Đã mua hàng */
    PURCHASED = 'PURCHASED',
    /** Trung thành */
    LOYAL = 'LOYAL',
}

export enum CustomerRating {
    /** Rất không hài lòng */
    VERY_DISSATISFIED = 'VERY_DISSATISFIED',
    /** Không hài lòng */
    DISSATISFIED = 'DISSATISFIED',
    /** Bình thường */
    NEUTRAL = 'NEUTRAL',
    /** Hài lòng */
    SATISFIED = 'SATISFIED',
    /** Rất hài lòng */
    VERY_SATISFIED = 'VERY_SATISFIED',
}

export enum CustomerStatus {
    /** Mở */
    OPEN = 'OPEN',
    /** Đang xử lý */
    PENDING = 'PENDING',
    /** Đã giải quyết */
    RESOLVED = 'RESOLVED',
    /** Đã đóng */
    CLOSED = 'CLOSED',
}