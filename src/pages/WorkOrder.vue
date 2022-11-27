<template>
  <div>
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h5 class="mb-0 text-xl font-bold">Work Orders</h5>
        <router-link
          :to="{ name: ROUTE_ADD_WORK_ORDER }"
          class="button button-primary"
          >Tambah Work Orders</router-link
        >
      </div>
      <DataTable
        :value="workOrders"
        :loading="loading"
        data-key="id"
        :paginator="true"
        :rows="10"
        scroll-height="flex"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[10, 20, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} Work Orders"
        responsive-layout="scroll"
        scroll-direction="both"
        show-gridlines
        :scrollable="true"
        :lazy="true"
        :total-records="totalPage"
        class="mt-3 min-h-[400px]"
        @page="onPageChange"
      >
        <Column field="id" header="Id" class="table-column-small" frozen>
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.id }}
          </template>
        </Column>
        <Column class="table-column-small" field="code" header="Kode WO" frozen>
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.code }}
          </template>
        </Column>
        <Column field="status" header="Status" class="table-column-medium">
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.status }}
          </template>
        </Column>
        <Column
          field="requestDate"
          header="Tanggal W.O"
          class="table-column-medium"
        >
          <template #body="{ data }: { data: WorkOrder }">
            {{ formatDate(data.requestDate) }}
          </template>
        </Column>
        <Column
          field="department"
          header="Departemen"
          class="table-column-medium"
        >
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.department.name }}
          </template>
        </Column>
        <Column field="division" header="Divisi" class="table-column-medium">
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.division.name }}
          </template>
        </Column>
        <Column field="position" header="Jabatan" class="table-column-medium">
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.position.name }}
          </template>
        </Column>
        <Column
          field="neededPositionCount"
          header="Jumlah Yang Dibutuhkan"
          class="table-column-medium"
        >
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.neededPositionCount }}
          </template>
        </Column>
        <Column
          field="existingPositionCount"
          header="Jumlah Yang Terpenuhi"
          class="table-column-medium"
        >
          <template #body="{ data }: { data: WorkOrder }">
            {{ data.existingPositionCount }}
          </template>
        </Column>
        <Column
          field="expireDate"
          header="Tanggal Expired"
          class="table-column-medium"
        >
          <template #body="{ data }: { data: WorkOrder }">
            {{ formatDate(data.expireDate) }}
          </template>
        </Column>
        <Column header="Siswa Waktu" class="table-column-medium">
          <template #body="{ data }: { data: WorkOrder }">
            {{ `${getRemainingTime(data.expireDate)} Hari` }}
          </template>
        </Column>

        <Column header="Action" class="table-column-medium">
          <template #body="{ data }">
            <div class="dropdown">
              <button class="button button-primary">Action</button>
              <div class="dropdown-content">
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{
                    name: ROUTE_WORK_ORDER_DETAIL,
                    params: { id: data.id }
                  }"
                  >Detail Work Order</router-link
                >
                <router-link
                  class="block button !text-sm whitespace-nowrap text-black"
                  :to="{
                    name: ROUTE_WORK_ORDER_DETAIL,
                    params: { id: data.id }
                  }"
                  >Edit Work Order</router-link
                >
                <button
                  class="block button !text-sm whitespace-nowrap text-black"
                  @click="confirmDeleteWorkOrder(data)"
                >
                  Delete Work Order
                </button>
              </div>
            </div>
          </template>
        </Column>
      </DataTable>

      <ConfirmDialog></ConfirmDialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getWorkOrder } from '@/api/work_oder/getWorkOrder'
import { deleteWorkOrder } from '@/api/work_oder/deleteWorkOrder'
import useToast from '@/composable/useToast'
import { WorkOrder } from '@/typing/workOrder'
import { reactive, Ref, ref } from 'vue'
import { ROUTE_ADD_WORK_ORDER, ROUTE_WORK_ORDER_DETAIL } from '@/constants'
import dayjs from 'dayjs'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

type PageChangeEvent = {
  page: number
  pageCount: number
  rows: number
}

const toast = useToast()
const workOrders: Ref<WorkOrder[]> = ref([])
const pageNumber = ref(1)
const pageSize = ref(10)
const totalPage = ref(0)
const loading = ref(false)
const confirm = useConfirm()

async function fetchWorkOrder() {
  loading.value = true
  const { success, data, message, meta, links } = await getWorkOrder({
    pageNumber: pageNumber.value,
    pageSize: pageSize.value
  })

  if (!success || !data) {
    if (message) {
      toast.error(message)
    }
    return
  }

  console.log('a', data)
  loading.value = false
  workOrders.value = data
  totalPage.value = meta?.total || 0
}

function onPageChange(event: PageChangeEvent) {
  const newPage = event.page + 1
  if (pageNumber.value !== newPage) {
    pageNumber.value = newPage
  }
  pageSize.value = event.rows
  fetchWorkOrder()
}

function formatDate(date: string) {
  const isValid = dayjs(date).isValid()
  return isValid ? dayjs(date).format('DD-MMM-YYYY') : date
}

function confirmDeleteWorkOrder(workOrder: WorkOrder) {
  confirm.require({
    message: `Apakah anda yakin ingin mengahpus Work Order
          ${workOrder.code} ?`,
    header: 'Konfirmasi',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      //callback to execute when user confirms the action
      const id = workOrder.id
      if (id) {
        const { success, message } = await deleteWorkOrder(id)
        console.log('su', success, message)
        if (message) {
          if (!success) {
            toast.error('Error', message)
          } else {
            toast.success(message)
          }
        }
      }
    },
    reject: () => {
      //callback to execute when user rejects the action
    },
    onHide: () => {
      //Callback to execute when dialog is hidden
    }
  })
}

function getRemainingTime(date: string) {
  const isValid = dayjs(date).isValid()
  if (!isValid) {
    return 0
  }
  return dayjs(date).endOf('day').diff(dayjs(), 'days')
}

fetchWorkOrder()
</script>
<script lang="ts"></script>
