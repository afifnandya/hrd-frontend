import { Peruahaan, Divisi, Departmen, Posisi } from '@/typing/dataMaster'
export interface KaryawanHarianLepas {
  perusahaan: Peruahaan
  id: string | number
  status: string
  nama: string
  department: Departmen
  divisi: Divisi
  jabatan: Posisi
  doh: string
  tim: string
  durasiKerja: string | number
}
