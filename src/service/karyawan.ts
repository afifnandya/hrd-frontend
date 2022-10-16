import useHttp from '@/composable/useHttp'
import qs from 'qs'
import { createKaryawan } from '@/model/karyawan'

function createDummyKaryawan() {
  return createKaryawan()
}

function getKaryawan({
  pageSize,
  pageNumber,
  nik
}: {
  pageSize?: number
  pageNumber?: number
  nik?: string
}) {
  const filter = qs.stringify(
    {
      _page: pageNumber || null,
      _limit: pageSize || null,
      nik: nik || null
    },
    { skipNulls: true }
  )
  const url = `/karyawan?${filter}`
  return useHttp(url)
}

export { getKaryawan, createDummyKaryawan }
