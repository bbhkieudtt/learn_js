import type { Contact } from '@/interfaces'

/** Dữ liệu note */
export interface Note {
  /** ID bản ghi dạng UUID */
  id: string

  /** ID contact bản ghi dạng UUID */
  contact_id: string

  /** Nội dung note */
  content: string

  /** ID doanh nghiệp */
  business_id?: string

  /** ID chi nhánh */
  branch_id?: string

  /** ID Phòng ban */
  department_id?: string

  /** ID đội nhóm (dữ liệu này lúc có lúc không) */
  team_id?: string

  /** ID nhân viên */
  employee_id: string

  /** ID user */
  user_id?: string

  /** Thời gian tạo record */
  createdAt?: Date

  /** Thời gian cập nhật record */
  updatedAt?: Date

  /** Reaction */
  reaction?: number

  /** Hiển thị thông tin */
  show_editor?: boolean

  /** Gắn cờ có phải là dạng nested hay không */
  is_nested?: boolean

  /** Danh sách bình luận của note */
  comments?: Note[]

  /** ID note cha */
  parent_id?: string

  /** Đánh dấu là template */
  is_template?: boolean

  /** Mở rộng comment */
  expand_cmt?: boolean

  /** Trạng thái là khách hàng comment */
  is_customer?: boolean

  /** id cuộc gọi thoại */
  call_id?: string

  /** thông tin cuộc gọi thoại */
  call_info?: CallHistory
}

/** Lịch sử cuộc gọi */
export interface CallHistory {
  /** ID bản ghi dạng UUID */
  id?: string

  /** ID cuộc gọi (Do bên thứ 3 cung cấp) */
  call_id?: string

  /** Dạng lịch sử cuộc gọi */
  call_type?: keyof typeof CallHistoryType

  /** Sip account_id */
  sip_account_id?: string

  /** Thông tin tài khoản SIP */
  sip_account_info?: SipAccount

  /** Trạng thái cuộc gọi */
  call_status?: keyof typeof CallStatus

  /** ID contact */
  contact_id?: string | null

  /** Thông tin contact */
  contact_info?: Contact

  /** Số điện thoại gọi đi */
  outgoing_number?: string

  /** Số điện thoại nhận cuộc gọi */
  destination_number?: string

  /** Dữ liệu file ghi âm */
  recording_url?: string

  /** Thời gian bắt đầu cuộc gọi */
  start_time?: Date

  /** Thời gian kết thúc cuộc gọi */
  end_time?: Date
  
  /**Danh sách nhãn */
  labels?: string[]

  /** Thời lượng cuộc gọi (tính bằng giây) */
  duration?: number

  /** Trạng thái xóa bản ghi */
  archived?: boolean

  /** ID doanh nghiệp */
  business_id?: string

  /** ID chi nhánh */
  branch_id?: string

  /** ID Phòng ban */
  department_id?: string

  /** ID đội nhóm */
  team_id?: string

  /** ID nhân viên */
  employee_id?: string

  /** ID user */
  user_id?: string

  /** Thời gian tạo record */
  createdAt?: Date

  /** Thời gian cập nhật record */
  updatedAt?: Date

  /** ID của người gọi */
  hash_phone?: string

  /** Thông tin chatbox */
  chatbox_info?: {}
}

/** Dạng lịch sử cuộc gọi */
export enum CallHistoryType {
  /** Cuộc gọi đi */
  OUTGOING = 'OUTGOING',
  /** Cuộc gọi đến */
  INCOMING = 'INCOMING',
}

/** Trạng thái cuộc gọi */
export enum CallStatus {
  /** Máy bận */
  BUSY = 'BUSY',
  /** Đã kết thúc */
  ENDED = 'ENDED',
  /** Đã hủy */
  CANCELED = 'CANCELED',
  /** Đã trả lời */
  ANSWERED = 'ANSWERED',
  /** Không trả lời */
  NO_ANSWER = 'NO_ANSWER',
}

/** Thông tin tài khoản sip */
export interface SipAccount {
  /** ID bản ghi dạng UUID */
  id?: string

  /** Nhà cung cấp dịch vụ */
  vendor?: string

  /** Số điện thoại */
  phone_number?: string

  /** Tên tài khoản */
  username?: string

  /** Mật khẩu */
  password?: string

  /** Domain dịch vụ */
  uri_domain?: string

  /** Domain socket nhận event */
  uri_socket?: string

  /** Domain server đăng ký */
  registrar_server?: string

  /** Địa chỉ proxy sip account */
  outbound_proxy_set?: string

  /** Mô tả */
  description?: string

  /** Trạng thái */
  active?: boolean

  /** Danh sách nhân viên được assign */
  employees?: any

  /** Đánh dấu là gọi đi */
  is_call_out?: boolean

  /** Đánh dấu là gọi đến */
  is_call_in?: boolean

  /** Trạng thái xóa bản ghi */
  archived?: boolean

  /** ID doanh nghiệp */
  business_id?: string

  /** ID chi nhánh */
  branch_id?: string

  /** ID Phòng ban */
  department_id?: string

  /** ID đội nhóm */
  team_id?: string

  /** ID nhân viên */
  employee_id?: string

  /** ID user */
  user_id?: string

  /** Thời gian tạo record */
  createdAt?: Date

  /** Thời gian cập nhật record */
  updatedAt?: Date

  /** Lịch sử gọi điện */
  call_histories?: CallHistory[]
}
