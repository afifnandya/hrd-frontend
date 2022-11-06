module.exports = () => {
  const { faker } = require('@faker-js/faker/locale/id_ID')

  const data = {
    karyawan: [],
    pelamar: {
      data: [],
      status: '',
      message: '',
      links: {}
    }
  }

  // Create karyawan
  for (let i = 0; i < 10; i++) {
    const karyawan = {
      nik: faker.datatype.number(),
      status: faker.helpers.arrayElement(['aktif', 'tidak aktif']),
      nama: faker.name.fullName(),
      perusahaan: faker.helpers.arrayElement(['BEISHI', 'BAOSHUO']),
      departement: faker.helpers.arrayElement([
        'finance',
        'ga',
        'logistic',
        'bussiness'
      ]),
      pendidikan: faker.helpers.arrayElement(['s1', 's2']),
      jurusan: faker.helpers.arrayElement(['hukum', 'pajak', 'psikologi']),
      tanggungan: faker.helpers.arrayElement(['aktif', 'tidak aktif']),
      tanggunganPajak: faker.helpers.arrayElement(['TK', 'K1']),
      statusPernikahan: faker.helpers.arrayElement(['aktif', 'tidak aktif']),
      tanggalUpdateKK: faker.helpers.arrayElement([
        'kawin',
        'tidak kawin',
        'cerai'
      ]),
      ktp: faker.datatype.uuid(),
      asalKtp: faker.helpers.arrayElement(['jakarta', 'depok', 'malang']),
      kabupatenKtp: faker.address.state,
      kecamatanKtp: faker.address.cityName,
      asalPOH: faker.address.cityName,
      kerjaPOH: faker.address.cityName,
      kategori: faker.helpers.arrayElement(['nasional', 'ambunu']),
      telepon: faker.phone.number('+62##########'),
      teleponDarurat: faker.phone.number('+62##########'),
      alamat: faker.address.streetAddress(true),
      rekening: {
        name: faker.name.fullName,
        bank: faker.helpers.arrayElement(['bca', 'mandiri', ' bri']),
        rekening: faker.datatype.number()
      },
      keluar: {
        tipe: faker.helpers.arrayElement(['phk', 'resign', '']),
        kategori: faker.helpers.arrayElement(['personal', 'pelanggaran', '']),
        tanggalKeluar: faker.datatype.datetime(),
        kontrak: faker.helpers.arrayElement(['pkwt1', 'pkwt2', '']),
        tanggalPengajuan: faker.datatype.datetime(),
        keterangan: faker.lorem.words()
      },
      mutasi: {
        tanggal: faker.datatype.datetime(),
        deskripsi: faker.lorem.words()
      },
      dataKeluarga: {
        kartuKeluarga: faker.datatype.number(),
        ibuKandung: faker.name.fullName(),
        pasangan: {
          nama: faker.name.fullName(),
          ktp: faker.datatype.number(),
          tanggalLahir: faker.date.birthdate(),
          temparLahir: faker.address.cityName()
        },
        jumlahAnak: faker.datatype.number({ max: 3 }),
        anak: []
      },
      kontrak: [],
      npwp: faker.datatype.uuid(),
      jenisKelamin: faker.helpers.arrayElement('laki-lakir', 'perempuan'),
      tempatLahir: faker.address.cityName(),
      tanggalLahir: faker.date.birthdate(),
      bpjs: {
        kesehatan: 'todo',
        tenagaKerja: 'todo'
      },
      sim: faker.helpers.arrayElement(['sim-a', 'sim-c']),
      kartuKeluarga: faker.datatype.uuid(),
      umur: faker.datatype.number({ max: 60, min: 28 }),
      agama: faker.helpers.arrayElement(['islam', 'kristen', 'hindu']),
      divisi: faker.helpers.arrayElement([
        'finance',
        'translator',
        'hr',
        'driver'
      ]),
      jabatan: faker.helpers.arrayElement(['staff', 'translator', 'operator']),
      grade: faker.helpers.arrayElement(['6A', '9', '10', '7']),
      dateOfHiring: faker.datatype.datetime(),
      kontrakSebelumnya: faker.helpers.arrayElement('pkwt1', 'pkwt2', ''),
      kontrakSekarang: faker.helpers.arrayElement('pkwt1', 'pkwt2', '')
    }
    data.karyawan.push(karyawan)
  }

  // create freelance
  for (let i = 0; i < 10; i++) {
    const pelamar = {
      ktp: faker.datatype.uuid(),
      id: faker.datatype.uuid(),
      tanggalBerkasMasuk: '2022-10-22',
      noBantex: faker.datatype.uuid(),
      status: 'pelamar',
      kategori: faker.helpers.arrayElement(['operator', 'umum']),
      nik: faker.datatype.uuid(),
      nama: faker.name.fullName(),
      tempatLahir: faker.address.cityName(),
      tanggalLahir: faker.date.birthdate(),
      jenisKelamin: faker.helpers.arrayElement(['laki-lakir', 'perempuan']),
      zonaIndustri: faker.helpers.arrayElement([
        'nasional',
        'lingkar industri'
      ]),
      alamat: {
        desa: faker.address.cityName(),
        kecamatan: faker.address.cityName(),
        kabupaten: faker.address.cityName(),
        provinsi: faker.address.cityName()
      },
      agama: 'islam',
      statusPernikahan: faker.helpers.arrayElement(['kawin', 'belum kawin']),
      nomorTelpon: {
        telpon1: faker.phone.number('+62##########'),
        telpon2: faker.phone.number('+62##########')
      },
      pendidikan: faker.helpers.arrayElement(['SMA', 'SMK', 'MA']),
      jurusan: 'IPA',
      sertifikat: '',
      nomerPencariKerja: faker.datatype.uuid(),
      rekomendasi: '',
      sim: '',
      pengalamanKerja: '',
      posisiYangDilamar: '',
      keterangan: ''
    }
    data.pelamar.data.push(pelamar)
  }
  return data
}
