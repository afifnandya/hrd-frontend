<template>
  <div>
    <FormAddData
      :title="formTitle"
      :fields="fields"
      :submit-btn="{
        label: submitButtonLabel,
        disabled: isLoading,
        show: false
      }"
      :show-submit="!read"
      @on-submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { createWorkOrder } from '@/service/workOrder'
import FormAddData, { Field } from '@/components/form/FormAddData.vue'
import useToast from '@/composable/useToast'
import {
  GENDER,
  MARTIAL_STATUS,
  PENDIDIKAN,
  ROUTE_WORK_ORDER
} from '@/constants'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { getWorkOrderCode } from '@/api/work_oder/getWorkOrderCode'
import { getWorkOrder } from '@/api/work_oder/getWorkOrder'
import { useRouter } from 'vue-router'
import { editWorkOrder } from '@/api/work_oder/editWorkOrder'
import { useI18n } from 'vue-i18n'

let workOrderState = {
  id: ref(0),
  code: ref(''),
  status: ref(''),
  departmentId: ref(0),
  divisionId: ref(0),
  positionId: ref(0),
  requesterName: ref(''),
  requestDate: ref(''),
  expireDate: ref(''),
  estimateWorkingDate: ref(''),
  existingPositionCount: ref(0),
  neededPositionCount: ref(0),
  hiringType: ref(''),
  requestedSalary: ref(0),
  requestedAge: ref(0),
  requestedGender: ref(''),
  requestedMaritalStatus: ref(''),
  requestedTall: ref(''),
  requestedPyhsical: ref(''),
  requestedVision: ref(''),
  requestedEducationStage: ref(''),
  requestedEducationMajor: ref(''),
  requestedCertification: ref(''),
  requestedExperiences: ref(''),
  requestedComputerSkill: ref(''),
  requestedMultiLanguage: ref(''),
  requestedMultiLevel: ref(''),
  requestedNationality: ref(''),
  requestedResidence: ref(''),
  reason: ref(''),
  jobDescription: ref(''),
  otherRequest: ref(''),
  receiverName: ref(''),
  receiveDate: ref('')
}
const props = defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  read: {
    type: Boolean,
    default: false
  },
  add: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: ''
  }
})
const isLoading = ref(false)
const store = useAppStore()
const { departmen, divisi, jabatan } = storeToRefs(store)
const state = workOrderState
const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const formTitle = computed(() => {
  if (props.add) {
    return 'Form Tambah Work Order'
  }
  if (props.edit) {
    return 'Form Edit Work Order'
  }
  return 'Detail Work Order'
})
const submitButtonLabel = props.add
  ? 'Create Work Order'
  : props.edit
  ? 'Edit Work Order'
  : ''

const HIRING_TYPE_OPTIONS = [
  'Keahlian',
  'Internal',
  'Tamat angkatan',
  'Tidak Terbatas'
]
const MULTI_LEVEL_OPTIONS = ['Sedang', 'Baik', 'Sangat Baik']
const MULTI_LANGUAGE_OPTIONS = ['China', 'Ingris', 'China - Inggris', 'Lainnya']
const REASON_OPTIONS = [
  'Memperbesar Produksi',
  'Karyawan Posisi Tersebut Resign',
  'Penggantian, Cadangan Keahlian',
  'Jabatan Baru',
  'Lain-lain'
]

const fields: Field[] = reactive([
  {
    type: 'text',
    label: 'Code',
    model: state.code,
    name: 'code',
    required: true,
    disabled: true
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.departmentId,
    label: t('departemen'),
    name: 'department',
    options: computed(() => departmen.value),
    optionValue: 'id',
    optionLabel: 'nama',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.divisionId,
    label: t('divisi'),
    options: computed(() => divisi.value),
    optionValue: 'id',
    optionLabel: 'nama',
    name: 'divisi',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'date',
    model: state.estimateWorkingDate,
    label: t('estimasiWaktuKerja'),
    name: 'estimateWorkingDate',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.existingPositionCount,
    label: t('jumlahKaryawanYangDiposisi'),
    name: 'existingPositionCount',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'date',
    model: state.expireDate,
    label: t('tanggalExpired'),
    name: 'expireDate',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.hiringType,
    label: t('calonKaryawan'),
    name: 'hiringType',
    options: HIRING_TYPE_OPTIONS,
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.jobDescription,
    label: t('rincianTugas'),
    name: 'jobDescription',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.neededPositionCount,
    label: t('jumlahKaryawanYangDibutuhkan'),
    name: 'neededPositionCount',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.otherRequest,
    label: t('permintaanLainnya'),
    name: 'otherRequest',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.positionId,
    label: t('jabatan'),
    name: 'position',
    options: computed(() => jabatan.value),
    optionValue: 'id',
    optionLabel: 'nama',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.reason,
    label: t('alasanPerekrutan'),
    name: 'reason',
    options: REASON_OPTIONS,
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'date',
    model: state.receiveDate,
    label: t('tanggalDiterima'),
    name: 'receiveDate',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.receiverName,
    label: t('penerimaForm'),
    name: 'receiverName',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'date',
    model: state.requestDate,
    label: t('tanggalPengisian'),
    name: 'requestDate',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedAge,
    label: t('umur'),
    name: 'requestedAge',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedCertification,
    label: t('sertifikatPendukung'),
    name: 'requestedCertification',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedComputerSkill,
    label: t('keahlianKomputer'),
    name: 'requestedComputerSkill',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedEducationMajor,
    label: t('jurusan'),
    name: 'requestedEducationMajor',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.requestedEducationStage,
    label: t('tingkatPendidikan'),
    options: PENDIDIKAN,
    name: 'requestedEducationStage',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedExperiences,
    label: t('pengalaman'),
    name: 'requestedExperiences',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.requestedGender,
    label: t('jenisKelamin'),
    name: 'requestedGender',
    options: GENDER,
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.requestedMaritalStatus,
    label: t('statusPerkawinan'),
    options: MARTIAL_STATUS,
    name: 'requestedMaritalStatus',
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.requestedMultiLanguage,
    label: t('bahasaLain'),
    name: 'requestedMultiLanguage',
    options: MULTI_LANGUAGE_OPTIONS,
    required: true,
    disabled: props.read
  },
  {
    type: props.read ? 'text' : 'dropdown',
    model: state.requestedMultiLevel,
    label: t('tingkatBahasa'),
    name: 'requestedMultiLevel',
    options: MULTI_LEVEL_OPTIONS,
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedNationality,
    label: t('kewarganegaraan'),
    name: 'requestedNationality',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedPyhsical,
    label: t('fisik'),
    name: 'requestedPyhsical',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedResidence,
    label: t('tempatTinggal'),
    name: 'requestedResidence',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedSalary,
    label: t('gaji'),
    name: 'requestedSalary',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedTall,
    label: t('tinggiBadan'),
    name: 'requestedTall',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requestedVision,
    label: t('pengelihatan'),
    name: 'requestedVision',
    required: true,
    disabled: props.read
  },
  {
    type: 'text',
    model: state.requesterName,
    label: t('pengisi'),
    name: 'requesterName',
    required: true,
    disabled: props.read
  }
])

