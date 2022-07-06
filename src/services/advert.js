import { api } from './api'

export const getAdverts = (params = {}, page = 1) => {
  return api.get('/adverts', { params: { ...params, page } })
}
