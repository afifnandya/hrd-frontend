import { Area, KategoriPekerjaan } from '@/typing/dataMaster'
interface Kontrak {
  id: number
  companyId: number
  areaCode: string
  divisionId: number
  positionId: number
  contractType: string
  grade: string
  positionLevel: string
  level: string
  duration: number | null
  startDate: null
  endDate: null
}

interface Rekening {
  name: string
  bank: string
  rekening: string
}

interface BPJS {
  kesehatan: string
  tenagaKerja: string
}

interface AnggotaKeluarga {
  id: number
  name: string
  relationship: 'Ibu' | 'Pasangan' | 'Anak' | string
  gender: string | null
  birthPlace: string | null
  birthDate: string | null
  ktp: string | null
  job: null
}

interface Mutasi {
  tanggal: string
  deskripsi: string
}

interface Keluar {
  tipe: string
  kategori: string
  tanggalKeluar: string
  kontrak: string
  tanggalPengajuan: string
  keterangan: string
}

interface Karyawan {
  id: number
  nik: string
  status: string
  statusAktif: string
  nama: string
  departement: number
  pendidikan: {
    id: number
    stage: string
    major: string
  }
  jurusan: string
  tanggungan: string
  tanggunganPajak: string
  statusPernikahan: string
  tanggalUpdateKK: string
  ktp: string
  perusahaan: null | {
    id: string | number
    code: string | number
    name: string
  }
  asalKtp: string
  kabupatenKtp: string
  kecamatanKtp: string
  asalPOH: string
  asalPOHKTP: string
  kerjaPOH: string
  kategoriPOH: string
  telepon: string
  teleponDarurat: string
  jalan: string
  kecamatan: string
  kabupatenKota: string
  provinsi: string
  rekening: Rekening
  keluar: Keluar
  mutasi: Mutasi
  dataKeluarga: AnggotaKeluarga[]
  kontrak: Kontrak[]
  npwp: string
  jenisKelamin: string
  tempatLahir: string
  tanggalLahir: string
  bpjs: BPJS
  sim: string
  kartuKeluarga: string
  tanggalUpdateKartuKeluarga: string
  umur: number
  agama: string
  divisi: null | {
    id: string | number
    nama: string
  }
  jabatan: null | {
    id: string | number
    nama: string
  }
  wilayah: Area
  grade: string
  dateOfHiring: string
  kontrakSebelumnya: string
  kontrakSekarang: string
  kategoriPekerjaan: KategoriPekerjaan
  foto: string | null
}

interface KaryawanInstance extends Karyawan {
  departmenName: string
  getPasangan: () => AnggotaKeluarga[] | null
  getAnak: () => AnggotaKeluarga[] | null
  getOrangTua: () => AnggotaKeluarga[] | null
}

export {
  Karyawan,
  Keluar,
  AnggotaKeluarga,
  Rekening,
  Kontrak,
  BPJS,
  KaryawanInstance
}
