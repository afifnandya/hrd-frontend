import { isArray, isNumber, isObject, isString } from '@/helper/dataType'
import type {
  AnggotaKeluarga,
  Karyawan,
  KaryawanInstance
} from '@/typing/karyawan'

function getPasangan(dataKeluarga: AnggotaKeluarga[]) {
  const filter = dataKeluarga.filter(
    (keluarga) => keluarga.relationship === 'Pasangan'
  )
  return filter.length ? filter : null
}

function getAnak(dataKeluarga: AnggotaKeluarga[]) {
  const filter = dataKeluarga.filter(
    (keluarga) => keluarga.relationship === 'Anak'
  )
  return filter.length ? filter : null
}

function getOrangTua(dataKeluarga: AnggotaKeluarga[]) {
  const filter = dataKeluarga.filter(
    (keluarga) =>
      keluarga.relationship === 'Ibu' || keluarga.relationship === 'Ayah'
  )
  return filter.length ? filter : null
}

export function createDummyKaryawan(): KaryawanInstance {
  const karyawan: KaryawanInstance = {
    id: 0,
    nik: '',
    status: '',
    statusAktif: '',
    nama: '',
    departement: 0,
    departmenName: '',
    pendidikan: {
      id: 0,
      stage: '',
      major: ''
    },
    perusahaan: {
      id: '',
      code: '',
      name: ''
    },
    jurusan: '',
    tanggungan: '',
    tanggunganPajak: '',
    statusPernikahan: '',
    tanggalUpdateKK: '',
    ktp: '',
    asalKtp: '',
    kabupatenKtp: '',
    kecamatanKtp: '',
    asalPOH: '',
    asalPOHKTP: '',
    kerjaPOH: '',
    kategoriPOH: '',
    telepon: '',
    teleponDarurat: '',
    jalan: '',
    foto: '',
    kecamatan: '',
    kabupatenKota: '',
    provinsi: '',
    rekening: {
      name: '',
      bank: '',
      rekening: ''
    },
    keluar: {
      tipe: '',
      kategori: '',
      tanggalKeluar: '',
      kontrak: '',
      tanggalPengajuan: '',
      keterangan: ''
    },
    mutasi: {
      tanggal: '',
      deskripsi: ''
    },
    dataKeluarga: [],
    kontrak: [],
    npwp: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    bpjs: {
      kesehatan: '',
      tenagaKerja: ''
    },
    sim: '',
    kartuKeluarga: '',
    tanggalUpdateKartuKeluarga: '',
    umur: 0,
    agama: '',
    divisi: {
      id: '',
      nama: ''
    },
    jabatan: {
      id: '',
      nama: ''
    },
    grade: '',
    dateOfHiring: '',
    kontrakSebelumnya: '',
    kontrakSekarang: '',
    kategoriPekerjaan: {
      id: '',
      code: '',
      name: ''
    },
    wilayah: {
      code: '',
      area: ''
    },
    getAnak: () => null,
    getPasangan: () => null,
    getOrangTua: () => null
  }
  return karyawan
}

export function createKaryawan(data: Karyawan): KaryawanInstance {
  const karyawan: KaryawanInstance = {
    id: isNumber(data.id),
    nik: isString(data.nik),
    statusAktif: isString(data.statusAktif),
    status: isString(data.status),
    nama: isString(data.nama),
    departmenName: '',
    departement: isNumber(data.departement),
    pendidikan: isObject(data.pendidikan),
    perusahaan: isObject(data.perusahaan),
    jurusan: isString(data.jurusan),
    tanggungan: isString(data.tanggungan),
    tanggunganPajak: isString(data.tanggunganPajak),
    statusPernikahan: isString(data.statusPernikahan),
    tanggalUpdateKK: isString(data.tanggalUpdateKK),
    ktp: isString(data.ktp),
    asalKtp: isString(data.asalKtp),
    kabupatenKtp: isString(data.kabupatenKtp),
    kecamatanKtp: isString(data.kecamatanKtp),
    asalPOH: isString(data.asalPOH),
    asalPOHKTP: isString(data.asalPOHKTP),
    kerjaPOH: isString(data.kerjaPOH),
    kategoriPOH: isString(data.kategoriPOH),
    telepon: isString(data.telepon),
    teleponDarurat: isString(data.teleponDarurat),
    jalan: isString(data.jalan),
    kecamatan: isString(data.kecamatan),
    kabupatenKota: isString(data.kabupatenKota),
    provinsi: isString(data.provinsi),
    rekening: {
      name: isString(data.rekening.name),
      bank: isString(data.rekening.bank),
      rekening: isString(data.rekening.rekening)
    },
    keluar: {
      tipe: 'data',
      kategori: '',
      tanggalKeluar: '',
      kontrak: '',
      tanggalPengajuan: '',
      keterangan: ''
    },
    mutasi: {
      tanggal: '',
      deskripsi: ''
    },
    dataKeluarga: isArray(data.dataKeluarga),
    kontrak: isArray(data.kontrak),
    npwp: isString(data.npwp),
    jenisKelamin: isString(data.jenisKelamin),
    tempatLahir: isString(data.tempatLahir),
    tanggalLahir: isString(data.tanggalLahir),
    bpjs: {
      kesehatan: '',
      tenagaKerja: ''
    },
    sim: isString(data.sim),
    kartuKeluarga: isString(data.kartuKeluarga),
    tanggalUpdateKartuKeluarga: isString(data.tanggalUpdateKartuKeluarga),
    umur: isNumber(data.umur),
    agama: isString(data.agama),
    divisi: isObject(data.divisi),
    jabatan: isObject(data.jabatan),
    grade: isString(data.grade),
    dateOfHiring: isString(data.dateOfHiring),
    kontrakSebelumnya: isString(data.kontrakSebelumnya),
    kontrakSekarang: isString(data.kontrakSekarang),
    wilayah: isObject(data.wilayah),
    kategoriPekerjaan: isObject(data.kategoriPekerjaan),
    foto: isString(data.foto),
    getAnak: () => getAnak(data.dataKeluarga),
    getPasangan: () => getPasangan(data.dataKeluarga),
    getOrangTua: () => getOrangTua(data.dataKeluarga)
  }
  return karyawan
}
