export interface Pelamar {
  ktp: string
  id: number | string
  tanggalBerkasMasuk: string | undefined
  noBantex: string
  status: string
  kategori: string
  nik: number | string
  nama: string
  tempatLahir: string
  tanggalLahir: string | undefined
  umur: number
  jenisKelamin: string
  zonaIndustri: string
  alamat: {
    desa: string
    kecamatan: string
    kabupaten: string
    provinsi: string
  }
  agama: string
  statusPernikahan: string
  nomorTelpon: {
    telpon1: string
    telpon2: string
  }
  pendidikan: string
  jurusan: string
  sertifikat: {
    nama: string
    jenis: string
  }
  nomerPencariKerja: string | number
  rekomendasi: string
  sim: string
  pengalamanKerja: string
  posisiYangDilamar: string
  keterangan: string
}

export interface PelamarInstance extends Pelamar {
  test?: () => void
}
