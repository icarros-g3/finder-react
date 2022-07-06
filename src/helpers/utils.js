import { api } from '../services/api'

/**
 *  Removes undefined fields from objects.
 */
export const removeUndefinedFields = (object) => {
  Object.keys(object).forEach((key) =>
    object[key] === undefined ? delete object[key] : {}
  )
}

/**
 * Fetches data from baseURL API. This function uses axios internally.
 */
export const fechDataFromApi = (pathName) => {
  return api.get(pathName)
}

/**
 *  Serializes object entries.
 */
export const paramsSerializer = (params) => {
  return new Promise((resolve, reject) => {
    const paramsArray = []
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        for (const v of value) {
          paramsArray.push(`${key}=${v}`)
        }
      } else {
        paramsArray.push(`${key}=${value}`)
      }
    })

    resolve(paramsArray.join('&'))
  })
}

/**
 *  Generates an array of numbers starting from the current year until fifty years before.
 *  Example: let yearsArray = [2022, 2021, 2020, ..., 1972];
 */
export const getFiftyYearsFromNow = () => {
  let yearsArray = []
  let currentYear = new Date().getFullYear()
  for (let index = currentYear; index >= currentYear - 50; index--) {
    yearsArray.push(index)
  }
  return yearsArray
}

export const formatForCurrency = (value) =>
  value &&
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export const translateFuelLabel = (fuel) => {
  switch (fuel) {
    case 1:
      return 'Gasolina'

    case 2:
      return 'Alcool'

    case 3:
      return 'Diesel'

    case 4:
      return 'Flex'

    case 5:
      return 'GNV'

    case 6:
      return 'Elétrico'

    case 7:
      return 'Híbrido'
  }
}
