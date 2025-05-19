<template>
  <div class="container mx-auto p-4">
    <table class="min-w-full bg-white">
      <thead>
        <tr class="bg-gray-100 ">
          <!-- Lặp qua các cột tiêu đề -->
          <th v-for="header in table.getHeaderGroups()[0].headers" :key="header.id"
            class="py-1 text-sm px-4 text-left font-semibold bg-gray-200 lg:first-of-type:rounded-s-lg lg:last-of-type:rounded-e-lg " :style="{
              position: header.column.getIsPinned() ? 'sticky' : 'relative',
              left: header.column.getIsPinned() === 'left' ? 0 : undefined,
              right: header.column.getIsPinned() === 'right' ? 0 : undefined,
              zIndex: header.column.getIsPinned() ? 10 : 0,

            }">
            <!-- Hiển thị tên tiêu đề cột -->
            {{ header.column.columnDef.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-gray-50">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="py-2 px-4 border-b" :style="{
            position: cell.column.getIsPinned() ? 'sticky' : 'relative',
            left: cell.column.getIsPinned() === 'left' ? 0 : undefined,
            right: cell.column.getIsPinned() === 'right' ? 0 : undefined,
            zIndex: cell.column.getIsPinned() ? 10 : 0,
            backgroundColor: cell.column.getIsPinned() ? '#ffffff' : 'inherit',
          }">
            <span v-if="cell.column.id === 'audio'">
              {{ cell.getValue() === true ? '✔' : '✘' }}
            </span>
            <span v-else>
              {{ cell.getValue() }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useVueTable, getCoreRowModel } from '@tanstack/vue-table';

/** Dữ liệu bảng, mỗi object là một dòng */
const data = ref([
  {
    id: 1,
    type: 'Gọi đến',
    sender: '*** 3210',
    receiver: '*** 3210',
    callNumber: '1900999970',
    duration: 'Không nghe',
    cost: 0,
    time: '5 phút trước',
    audio: false,
    status: 'Chi tiết',
    action: 'Không nhận cuộc',
  },
  {
    id: 2,
    type: 'Gọi đến',
    sender: 'Nguyễn Văn A *** 1234',
    receiver: 'Nguyễn Văn B',
    callNumber: '0268888866',
    duration: '49 giây',
    cost: 345000,
    time: '1 tiếng trước',
    audio: true,
    status: 'Chi tiết',
    action: 'Thêm thẻ',
  },
  {
    id: 3,
    type: 'Gọi đi',
    sender: 'Nguyễn Văn A *** 1234',
    receiver: 'Nguyễn Văn B',
    callNumber: '0268888866',
    duration: '10 phút 30 giây',
    cost: 32500,
    time: '10:15 - 17/05/25',
    audio: true,
    status: 'Chi tiết',
    action: 'Nhận máy',
  },
  {
    id: 4,
    type: 'Gọi đi',
    sender: 'Nguyễn Văn A *** 1234',
    receiver: 'Nguyễn Văn B',
    callNumber: '0268888866',
    duration: '1 phút 30 giây',
    cost: 345000,
    time: '10:15 - 17/05/25',
    audio: true,
    status: 'Chi tiết',
    action: 'Hủy',
  },
]);

/**  Định nghĩa các cột */
const columns = ref([
  {
    header: 'Gọi',
    accessorKey: 'type',
    size: 100,
  },
  {
    header: 'Tên khách hàng',
    accessorKey: 'sender',
    size: 200,
  },
  {
    header: 'Số khách hàng',
    accessorKey: 'receiver',
    size: 150,
  },
  {
    header: 'Số máy cố định',
    accessorKey: 'callNumber',
    size: 150,
  },
  {
    header: 'Số phút gọi',
    accessorKey: 'duration',
    size: 120,
  },
  {
    header: 'Cước gọi',
    accessorKey: 'cost',
    size: 100,
  },
  {
    header: 'Giờ gọi',
    accessorKey: 'time',
    size: 150,
  },
  {
    header: 'Audio',
    accessorKey: 'audio',
    size: 80,
  },
  {
    header: 'Nội dung',
    accessorKey: 'status',
    size: 100,
  },
  {
    header: 'Trạng thái',
    accessorKey: 'action',
    size: 150,
  },
]);

/* Khởi tạo bảng với TanStack Table */
const table = useVueTable({
  // Dữ liệu bảng
  data: data.value,
  // Cột bảng
  columns: columns.value,
  // Model cơ bản để quản lý dòng
  getCoreRowModel: getCoreRowModel(),
  // Bật tính năng ghim cột
  enableColumnPinning: true,
  // Cho phép thay đổi kích thước cột
  columnResizeMode: 'onChange',
});

onMounted(() => {
  // Ghim cột 'type' bên trái
  table.getColumn('type')?.pin('left');
  // Ghim cột 'action' bên phải
  table.getColumn('action')?.pin('right');
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 16px;
  text-align: left;
}

th {

  font-weight: 600;
}

tr:hover {
  background-color: #f3f4f6;
}
</style>