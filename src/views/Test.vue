<template>
    <div class="text-center flex justify-between gap-y-32">
        <div>
            <h2>Bài 1 Danh sách sản phẩm</h2>
            <input v-model.number="filterPrice" type="number" placeholder="Ngưỡng giá" />
            <button @click="is_ascending = !is_ascending">
                Sắp xếp: {{ is_ascending ? 'Tăng dần' : 'Giảm dần' }}
            </button>
            <ul>
                <li v-for="product in filter_products" :key="product.id">
                    {{ product.name }} - {{ product.price }}$
                </li>
            </ul>
        </div>
        <div class="flex flex-col gap-y-4">
            <h2>Bài 2 Danh sách công việc</h2>
            <!-- menu -->
            <div class="grid grid-cols-3 gap-4">
                <select name="" id="" v-model="filter_priority">
                    <option value="">Tất cả</option>
                    <option value="Thấp">Thấp</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Cao">Cao</option>
                </select>
                <button @click="is_ascending_time = !is_ascending_time"
                    class="bg-blue-400 text-white px-4 py-2 rounded">
                    Sắp xếp theo thời gian {{ is_ascending_time ? 'Tăng dần' : 'Giảm dần' }}
                </button>
                <button class="bg-blue-400 text-white px-4 py-2 rounded">Thêm công việc</button>
            </div>
            <!-- danh sách task -->
             <ul>
                <li v-for="task in filter_tasks" :key="task.id"
                    class="flex justify-between items-center bg-slate-200 p-4 rounded">
                    <div>
                        <h3>{{ task.name }}</h3>
                        <p>Độ ưu tiên: {{ task.priority }}</p>
                        <p>Thời gian tạo: {{ new Date(task.createdAt).toLocaleString() }}</p>
                    </div>
                    <button class="bg-red-500 text-white px-4 py-2 rounded">Xóa</button>
                </li>
             </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
/**Định nghĩa interface cho product*/
interface IProduct {
    id: number;
    name: string;
    price: number;
}

/**Bai 1Lọc và sắp xếp mảng*/
/**Danh sách sản phẩm*/
const products = ref<IProduct[]>([
    { id: 1, name: 'Sản phẩm A', price: 30 },
    { id: 2, name: 'Sản phẩm B', price: 70 },
    { id: 3, name: 'Sản phẩm C', price: 20 },
    { id: 4, name: 'Sản phẩm D', price: 90 },
]);

/**Biến giá trị để lọc giá*/
const filterPrice = ref(0);

/**Biến kiểm tra mảng hiện tăng hay giảm*/
const is_ascending = ref(true);

/**Biến kiểm tra lọc theo mức độ ưu tiên*/
const filter_priority = ref(""); 

/**Biến danh sách sau khi lọc và sắp xếp*/
const filter_products = computed(() => {
    /**lọc sản phẩm theo giá*/
    const FILTERED = products.value.filter((product) => product.price > filterPrice.value);

    // Tạo bản sao và sắp xếp sản phẩm theo giá
    return [...FILTERED].sort((a, b) => {
        return is_ascending.value ? a.price - b.price : b.price - a.price;
    });
})

/**Bai2 */
interface ITask {
    id: number;
    name: string;
    priority: "Thấp" | "Trung bình" | "Cao";
    createdAt: string;
}

/**Danh sách công việc*/
const TASKS = ref<ITask[]>([
    { id: 1, name: "Hoàn thành báo cáo", priority: "Cao", createdAt: "2025-05-15T09:00:00" },
    { id: 2, name: "Gửi email cho khách hàng", priority: "Trung bình", createdAt: "2025-05-15T10:30:00" },
    { id: 3, name: "Mua đồ dùng văn phòng", priority: "Thấp", createdAt: "2025-05-15T11:15:00" },
    { id: 4, name: "Họp nhóm", priority: "Cao", createdAt: "2025-05-15T14:00:00" },
]);

/**Biến sắp xếp theo thơi gian*/
const is_ascending_time = ref(true);

/**Danh sách công việc sau khi sắp xếp*/
const filter_tasks = computed(() => {
    /**lọc công việc theo độ ưu tiên*/
     const FILTERED = TASKS.value.filter((task) => {
        if (filter_priority.value === "") 
        // Nếu không có độ ưu tiên nào được chọn, trả về tất cả công việc
        return true;
        // Nếu có độ ưu tiên được chọn, chỉ trả về công việc có độ ưu tiên đó
        return task.priority === filter_priority.value;
    });
    // Tạo bản sao và sắp xếp công việc theo thời gian
    return [...FILTERED].sort((a, b) => {
        return is_ascending_time.value ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
})

/**Tính tổng các số từ 1 đến n*/
function sunNumber(n: number) {
    // gán tổng bằng 0
    let sum = 0
    // lặp từ 1 đến n
    for (let i = 1; i <= n; i++) {
        // cộng dồn vào tổng
        sum += i
    }
    // trả về tổng
    return sum
}

console.log('sumNumber(10):', sunNumber(10));

/**Kiểm tra một số có phải số nguyên tố không
 * Số nguyên tố là số lớn hơn 1 và chỉ chia hết cho 1 và chính nó
 * @param n số cần kiểm tra
*/
function isPrime(num: number) {
    // nếu số nhỏ hơn 2 thì không phải số nguyên tố
    if (num < 2) return false
    // lặp từ 2 đến căn bậc 2 của số
    // nếu số chia hết cho i thì không phải số nguyên tố
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
    }
}

console.log('isPrime(7):', isPrime(7));

/**Đảo ngược chuỗi không dùng reverse()*/
function reverseString(str: string) {
    /**khởi tạo biến đảo ngược*/
    let reversed = ''
    // lặp từ cuối chuỗi đến đầu chuỗi
    for (let i = str.length - 1; i >= 0; i--) {
        // cộng dồn vào biến đảo ngược
        reversed += str[i]
    }
    // trả về chuỗi đảo ngược
    return reversed
}





</script>
<style scoped lang="scss"></style>