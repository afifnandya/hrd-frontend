import type { Karyawan } from '@/typing/karyawan'

function createKaryawan(): Karyawan {
  const karyawan: Karyawan = {
    nik: '',
    status: '',
    nama: '',
    departement: '',
    pendidikan: '',
    jurusan: '',
    tanggungan: '',
    tanggunganPajak: '',
    statusPernikahan: '',
    tanggalUpdateKK: '',
    ktp: 0,
    asalKtp: '',
    kabupatenKtp: '',
    kecamatanKtp: '',
    asalPOH: '',
    kerjaPOH: '',
    kategori: '',
    telepon: 0,
    teleponDarurat: 0,
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
    dataKeluarga: {
      kartuKeluarga: 'todo',
      ibuKandung: 'todo',
      pasangan: {
        nama: 'todo',
        ktp: 'todo',
        tanggalLahir: 'todo',
        temparLahir: 'todo'
      },
      jumlahAnak: 0,
      anak: []
    },
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
    kartuKeluarga: 0,
    umur: 0,
    agama: '',
    divisi: '',
    jabatan: '',
    grade: '',
    dateOfHiring: '',
    kontrakSebelumnya: '',
    kontrakSekarang: ''
  }
  return karyawan
}
