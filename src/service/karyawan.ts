import useHttp from '@/composable/useHttp'

function getKaryawan({
  pageSize = 1,
  pageNumber = 10
}: {
  pageSize: number
  pageNumber: number
}) {
  const url = `/karyawan?_page=${pageNumber}&_limit=${pageSize}`
  return useHttp(url)
}

export { getKaryawan }
