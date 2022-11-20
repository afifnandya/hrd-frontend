import { PelamarInstance, Pelamar } from '@/typing/pelamar'
import { PelamarAttributes } from '@/api/pelamar/getPelamar'
import { isNumber, isObject, isString } from '@/helper/dataType'
import dayjs from 'dayjs'
import humps from 'humps'

function getUmur(birthDate: string) {
  if (!birthDate) {
    return 0
  }
  const today = dayjs()
  const birthDateInstance = dayjs(birthDate, 'YYYY-MM-DD')
  if (!birthDateInstance.isValid()) {
    return 0
  }
  return today.diff(birthDateInstance, 'year')
}

export function mapper(data: PelamarAttributes): Pelamar {
  const pelamarInstance: PelamarInstance = {
    ktp: isString(data.ktp),
    id: isNumber(data.id),
    tanggalBerkasMasuk: isString(data.createdAt),
    noBantex: isString(data.bantexCode),
    status: isString(data.status),
    statusAktif: isString(data.activeStatus),
    kategori: isObject(data.jobCategory),
    nik: isString(data.nik),
    nama: isString(data.name),
    tempatLahir: data.birthPlace,
    tanggalLahir: dayjs(data.birthDate, 'YYYY-MM-DD').format('DD-MMM-YYYY'),
    umur: getUmur(data.birthDate || ''),
    jenisKelamin: data.gender,
    zonaIndustri: isObject(data.area),
    alamat: {
      desa: data.address,
      kecamatan: data.district,
      kabupaten: data.city,
      provinsi: data.province
    },
    agama: data.religion,
    statusPernikahan: isString(data.maritalStatus),
    nomorTelpon: {
      telpon1: isString(data.phone),
      telpon2: isString(data.phoneEmergency)
    },
    pendidikan: isString(data.educationStage),
    jurusan: isString(data.educationMajor),
    sertifikat: {
      nama: isString(data.certification),
      jenis: isString(data.certificationType)
    },
    nomerPencariKerja: '',
    rekomendasi: isString(data.recommendation),
    sim: isString(data.sim),
    pengalamanKerja: isString(data.experiences),
    posisiYangDilamar: {
      id: data.position?.id || 0,
      nama: data.position?.name || ''
    },
    keterangan: isString(data.note)
  }
  return pelamarInstance
}

// export function reverseMapper(data: PelamarInstance) {
//   const payload: PelamarAttributes = {
//     status: data.status,
//     ktp: data.ktp,
//     id: 0,
//     bantexCode: `${new Date().toDateString()}`,
//     nik: data.nik,
//     name: data.nama,
//     birthPlace: data.tempatLahir,
//     birthDate: data.tanggalLahir,
//     religion: data.agama,
//     maritalStatus: data.statusPernikahan,
//     phone: data.nomorTelpon.telpon1,
//     phoneEmergency: data.nomorTelpon.telpon2,
//     sim: data.sim,
//     province: data.alamat.provinsi,
//     city: data.alamat.kabupaten,
//     district: data.alamat.kecamatan,
//     address: data.alamat.desa,
//     gender: data.jenisKelamin,
//     experiences: data.pengalamanKerja,
//     certificationType: data.sertifikat.jenis,
//     certification: data.sertifikat.nama,
//     educationStage: data.pendidikan,
//     educationMajor: data.jurusan,
//     recommendation: data.rekomendasi,
//     note: data.keterangan,
//     createdAt: data.tanggalBerkasMasuk,
//     updatedAt: '',
//     position: {
//       id: 0,
//       name: ''
//     },
//     area: {
//       code: '',
//       area: ''
//     }
//   }
//   const parsedPayload = humps.decamelizeKeys(payload)
//   console.log('b', parsedPayload)
//   return parsedPayload
// }

export function createDummyPelamarInstance(): PelamarInstance {
  const pelamar: PelamarInstance = {
    ktp: '',
    id: '',
    tanggalBerkasMasuk: undefined,
    noBantex: '',
    status: '',
    statusAktif: '',
    kategori: {
      id: '',
      code: '',
      name: ''
    },
    nik: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: undefined,
    umur: 0,
    jenisKelamin: '',
    zonaIndustri: {
      code: '',
      area: ''
    },
    alamat: {
      desa: '',
      kecamatan: '',
      kabupaten: '',
      provinsi: ''
    },
    agama: '',
    statusPernikahan: '',
    nomorTelpon: {
      telpon1: '',
      telpon2: ''
    },
    pendidikan: '',
    jurusan: '',
    sertifikat: {
      nama: '',
      jenis: ''
    },
    nomerPencariKerja: '',
    rekomendasi: '',
    sim: '',
    pengalamanKerja: '',
    posisiYangDilamar: {
      id: 0,
      nama: ''
    },
    keterangan: ''
  }
  return pelamar
}

export function createPelamarInstance(
  data: PelamarAttributes
): PelamarInstance {
  const pelamar = mapper(data)
  return pelamar
}