async function onSubmit() {
  isLoading.value = true
  const payload = reactive(state)
  const { success, data, message } = props.add
    ? await createWorkOrder(payload)
    : await editWorkOrder(state.id.value, payload)
  isLoading.value = false
  console.log('response', success, data, message)
  if (message) {
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    router.push({ name: ROUTE_WORK_ORDER })
  }
}

async function fetchWorkOrder() {
  isLoading.value = true
  const { success, data, message } = await getWorkOrder({ id: props.id })
  if (message) {
    if (success && data && !Array.isArray(data)) {
      workOrderState.code.value = data.code
      workOrderState.id.value = data.id
      workOrderState.code.value = data.code
      workOrderState.status.value = data.status
      workOrderState.departmentId.value = data.department.id
      workOrderState.divisionId.value = data.position.id
      workOrderState.positionId.value = data.position.id
      workOrderState.requesterName.value = data.requesterName
      workOrderState.requestDate.value = data.requestDate
      workOrderState.expireDate.value = data.expireDate
      workOrderState.estimateWorkingDate.value = data.estimateWorkingDate
      workOrderState.existingPositionCount.value = data.existingPositionCount
      workOrderState.neededPositionCount.value = data.neededPositionCount
      workOrderState.hiringType.value = data.hiringType
      workOrderState.requestedSalary.value = data.requestedSalary
      workOrderState.requestedAge.value = data.requestedAge
      workOrderState.requestedGender.value = data.requestedGender
      workOrderState.requestedMaritalStatus.value = data.requestedMaritalStatus
      workOrderState.requestedTall.value = data.requestedTall
      workOrderState.requestedPyhsical.value = data.requestedPyhsical
      workOrderState.requestedVision.value = data.requestedVision
      workOrderState.requestedEducationStage.value =
        data.requestedEducationStage
      workOrderState.requestedEducationMajor.value =
        data.requestedEducationMajor
      workOrderState.requestedCertification.value = data.requestedCertification
      workOrderState.requestedExperiences.value = data.requestedExperiences
      workOrderState.requestedComputerSkill.value = data.requestedComputerSkill
      workOrderState.requestedMultiLanguage.value = data.requestedMultiLanguage
      workOrderState.requestedMultiLevel.value = data.requestedMultiLevel
      workOrderState.requestedNationality.value = data.requestedNationality
      workOrderState.requestedResidence.value = data.requestedResidence
      workOrderState.reason.value = data.reason
      workOrderState.jobDescription.value = data.jobDescription
      workOrderState.otherRequest.value = data.otherRequest
      workOrderState.receiverName.value = data.receiverName
      workOrderState.receiveDate.value = data.receiveDate
      toast.success(message)
      return
    }
    toast.error(message)
  }
  console.log('data', success, data)
  isLoading.value = false
}

async function fetchWorkOrderCode(departmentId: string | number) {
  isLoading.value = true

  const { isSuccess, messsage, data } = await getWorkOrderCode(departmentId)
  isLoading.value = false
  if (!isSuccess || !data) {
    if (messsage) {
      toast.error(messsage)
      return
    }
    return
  }
  state.code.value = data.availableWorkOrderCode
  console.log('reponse', data, state.code.value)
}

watch(state.departmentId, (newVal) => {
  console.log(newVal)
  fetchWorkOrderCode(newVal)
})

onMounted(() => {
  if (props.id) {
    fetchWorkOrder()
  }
})
</script>
