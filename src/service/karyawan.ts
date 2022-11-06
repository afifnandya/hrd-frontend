import { createKaryawan, createDummyKaryawan } from '@/model/karyawan'
import { Karyawan } from '@/typing/karyawan'
import dayjs from '@/lib/dayjs'
import {
  getKaryawan as fetchKaryawan,
  GetKaryawanPayload,
  KaryawanAttribute
} from '@/api/karyawan/getKaryawan'

function dummyKaryawan() {
  return createDummyKaryawan()
}

async function getKaryawan(payload: GetKaryawanPayload) {
  const dataKaryawan = []
  const { success, data, message, meta, links } = await fetchKaryawan(payload)

  if (success && data) {
    if (Array.isArray(data)) {
      data.forEach((karyawan) => {
        const karyawanObj = mapper(karyawan)
        dataKaryawan.push(karyawanObj)
      })
    } else {
      const karyawanObj = mapper(data)

      dataKaryawan.push(karyawanObj)
    }
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
