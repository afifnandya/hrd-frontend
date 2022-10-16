interface Kontrak {
  nama: string
  durasi: number
  tanggalMulai: string
  tanggalAkhir: string
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

interface Anak {
  nama: string
  ktp: string
  jenisKelamin: string
  tempatLahir: string
  tanggalLahir: string
  umur: number
}

interface Pasangan {
  nama: string
  ktp: string
  tanggalLahir: string
  temparLahir: string
}

interface DataKeluarga {
  kartuKeluarga: string
  ibuKandung: string
  pasangan: Pasangan
  jumlahAnak: number
  anak: Anak[]
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
  departement: string
  pendidikan: string
  jurusan: string
  tanggungan: string
  tanggunganPajak: string
  statusPernikahan: string
  tanggalUpdateKK: string
  ktp: number
  perusahaan: string
  asalKtp: string
  kabupatenKtp: string
  kecamatanKtp: string
  asalPOH: string
  kerjaPOH: string
  kategori: string
  telepon: number
  teleponDarurat: number
  alamat: string
  rekening: Rekening
  keluar: Keluar
  mutasi: Mutasi
  dataKeluarga: DataKeluarga
  kontrak: Kontrak[]
  npwp: string
  jenisKelamin: string
  tempatLahir: string
  tanggalLahir: string
  bpjs: BPJS
  sim: string
  kartuKeluarga: number

  umur: number
  agama: string
  divisi: string
  jabatan: string
  grade: string
  dateOfHiring: string
  kontrakSebelumnya: string
  kontrakSekarang: string
}

export { Karyawan, Keluar, DataKeluarga, Rekening, Kontrak, Anak, BPJS }
