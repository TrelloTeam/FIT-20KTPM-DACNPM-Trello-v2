import { axiosPrivate } from '../api'

export const getAllCardAPI = async () => {
  try {
    return await axiosPrivate.get('/api/card', {
      headers: {}
    })
  } catch (err) {
    throw err
  }
}

export const createCardAPI = async (data: any) => {
  try {
    return await axiosPrivate.post('/api/card', data, {
      headers: {}
    })
  } catch (err) {
    throw err
  }
}
