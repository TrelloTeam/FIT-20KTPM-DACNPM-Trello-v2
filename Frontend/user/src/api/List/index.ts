import { axiosPrivate } from '../api'

export const getAllListAPI = async () => {
  try {
    return await axiosPrivate.get('/api/cardlist', {
      headers: {}
    })
  } catch (err) {
    throw err
  }
}

export const createListAPI = async (data: any) => {
  try {
    return await axiosPrivate.post('/api/cardlist', data, {
      headers: {}
    })
  } catch (err) {
    throw err
  }
}
