<template>
  <div ref="infiniteList" class="max-w-2xl mx-auto p-5 max-h-[80vh] overflow-y-auto">
    <div v-for="item in items" :key="item.call_id" class="p-4 mb-4 bg-gray-100 rounded-lg">
      <div class="flex flex-col gap-2">
        <div>
          <span class="font-semibold">Mã cuộc gọi:</span>
          {{ item.call_id || 'Không có' }}
        </div>
        <div>
          <span class="font-semibold">Thời lượng:</span>
          {{ item.duration ? `${item.duration} giây` : 'Không có' }}
        </div>
        <div>
          <span class="font-semibold">Mã SIP:</span>
          {{ item.sip_account_id || 'Không có' }}
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center p-5 text-gray-600">Đang tải...</div>
    <div v-if="error" class="text-center p-5 text-red-500">
      {{ error }}
      <button @click="retryFetch" class="ml-2 text-blue-500 underline">Thử lại</button>
    </div>
    <div v-if="!isLoading && items.length === 0" class="text-center p-5 text-gray-600">
      Không tìm thấy cuộc gọi.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

/*** Khởi tạo danh sách cuộc gọi ***/
const items = ref([])

/*** Khởi tạo biến trang hiện tại ***/
const page = ref(1)

/*** Khởi tạo trạng thái đang tải ***/
const isLoading = ref(false)

/*** Khởi tạo biến lưu lỗi ***/
const error = ref(null)

/*** Khởi tạo cờ dừng cuộn vô hạn ***/
const isStop = ref(false)

/*** Cấu hình URL API ***/
const host = 'https://api-contact.merchant.vn'

/*** Cấu hình token API ***/
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4bm9kZSI6InRlbmFudF83OTQyOTU0OCIsInVzZXJfaWQiOiI2NmZlNTEyYWZkZTM1NDRjYmIyODE0MDkiLCJlbXBsb3llZV9pZCI6IjY3MmQ5ZTg0ZmRlMzU0NGNiYjk0MGZiMiIsImJyYW5jaF9pZCI6IjY3MmQ5ZTg0ZmRlMzU0NGNiYjk0MGY4OSIsImJ1c2luZXNzX2lkIjoiNjZmZTUxMmFmZGUzNTQ0Y2JiMjgxNDEyIiwicGVybWlzc2lvbl9pZCI6IjY3MmQ5ZTg0ZTI2NmQyYmIxMGVhYThkMyIsImRlcGFydG1lbnRfaWQiOiI2NzJkOWU4NGUyNjZkMmJiMTBlYWE4ZDAiLCJpc19vd25lcl9idXNpbmVzcyI6ZmFsc2UsImlhdCI6MTc0ODA1MzkxNywiZXhwIjoxNzU1ODI5OTE3fQ.kga8Uwk6XbxuDn-rQyvEtsklU0vNNy4gXU28IrfnsEg'

/*** Cấu hình số lượng bản ghi mỗi trang ***/
const limit = 20

/*** Hàm gọi API để lấy dữ liệu cuộc gọi ***/
const fetchItems = async (pageNum) => {
  try {
    /*** Tính toán dựa trên trang hiện tại ***/
    const skip = (pageNum - 1) * limit
    
    /*** Gửi yêu cầu POST đến API ***/
    const response = await fetch(`${host}/call/get_call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Token-Business': token
      },
      body: JSON.stringify({ skip, limit })
    })

    /*** Kiểm tra trạng thái phản hồi ***/
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! trạng thái: ${response.status}`)
    }

    /*** Lấy dữ liệu từ phản hồi ***/
    const data = await response.json()
    
    /*** Lấy danh sách cuộc gọi hoặc mảng rỗng nếu không có dữ liệu ***/
    const newItems = data.data || []

    /*** Kiểm tra nếu không còn dữ liệu để dừng cuộn ***/
    if (newItems.length < limit) {
      isStop.value = true
    }

    /*** Trả về danh sách cuộc gọi mới ***/
    return newItems
  } catch (err) {
    /*** Ném lỗi nếu gọi API thất bại ***/
    throw new Error(`Lỗi khi tải dữ liệu: ${err.message}`)
  }
}

/*** Hàm lấy danh sách cuộc gọi và cập nhật state ***/
const getContact = async () => {
  /*** Ngăn gọi API nếu đang tải hoặc hết dữ liệu ***/
  if (isStop.value || isLoading.value) return
  
  /*** Bật trạng thái đang tải ***/
  isLoading.value = true
  
  try {
    /*** Lấy dữ liệu từ API ***/
    const newItems = await fetchItems(page.value)
    
    /*** Thêm dữ liệu mới vào danh sách ***/
    items.value = [...items.value, ...newItems]
    
    /*** Tăng số trang ***/
    page.value += 1
    
    /*** Xóa lỗi nếu thành công ***/
    error.value = null
  } catch (err) {
    /*** Lưu thông báo lỗi ***/
    error.value = err.message
  } finally {
    /*** Tắt trạng thái đang tải ***/
    isLoading.value = false
  }
}

/*** Hàm thử lại khi gặp lỗi ***/
const retryFetch = () => {
  /*** Xóa lỗi ***/
  error.value = null
  
  /*** Gọi lại API ***/
  getContact()
}

/*** Tải dữ liệu khi component được mount ***/
onMounted(() => {
  getContact()
})

/*** Khởi tạo tham chiếu cho phần tử cuộn ***/
const infiniteList = ref(null)

/*** Cấu hình cuộn vô hạn ***/
useInfiniteScroll(
  infiniteList,
  () => {
    /*** Tải thêm dữ liệu nếu chưa hết và không đang tải ***/
    if (!isStop.value && !isLoading.value) {
      getContact()
    }
  },
  // Kích hoạt khi cách đáy 200px
  { distance: 200 } 
)
</script>