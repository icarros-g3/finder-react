import React, { createContext, useState } from 'react'

const SearchDataContext = createContext(null)

const initialSearchDataState = {
  condition: 2,
  locale: '',
  cartype: [],
  brand: '',
  model: '',
  additional: [],
  fuel: [],
  transmission: [],
  mileage: '',
  color: [],
}

export const SearchDataProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(initialSearchDataState)
  const [searchDataResult, setSearchDataResult] = useState([])

  return (
    <SearchDataContext.Provider
      value={{
        searchData,
        setSearchData,
        searchDataResult,
        setSearchDataResult,
      }}
    >
      {children}
    </SearchDataContext.Provider>
  )
}

export const SearchDataContent = SearchDataContext
