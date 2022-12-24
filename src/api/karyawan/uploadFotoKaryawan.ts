import useAxios, { isAxiosError } from '@/composable/useAxios'
import { DEFAULT_ERROR_MESSAGE } from '@/constants'
import { isEmpty } from 'lodash-es'

export async function uploadFotoKaryawan(
  id: string | number,
  file: File
): Promise<{ isSuccess: boolean; message: string }> {
  try {
    const formData = new FormData()
    formData.append('photo', file)
    const { data, status } = await useAxios({
      url: `/employees/${id}/photo`,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData
    })
    if (isEmpty(data)) {
      return {
        isSuccess: false,
        message: DEFAULT_ERROR_MESSAGE
      }
    }
    const response = data as { status: number; message: string }
    if (response.status !== 200) {
      return {
        isSuccess: false,
        message: response.message || DEFAULT_ERROR_MESSAGE
      }
    }
    return {
      isSuccess: true,
      message: response.message
    }
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        isSuccess: false,
        message: err.response?.data.message || err.message
      }
    }
    return {
      isSuccess: false,
      message: DEFAULT_ERROR_MESSAGE
    }
  }
}
