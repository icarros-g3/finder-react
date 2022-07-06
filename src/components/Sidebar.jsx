import styled, { css } from 'styled-components'
import { useState, useEffect, useContext } from 'react'

import { Toggle } from './Toggle'
import { Checkbox } from './Checkbox'
import { Select } from './Select'
import { ButtonCheckbox } from './ButtonCheckbox'

import { SearchDataContent } from '../context/SearchDataContext'
import { getFilters } from '../services/filters'
import { getFiftyYearsFromNow } from '../helpers/utils'
import { MOCKED_FILTERS } from '../helpers/mocks'
import { useDebounce } from '../hooks/useDebounce'

import ChevronIcon from '../assets/icons/chevron.svg'

const initialFiltersOptions = {
  locales: [],
  types: [],
  brands: [],
  models: [],
  additionals: [],
  fuels: [],
  transmissions: [],
  mileages: [],
  colors: [],
}

const FIFTY_YEARS_FROM_NOW = getFiftyYearsFromNow()

export const Sidebar = ({ isFilterOpen, setIsFilterOpen }) => {
  const [filterOptions, setFilterOptions] = useState(initialFiltersOptions)
  const [minPrice, setMinPrice] = useState(10000)
  const [maxPrice, setMaxPrice] = useState(50000)
  const [startingYear, setStartingYear] = useState('')
  const [endingYear, setEndingYear] = useState('')
  const [negotiatedPrice, setNegotiatedPrice] = useState(false)

  const { searchData, setSearchData } = useContext(SearchDataContent)

  // TODO only if backend accept starting and ending year, negotiated price
  const {
    locale,
    brand,
    model,
    // startingYear,
    // endingYear,
    // negotiatedPrice,
    mileage,
    condition,
  } = searchData

  // TODO only if backend accept min and max price
  const debouncedMinPrice = useDebounce(minPrice)
  const debouncedMaxPrice = useDebounce(maxPrice)

  const handleSearchData = (value, name) => {
    setSearchData((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  const handleCheckboxSearchData = (newValue, name, checked) => {
    const newValues = checked
      ? [...searchData[name], newValue]
      : searchData[name].filter((value) => value !== newValue)

    console.log(newValues)

    setSearchData((state) => {
      return {
        ...state,
        [name]: newValues,
      }
    })
  }

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const filters = await getFilters()

        setFilterOptions((state) => {
          return {
            ...state,
            ...filters,
          }
        })
      } catch (error) {
        setFilterOptions(MOCKED_FILTERS)
        console.log(error)
      }
    }
    loadFilters()
  }, [])

  // TODO only if backend accept min and max price
  // useEffect(() => {
  //   const newSearchData = {
  //     ...searchData,
  //     minPrice: debouncedMinPrice,
  //     maxPrice: debouncedMaxPrice,
  //   }

  //   setSearchData(newSearchData)
  // }, [debouncedMinPrice, debouncedMaxPrice])

  const isSelectModelDisabled = brand === ''

  console.log(searchData)

  return (
    <>
      <SidebarOverlay
        className={`sidebar-overlay ${isFilterOpen ? 'show' : ''}`}
        id="sidebar-overlay"
        onClick={() => setIsFilterOpen(false)}
      >
        <label
          className="sidebar-button--close"
          type="button"
          role="button"
          aria-label="Fechar lista de filtros"
          aria-pressed="false"
          onClick={() => setIsFilterOpen(false)}
        >
          <span className="line line--top"></span>
          <span className="line line--bottom"></span>
        </label>
      </SidebarOverlay>

      <StyledSidebar
        className={`sidebar ${isFilterOpen ? ' show' : ''}`}
        id="sidebar"
        aria-label="Filtros de pesquisa"
      >
        <label
          className="sidebar-button--close"
          type="button"
          role="button"
          aria-label="Fechar lista de filtros"
          aria-pressed="false"
          onClick={() => setIsFilterOpen(false)}
        >
          <span className="line line--top"></span>
          <span className="line line--bottom"></span>
        </label>

        <div className="actions-btn-wrapper">
          <ButtonCheckbox
            label="Novo"
            name="new"
            id="new"
            maxWidth="72px"
            checked={condition === 1}
            onChange={(e) =>
              handleSearchData(e.target.checked ? 1 : 2, 'condition')
            }
          />

          <ButtonCheckbox
            label="Usado"
            name="used"
            id="usado"
            maxWidth="80px"
            checked={condition === 2}
            onChange={(e) =>
              handleSearchData(e.target.checked ? 2 : 1, 'condition')
            }
          />
        </div>

        <h1 className="sidebar-caption">Filtros</h1>

        <form className="sidebar-form" id="sidebar-form">
          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Localização</legend>

              <Select
                id="locale"
                name="locale"
                options={[
                  { label: 'Escolha o local', value: '' },
                  ...filterOptions.locales.map((model) => ({
                    value: model.id,
                    label: model.value,
                  })),
                ]}
                selected={locale}
                onChange={(value) => handleSearchData(value, 'locale')}
              />
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Tipo</legend>

              <ul
                className="sidebar-form__list"
                role="listbox"
                tabIndex="0"
                aria-label="tipo"
                id="list-type"
              >
                {filterOptions.types.map((type) => (
                  <li
                    key={type.id}
                    aria-checked={true}
                    className="sidebar-form__item checkbox"
                    tabIndex="-1"
                    role="option"
                  >
                    <Checkbox
                      id={type.value}
                      name={type.value}
                      label={type.value}
                      checked={searchData.cartype.includes(type.id)}
                      onChange={(e) =>
                        handleCheckboxSearchData(
                          type.id,
                          'cartype',
                          e.target.checked
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Marca e modelo</legend>

              <div className="sidebar-form__wrapper--column">
                <Select
                  id="brand"
                  name="brand"
                  options={[
                    { label: 'Marca', value: '' },
                    ...filterOptions.brands.map((model) => ({
                      value: model.id,
                      label: model.value,
                    })),
                  ]}
                  selected={brand}
                  onChange={(value) => handleSearchData(value, 'brand')}
                />

                <Select
                  id="model"
                  name="model"
                  options={[
                    { label: 'Modelos', value: '' },
                    ...filterOptions.models.map((model) => ({
                      value: model.id,
                      label: model.value,
                    })),
                  ]}
                  selected={model}
                  onChange={(value) => handleSearchData(value, 'model')}
                  disabled={isSelectModelDisabled}
                />
              </div>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Ano</legend>

              <div className="sidebar-form__wrapper--row">
                <Select
                  id="startingYear"
                  name="startingYear"
                  options={[
                    { label: 'Todos', value: '' },
                    ...FIFTY_YEARS_FROM_NOW.map((year) => ({
                      label: year,
                      value: year,
                    })),
                  ]}
                  selected={startingYear}
                  // onChange={(value) => handleSearchData(value, 'startingYear')}
                  onChange={setStartingYear}
                />

                <span className="horizontal-divider"></span>

                <Select
                  id="endingYear"
                  name="endingYear"
                  options={[
                    { label: 'Todos', value: '' },
                    ...FIFTY_YEARS_FROM_NOW.map((year) => ({
                      label: year,
                      value: year,
                    })),
                  ]}
                  selected={endingYear}
                  // onChange={(value) => handleSearchData(value, 'endingYear')}
                  onChange={setEndingYear}
                />
              </div>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset direction-column">
              <legend className="sidebar-form__legend">Preço</legend>

              <div className="sidebar-form__input-wrapper">
                <label className="visually-hidden" htmlFor="minPrice">
                  Preço Inicial
                </label>
                <input
                  className="sidebar-form__input--number"
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  min="0"
                  placeholder="Mínimo"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />

                <span className="horizontal-divider"></span>

                <label className="visually-hidden" htmlFor="ending-price">
                  Preço Final
                </label>
                <input
                  className="sidebar-form__input--number"
                  type="number"
                  id="ending-price"
                  name="ending-price"
                  min="0"
                  placeholder="Máximo"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <Toggle
                type="checkbox"
                name="negotiatedPrice"
                id="negotiatedPrice"
                aria-label="preço negociado"
                label="Preço negociado"
                checked={negotiatedPrice}
                onChange={(e) =>
                  // handleSearchData(e.target.checked, 'negotiatedPrice')
                  setNegotiatedPrice(e.target.checked)
                }
              />
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Adicionais</legend>

              <ul
                className="sidebar-form__list"
                role="listbox"
                tabIndex="0"
                aria-label="adicionais"
                id="list-car-type"
              >
                {filterOptions.additionals.map((additional) => (
                  <li
                    key={additional.id}
                    className="sidebar-form__item checkbox"
                    tabIndex="-1"
                    role="option"
                    aria-checked="false"
                  >
                    <Checkbox
                      id={additional.value}
                      name={additional.value}
                      label={additional.value}
                      checked={searchData.additional.includes(additional.id)}
                      onChange={(e) =>
                        handleCheckboxSearchData(
                          additional.id,
                          'additional',
                          e.target.checked
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Combustível</legend>

              <ul
                className="sidebar-form__list"
                role="listbox"
                tabIndex="0"
                aria-label="combustível"
                id="list-fuel"
              >
                {filterOptions.fuels.map((fuel) => (
                  <li
                    key={fuel.id}
                    className="sidebar-form__item checkbox"
                    tabIndex="-1"
                    role="option"
                    aria-checked="false"
                  >
                    <Checkbox
                      id={fuel.value}
                      name={fuel.value}
                      label={fuel.value}
                      checked={searchData.fuel.includes(fuel.id)}
                      onChange={(e) =>
                        handleCheckboxSearchData(
                          fuel.id,
                          'fuel',
                          e.target.checked
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Transmissão</legend>

              <ul
                className="sidebar-form__list"
                role="listbox"
                tabIndex="0"
                aria-label="transmissão"
                id="list-transmission"
              >
                {filterOptions.transmissions.map((transmission) => (
                  <li
                    key={transmission.id}
                    className="sidebar-form__item checkbox"
                    tabIndex="-1"
                    role="option"
                    aria-checked="false"
                  >
                    <Checkbox
                      id={transmission.value}
                      name={transmission.value}
                      label={transmission.value}
                      checked={searchData.transmission.includes(
                        transmission.id
                      )}
                      onChange={(e) =>
                        handleCheckboxSearchData(
                          transmission.id,
                          'transmission',
                          e.target.checked
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Quilometragem</legend>

              <Select
                id="mileage"
                name="mileage"
                options={[
                  { label: 'Todas', value: '' },
                  ...filterOptions.mileages.map((model) => ({
                    value: model.id,
                    label: model.value,
                  })),
                ]}
                selected={mileage}
                onChange={(value) => handleSearchData(value, 'mileage')}
              />
            </fieldset>
          </div>

          <div className="sidebar-form__content">
            <fieldset className="sidebar-form__fieldset">
              <legend className="sidebar-form__legend">Cor</legend>

              <ul
                className="sidebar-form__list"
                role="listbox"
                tabIndex="0"
                aria-label="cor"
                id="list-color"
              >
                {filterOptions.colors.map((color) => (
                  <li
                    key={color.id}
                    className="sidebar-form__item checkbox"
                    tabIndex="-1"
                    role="option"
                    aria-checked="false"
                  >
                    <Checkbox
                      id={color.value}
                      name={color.value}
                      label={color.value}
                      checked={searchData.color.includes(color.id)}
                      onChange={(e) =>
                        handleCheckboxSearchData(
                          color.id,
                          'color',
                          e.target.checked
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        </form>
      </StyledSidebar>
    </>
  )
}

const SidebarOverlay = styled.div(
  ({ theme }) => css`
    max-width: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 10;
    background-color: ${theme.colors.gray.n995};
    overflow: hidden;
    pointer-events: all;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s, visibility 0.5s;
    margin-right: 0;
    overflow-y: auto;

    &.show {
      opacity: 1;
      visibility: visible;
    }

    .sidebar-button--close {
      display: flex;
    }

    @media screen and (max-width: 400px) {
      .sidebar-button--close {
        display: none;
      }
    }
  `
)

const StyledSidebar = styled.aside(
  ({ theme }) => css`
    max-width: 22.38%;
    width: 100%;
    flex-direction: column;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    margin-right: 40px;

    &.show {
      left: 0;
    }

    .sidebar-button--close {
      position: absolute;
      top: 20px;
      right: 24px;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
    }

    .sidebar-button--close .line {
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: ${theme.colors.primary};
    }

    .sidebar-button--close .line.line--top {
      transform: rotate(45deg);
    }

    .sidebar-button--close .line.line--bottom {
      transform: rotate(-45deg);
    }

    .sidebar-button--close {
      display: none;
    }

    .actions-btn-wrapper,
    .sidebar-caption {
      display: flex;
      border-bottom: 1px solid;
      border-color: ${theme.colors.white.n150};
      margin-bottom: 24px;
      padding-bottom: 24px;
      width: 100%;
    }

    .actions-btn-wrapper > *:not(:last-child) {
      margin-right: 12px;
    }

    .sidebar-caption,
    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__legend {
      font-size: ${theme.fontSizes.lg};
      font-weight: ${theme.fontWeights.bold};
      line-height: ${theme.lineHeights.lg};
      color: ${theme.colors.white.n000};
    }

    .sidebar-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    .sidebar-form .sidebar-form__content {
      display: flex;
      flex: 1 1 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
    }

    .sidebar-form .sidebar-form__content:not(:last-child) {
      margin-bottom: 32px;
    }

    .sidebar-form .sidebar-form__content .sidebar-form__fieldset {
      flex: 1 1 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      border: none;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__legend {
      margin-bottom: 12px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--select {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 100%;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--select
      .chevron--icon {
      position: absolute;
      content: '';
      width: 100%;
      height: 14px;
      max-width: 14px;
      min-width: 14px;
      background-color: ${theme.colors.white.n000};
      mask-image: url(${ChevronIcon});
      -webkit-mask-image: url(${ChevronIcon});
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      mask-size: cover;
      -webkit-mask-size: cover;
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--select
      .sidebar-form__select[disabled]
      + .chevron--icon {
      background-color: ${theme.colors.white.n120};
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--column {
      display: flex;
      flex-direction: column;
      flex: 1 1 100%;
      justify-content: center;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--column
      > *:not(:last-child) {
      margin-bottom: 8px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--row {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 1 100%;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--row
      .sidebar-form__select.select-year {
      max-width: 129px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--row
      .horizontal-divider,
    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__input-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 35px;
      flex: 1 1 100%;
      width: 100%;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__wrapper--row
      .horizontal-divider,
    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__input-wrapper
      .horizontal-divider {
      color: ${theme.colors.white.n000};
      max-width: 16px;
      height: 1px;
      display: block;
      background-color: ${theme.colors.white.n000};
      margin: 0 8px;
      width: 100%;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__select,
    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__input--number {
      width: 100%;
      flex: 1 1 100%;
      padding: 9px 17px 9px 17px;
      background: ${theme.colors.white.n040};
      border: 1px solid ${theme.colors.white.n120};
      border-radius: 8px;
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.white.n000};
      appearance: none;
      z-index: 1;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__select {
      padding: 9px 37px 9px 17px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__select[disabled] {
      color: ${theme.colors.white.n120};
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__select
      option {
      color: ${theme.colors.bg.primary};
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__input-wrapper
      .sidebar-form__input--number {
      max-width: 129px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__toggle {
      margin-bottom: 27px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__list {
      width: 100%;
      max-height: 166px;
      max-width: 290px;
      overflow: auto;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__list::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar {
      width: 3px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__list:hover::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__list::-webkit-scrollbar-track {
      background: ${theme.colors.white.n150};
      border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.white.n150};
      border-radius: 20px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__fieldset
      .sidebar-form__list::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.white.n000};
      border-radius: 20px;
      border: 3px solid ${theme.colors.white.n000};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme.colors.white.n000};
      border-radius: 20px;
      border: 3px solid ${theme.colors.white.n000};
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__list
      .sidebar-form__item {
      margin-bottom: 8px;
    }

    .sidebar-form
      .sidebar-form__content
      .sidebar-form__list
      .sidebar-form__item
      .styled-checkbox {
      justify-content: flex-start;
    }

    @media screen and (max-width: 1110px) {
      max-width: 20%;

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper {
        flex-direction: column;
        gap: 8px;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--select {
        width: 100%;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .sidebar-form__select.select-year,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .sidebar-form__input--number {
        max-width: 100%;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .horizontal-divider,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .horizontal-divider {
        display: none;
      }
    }

    @media screen and (max-width: 1000px) {
      max-width: 290px;
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      left: -290px;
      right: 0;
      bottom: 0;
      padding: 24px 20px;
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 10;
      background-color: ${theme.colors.gray.n900};
      overflow: hidden;
      pointer-events: all;
      transition: left 0.5s;
      margin-right: 0;
      overflow-y: auto;

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper {
        flex-direction: row;
        gap: 0;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .sidebar-form__select.select-year,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .sidebar-form__input--number {
        max-width: 129px;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .horizontal-divider,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .horizontal-divider {
        display: block;
      }
    }

    @media screen and (max-width: 400px) {
      &.show {
        max-width: 100%;
      }

      .sidebar-button--close {
        display: flex;
        top: 26px;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__list,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .sidebar-form__select.select-year,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .sidebar-form__input--number {
        max-width: 100%;
      }
    }

    @media screen and (max-width: 300px) {
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper {
        flex-direction: column;
        gap: 8px;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--select {
        width: 100%;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .sidebar-form__select.select-year,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .sidebar-form__input--number {
        max-width: 100%;
      }

      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__wrapper--row
        .horizontal-divider,
      .sidebar-form
        .sidebar-form__content
        .sidebar-form__fieldset
        .sidebar-form__input-wrapper
        .horizontal-divider {
        display: none;
      }
    }
  `
)
