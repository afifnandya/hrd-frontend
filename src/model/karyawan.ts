import { isNumber, isObject, isString } from '@/helper/dataType'
import type { Karyawan } from '@/typing/karyawan'

export function createDummyKaryawan(): Karyawan {
  const karyawan: Karyawan = {
    nik: '',
    status: '',
    nama: '',
    departement: 0,
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
    kerjaPOH: '',
    kategori: '',
    telepon: '',
    teleponDarurat: '',
    alamat: '',
    rekening: {
      name: 'todo',
      bank: 'todo',
      rekening: 'todo'
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
    dataKeluarga: [],
    kontrak: [],
    npwp: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    bpjs: {
      kesehatan: 'todo',
      tenagaKerja: 'todo'
    },
    sim: '',
    kartuKeluarga: '',
    umur: 0,
    agama: '',
    divisi: {
      id: '',
      name: ''
    },
    jabatan: {
      id: '',
      name: ''
    },
    grade: '',
    dateOfHiring: '',
    kontrakSebelumnya: '',
    kontrakSekarang: ''
  }
  return karyawan
}

export function createKaryawan(data: Karyawan): Karyawan {
  const karyawan: Karyawan = {
    nik: isString(data.nik),
    status: isString(data.status),
    nama: isString(data.nama),
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
    kerjaPOH: isString(data.kerjaPOH),
    kategori: isString(data.kategori),
    telepon: isString(data.telepon),
    teleponDarurat: isString(data.teleponDarurat),
    alamat: isString(data.alamat),
    rekening: {
      name: isString(data.rekening.name),
      bank: isString(data.rekening.bank),
      rekening: isString(data.rekening.rekening)
    },
    keluar: {
      tipe: 'data',
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
    dataKeluarga: [],
    kontrak: [],
    npwp: isString(data.npwp),
    jenisKelamin: isString(data.jenisKelamin),
    tempatLahir: isString(data.tempatLahir),
    tanggalLahir: isString(data.tanggalLahir),
    bpjs: {
      kesehatan: 'todo',
      tenagaKerja: 'todo'
    },
    sim: isString(data.sim),
    kartuKeluarga: isString(data.kartuKeluarga),
    umur: isNumber(data.umur),
    agama: isString(data.agama),
    divisi: isObject(data.divisi),
    jabatan: isObject(data.jabatan),
    grade: isString(data.grade),
    dateOfHiring: isString(data.dateOfHiring),
    kontrakSebelumnya: isString(data.kontrakSebelumnya),
    kontrakSekarang: isString(data.kontrakSekarang)
  }
  return karyawan
}
