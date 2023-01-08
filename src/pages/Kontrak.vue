<template>
  <div class="w-full">
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h5 class="mb-0 text-xl font-bold">{{ $t('reminderKontrak') }}</h5>
      </div>

      <div>
        <DataTable
          v-model:filters="tableFilters"
          :value="kontraks"
          :paginator="true"
          :scrollable="true"
          paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rows-per-page-options="[10, 20, 50]"
          responsive-layout="scroll"
          current-page-report-template="Showing {first} to {last} of {totalRecords}"
          :rows="10"
          :lazy="true"
          filter-display="row"
          :total-records="totalData"
          :loading="isLoading"
          scroll-direction="both"
          show-gridlines
          class="mt-3"
          data-key="employeeNik"
          @sort="onSort"
        >
          <Column header="No" :style="{ width: '100px' }" frozen>
            <template #body="{ index }">
              <div>{{ index + 1 }}</div>
            </template>
          </Column>
          <Column
            field="employeeName"
            :sortable="true"
            header="Nama"
            :show-filter-menu="false"
            class="table-column-medium"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                :placeholder="$t('nama')"
                @keydown.enter="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="employeeNik"
            :sortable="true"
            header="ID Karyawan"
            class="table-column-medium"
          ></Column>
          <Column
            field="companyName"
            header="Perusahaan"
            class="table-column-medium"
          ></Column>
          <Column
            field="employeeActiveStatus"
            header="Status"
            class="table-column-small"
          ></Column>

          <Column
            field="departmentName"
            header="Departemen"
            class="table-column-medium"
            :show-filter-menu="false"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                :placeholder="$t('departemen')"
                @keydown.enter="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="divisionName"
            header="Divisi"
            :show-filter-menu="false"
            class="table-column-small"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                :placeholder="$t('divisi')"
                @keydown.enter="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="positionName"
            header="Posisi"
            :show-filter-menu="false"
            class="table-column-small"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                :placeholder="$t('posisi')"
                @keydown.enter="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="employeeGrade"
            :header="$t('jabatan')"
            class="table-column-medium"
            :show-filter-menu="false"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class=""
                :placeholder="$t('jabatan')"
                @keydown.enter="filterCallback()"
              /> </template
          ></Column>
          <Column
            field="startDate"
            header="Kontrak Mulai"
            class="table-column-medium"
          ></Column>
          <Column
            field="duration"
            header="Durasi (Bulan)"
            class="table-column-medium"
          ></Column>
          <Column
            field="endDate"
            header="Kontrak Berakhir"
            class="table-column-medium"
          ></Column>
          <Column
            field="dayToEnd"
            header="Reminder Kontrak (Hari)"
            class="table-column-medium"
          >
            <template #body="{ data }">
              <div
                :class="
                  markAsRed(data.dayToEnd) ? ' bg-red-500 text-white p-2' : null
                "
              >
                {{ data.dayToEnd }}
              </div>
            </template>
          </Column>
          <Column
            field="status"
            header="Status Kontrak"
            class="table-column-small"
          ></Column>
          <Column :header="$t('action')" class="table-column-medium">
            <template #body="{ data }">
              <ActionButton>
                <template #trigger>
                  <button class="button button-primary">
                    {{ $t('action') }}
                  </button>
                </template>
                <template #content>
                  <div class="">
                    <router-link
                      class="block button !text-sm whitespace-nowrap text-black"
                      to="/"
                      >{{ $t('detail') }}</router-link
                    >
                    <router-link
                      class="block button !text-sm whitespace-nowrap text-black"
                      to="/"
                      >{{ $t('edit') }}</router-link
                    >
                    <router-link
                      class="block button !text-sm whitespace-nowrap text-black"
                      to="/"
                      >{{ $t('delete') }}</router-link
                    >
                    <router-link
                      class="block button !text-sm whitespace-nowrap text-black"
                      to="/"
                      >{{ $t('print') }}</router-link
                    >
                    <router-link
                      class="block button !text-sm whitespace-nowrap text-black"
                      to="/"
                      >{{ $t('done') }}</router-link
                    >
                  </div>
                </template>
              </ActionButton>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import { KontrakKaryawan } from '@/typing/karyawan'
import ActionButton from '@/components/ActionButton.vue'
import { onMounted, ref } from 'vue'
import {
  getReminderKontrak as fetchReminderKontrak,
  ReminderKontrakAttributes
} from '@/api/karyawan/getReminderKontrak'

const kontraks = ref<ReminderKontrakAttributes[]>([])
const isLoading = ref(false)

const totalData = ref(0)
const tableFilters = ref({
  companyName: { value: '', matchMode: 'contains' },
  employeeName: { value: '', matchMode: 'contains' },
  employeeGrade: { value: '', matchMode: 'contains' },
  departmentName: { value: '', matchMode: 'contains' },
  positionName: { value: '', matchMode: 'contains' },
  divisionName: { value: '', matchMode: 'contains' }
})

function markAsRed(daysToEnd: number) {
  return daysToEnd < 30 ? true : false
}

async function getReminderKontrak() {
  const { success, data, message } = await fetchReminderKontrak({})
  if (success && data) {
    kontraks.value = data.data
    totalData.value = data.meta.total
  }
  console.log('M', data)
}

function onSort(event: any) {
  getReminderKontrak()
}

onMounted(() => {
  getReminderKontrak()
})
</script>
<script lang="ts">
export default {
  name: 'KaryawanKontrak'
}
</script>
