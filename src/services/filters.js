import { api } from './api'

export const getConditions = async () => api.get('/condition')

export const getLocales = async () => api.get('/locale')

export const getTypes = async () => api.get('/cartype')

export const getModels = async () => api.get('/carmodels')

export const getAdditional = async () => api.get('/additional')

export const getFuels = async () => api.get('/fuel')

export const getTransmissions = async () => api.get('/transmission')

export const getMileages = async () => api.get('/mileage')

export const getColors = async () => api.get('/colors')

export const getFilters = async () => {
  const { data: conditions } = await getConditions()
  const { data: locales } = await getLocales()
  const { data: types } = await getTypes()
  const { data: models } = await getModels()
  const { data: additionals } = await getAdditional()
  const { data: fuels } = await getFuels()
  const { data: transmissions } = await getTransmissions()
  const { data: mileages } = await getMileages()
  const { data: colors } = await getColors()

  return {
    conditions,
    locales,
    types,
    models,
    additionals,
    fuels,
    transmissions,
    mileages,
    colors,
  }
}
