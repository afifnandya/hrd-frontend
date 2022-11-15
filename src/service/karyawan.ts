import { createKaryawan, createDummyKaryawan } from '@/model/karyawan'
import { Karyawan } from '@/typing/karyawan'
import dayjs from '@/lib/dayjs'
import {
  getKaryawan as fetchKaryawan,
  GetKaryawanPayload,
  KaryawanAttribute
} from '@/api/karyawan/getKaryawan'
import {
  updateKaryawan as doUpdateKaryawan,
  UpdateKaryawanPayload
} from '@/api/karyawan/updateKaryawan'
import { deleteKaryawan } from '@/api/karyawan/deleteKaryawan'
import { omitBy, pickBy } from 'lodash-es'

function dummyKaryawan() {
  return createDummyKaryawan()
}

async function getKaryawan(payload: GetKaryawanPayload) {
  const dataKaryawan = []
  const parsedPayload = omitBy(payload, (value, key) => !value)
  const { success, data, message, meta, links } = await fetchKaryawan(
    parsedPayload
  )

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

async function updateKaryawan(
  id: string | number,
  karyawan: Partial<Karyawan>
) {
  try {
    console.log('param', karyawan)
    const payload: Partial<UpdateKaryawanPayload> = {
      nik: karyawan.nik,
      name: karyawan.nama,
      status: karyawan.status,
      activeStatus: karyawan.statusAktif,
      grade: karyawan.grade,
      positionLevel: karyawan.jabatan?.id,
      level: undefined,
      taxDependentStatus: karyawan.tanggunganPajak,
      maritalStatus: karyawan.statusPernikahan,
      kk: karyawan.kartuKeluarga,
      kkUpdatedAt: karyawan.tanggalUpdateKartuKeluarga,
      gender: karyawan.jenisKelamin,
      birthPlace: karyawan.tempatLahir,
      birthDate:
        karyawan.tanggalLahir && dayjs(karyawan.tanggalLahir).isValid()
          ? dayjs(karyawan.tanggalLahir).format('YYYY-MM-DD')
          : undefined,
      religion: karyawan.agama,
      province: karyawan.provinsi,
      city: karyawan.kabupatenKota,
      district: karyawan.kecamatan,
      address: karyawan.jalan,
      pohOrigin: karyawan.asalPOH,
      pohOriginKtp: karyawan.asalPOHKTP,
      pohWorking: karyawan.kerjaPOH,
      pohCategory: karyawan.kategoriPOH,
      phone: karyawan.telepon,
      phoneEmergency: karyawan.teleponDarurat,
      ktp: karyawan.ktp,
      sim: karyawan.sim,
      npwp: karyawan.npwp,
      companyId: karyawan.perusahaan?.id,
      areaCode: karyawan.wilayah?.code,
      divisionId: karyawan.divisi?.id,
      positionId: karyawan.jabatan?.id,
      jobCategoryId: karyawan.kategoriPekerjaan?.id
    }
    const parsed = omitBy(payload, (value, key) => value === undefined)
    console.log('parsed', parsed)
    return await doUpdateKaryawan(id, parsed)
  } catch (err: any) {
    return {
      success: false,
      message: (err?.message as string) || '',
      data: null
    }
  }
}

function mapper(karyawan: KaryawanAttribute) {
  const umur = dayjs().diff(dayjs(karyawan.birthDate, 'YYYY-MM-DD'), 'year')
  const karyawanObj = createKaryawan({
    id: karyawan.id,
    nama: karyawan.name,
    nik: karyawan.nik,
    status: karyawan.status,
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
    kategoriPOH: karyawan.pohCategory,
    telepon: karyawan.phone,
    teleponDarurat: karyawan.phoneEmergency,
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
    divisi: {
      id: karyawan.division.id,
      nama: karyawan.division.name
    },
    jabatan: {
      id: karyawan.position.id,
      nama: karyawan.position.name
    },
    grade: karyawan.grade,
    dateOfHiring: '',
    kontrakSebelumnya: '',
    kontrakSekarang: '',
    kecamatan: karyawan.district,
    jalan: karyawan.address,
    provinsi: karyawan.province,
    kabupatenKota: karyawan.city,
    kategoriPekerjaan: karyawan.jobCategory,
    statusAktif: karyawan.activeStatus,
    asalPOHKTP: karyawan.pohOriginKtp,
    tanggalUpdateKartuKeluarga: karyawan.kkUpdatedAt,
    wilayah: karyawan.area
  })

  return karyawanObj
}

export {
  getKaryawan,
  dummyKaryawan as createDummyKaryawan,
  updateKaryawan,
  deleteKaryawan
}
