module.exports = () => {
  const { faker } = require('@faker-js/faker/locale/id_ID')

  const data = { karyawan: [] }
  // Create 50 users
  for (let i = 0; i < 50; i++) {
    const karyawan = {
      nik: faker.datatype.number(),
      status: faker.helpers.arrayElement(['aktif', 'tidak aktif']),
      nama: faker.name.fullName(),
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
      ktp: 0,
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
  return data
}
