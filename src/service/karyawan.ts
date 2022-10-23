import useHttp from '@/composable/useHttp'
import qs from 'qs'
import { createKaryawan, createDummyKaryawan } from '@/model/karyawan'
import type {
  GetKaryawan,
  KaryawanAttribute,
  Links,
  Meta
} from '@/typing/apiResponse'
import { Karyawan } from '@/typing/karyawan'
import dayjs from '@/lib/dayjs'
import { camelizeKeys } from 'humps'

function dummyKaryawan() {
  return createDummyKaryawan()
}

type GetKaryawanResponse = {
  success: boolean
  message: string | null
  data: Karyawan[]
  links: Links | null
  meta: Meta | null
}

async function getKaryawan({
  pageSize,
  pageNumber,
  id,
  name
}: {
  pageSize?: number
  pageNumber?: number
  id?: string
  name?: string
}): Promise<GetKaryawanResponse> {
  const filter = qs.stringify(
    {
      _page: pageNumber || null,
      limit: pageSize || null,
      name
    },
    { skipNulls: true }
  )
  let success = false
  const dataKaryawan = [] as Karyawan[]
  let message = null
  let links = null
  let meta = null
  const url = id ? `/employees/${id}?${filter}` : `/employees?${filter}`
  const { data } = await useHttp(url)
  const response = camelizeKeys(data.value) as GetKaryawan
  const karyawanList = response.data
  console.log('aaa', response)
  links = response.links
  message = response.message
  meta = response.meta
  if (response.status === 200) {
    success = true
  }
  if (Array.isArray(karyawanList)) {
    karyawanList.forEach((karyawan) => {
      const karyawanObj = mapper(karyawan)
      dataKaryawan.push(karyawanObj)
    })
  } else {
    const karyawanObj = mapper(karyawanList)

    dataKaryawan.push(karyawanObj)
  }

  return {
    success,
    message,
    meta,
    data: dataKaryawan,
    links
  }
}

function mapper(karyawan: KaryawanAttribute) {
  const umur = dayjs().diff(dayjs(karyawan.birthDate, 'YYYY-MM-DD'), 'year')
  const karyawanObj = createKaryawan({
    id: karyawan.id,
    nama: karyawan.name,
    nik: karyawan.nik,
    status: karyawan.activeStatus,
    departement: karyawan.departmentId,
    pendidikan: karyawan.education,
    perusahaan: karyawan.company,
    jurusan: '',
    tanggungan: '',
    tanggunganPajak: karyawan.taxDependentStatus,
    statusPernikahan: karyawan.maritalStatus || '',
    tanggalUpdateKK: karyawan.kkUpdatedAt || '',
    ktp: karyawan.ktp,
    asalKtp: karyawan.pohOriginKtp,
    kabupatenKtp: '',
    kecamatanKtp: '',
    asalPOH: karyawan.pohOrigin,
    kerjaPOH: karyawan.pohWorking,
    kategori: karyawan.pohCategory,
    telepon: karyawan.phone,
    teleponDarurat: karyawan.phoneEmergency,
    alamat: karyawan.address,
    rekening: {
      name: karyawan.bankAccount?.accountName || '',
      bank: karyawan.bankAccount?.bankName || '',
      rekening: karyawan.bankAccount?.accountNumber || ''
    },
    keluar: {
      tipe: 'todo',
      kategori: 'todo',
      tanggalKeluar: 'todo',
      kontrak: 'todo',
      tanggalPengajuan: 'todo',
      keterangan: 'todo'
    },
    mutasi: {
      tanggal: 'todo',
      deskripsi: 'todo'
    },
    dataKeluarga: karyawan.families,
    kontrak: karyawan.employmentContracts,
    npwp: karyawan.npwp,
    jenisKelamin: karyawan.gender,
    tempatLahir: karyawan.birthPlace,
    tanggalLahir: karyawan.birthDate,
    bpjs: {
      kesehatan: karyawan.bpjsKesehatan,
      tenagaKerja: karyawan.bpjsKetenagakerjaan
    },
    sim: karyawan.sim,
    kartuKeluarga: karyawan.kk,
    umur: umur,
    agama: karyawan.religion,
    divisi: karyawan.division,
    jabatan: karyawan.position,
    grade: karyawan.grade,
    dateOfHiring: '',
    kontrakSebelumnya: '',
    kontrakSekarang: ''
  })

  return karyawanObj
}

export { getKaryawan, dummyKaryawan as createDummyKaryawan }
