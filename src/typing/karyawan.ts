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
  relationship: string
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
  nik: string
  status: string
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
  perusahaan: {
    id: string | number
    code: string | number
    name: string
  }
  asalKtp: string
  kabupatenKtp: string
  kecamatanKtp: string
  asalPOH: string
  kerjaPOH: string
  kategori: string
  telepon: string
  teleponDarurat: string
  alamat: string
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
  umur: number
  agama: string
  divisi: {
    id: string | number
    name: string
  }
  jabatan: {
    id: string | number
    name: string
  }
  grade: string
  dateOfHiring: string
  kontrakSebelumnya: string
  kontrakSekarang: string
}

export { Karyawan, Keluar, AnggotaKeluarga, Rekening, Kontrak, BPJS }
