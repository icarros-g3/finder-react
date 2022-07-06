import styled, { css } from 'styled-components'
import { useState, useEffect, useContext } from 'react'

import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Card } from '../../components/Card'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/Sidebar'

import { getAdverts } from '../../services/advert'
import { SearchDataContent } from '../../context/SearchDataContext'

import GridIcon from '../../assets/icons/grid.svg'
import ListIcon from '../../assets/icons/list.svg'
import FilterIcon from '../../assets/icons/filter.svg'
import SwitchHorizontalIcon from '../../assets/icons/switch-horizontal.svg'
import ChevronIcon from '../../assets/icons/chevron.svg'
import AlignLeftIcon from '../../assets/icons/align-left.svg'
import CarIcon from '../../assets/icons/car.svg'

const generateTitleByCondition = (condition) => {
  if (condition === 1) {
    return 'Novos'
  }

  return 'Usados'
}

export const Catalog = () => {
  const [comparisons, setComparisons] = useState(0)
  const [isListView, setIsListView] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [adverts, setAdverts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [orderBy, setOrderBy] = useState('newest')

  const { searchData } = useContext(SearchDataContent)

  useEffect(() => {
    const loadAdverts = async () => {
      try {
        const searchDataWithoutEmptyValues = Object.entries(searchData).reduce(
          (acc, [key, value]) => {
            if (value) {
              acc[key] = value
            }

            return acc
          },
          {}
        )

        const { data } = await getAdverts(searchDataWithoutEmptyValues, page)

        setAdverts(data.results)
        setTotalPages(Number(data.totalPages))
      } catch (error) {
        console.log(error)
      }
    }
    loadAdverts()
  }, [page, searchData])

  return (
    <>
      <Navbar />

      <Main className="center-page-content">
        <Sidebar
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <CatalogSection className="catalogo">
          <section className="catalog-header">
            <div className="catalog-header-wrapper">
              <nav
                className="breadcrumbs"
                aria-label="breadcrumbs"
                role="navigation"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>

                  <li className="breadcrumb-item active">
                    <a href="#" aria-current="page">
                      Carros {}
                    </a>
                  </li>
                </ol>
              </nav>

              <div className="title-container">
                <h1 className="title">
                  Carros {generateTitleByCondition(searchData.condition)}
                </h1>

                <div className="offers">
                  <i className="car--icon"></i>
                  <span className="offers--text">
                    <span className="offers--counter" id="offers-counter">
                      {adverts.length}
                    </span>
                    ofertas
                  </span>
                </div>
              </div>

              <div className="actions">
                <div className="sorting-compare">
                  <div className="sorting">
                    <div className="sorting__label">
                      <i className="align-left--icon"></i>
                      <span className="sorting__label--text">Ordenar por:</span>
                    </div>

                    <div className="sorting__wrapper--select">
                      <label className="visually-hidden" htmlFor="order2">
                        Ordenar por:
                      </label>
                      <select
                        className="sorting__select"
                        name="order"
                        id="order2"
                        value={orderBy}
                        onChange={(e) => setOrderBy(e.target.value)}
                      >
                        <option className="sorting__option" value="newest">
                          Mais novo
                        </option>

                        <option className="sorting__option" value="oldest">
                          Mais velho
                        </option>
                      </select>
                      <i className="chevron--icon" tabIndex="-1"></i>
                    </div>
                  </div>

                  <div className="compare">
                    <div className="compare__label">
                      <i className="switch-horizontal--icon"></i>
                      <span className="compare__label--text">
                        Compare
                        <span className="compare__label--counter">
                          ({comparisons})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="actions--view">
                  <button
                    className={`filter-btn ${isFilterOpen ? 'active' : ''}`}
                    id="filter-btn"
                    type="button"
                    aria-label="Mostrar filtros"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <i className="filter-btn--icon"></i>
                    <span className="filter-btn--text">Filtros</span>
                  </button>

                  <div className="divider"></div>

                  <div className="view">
                    <i
                      className={`list--icon ${isListView ? 'active' : ''}`}
                      role="button"
                      aria-label="Exibir em linhas"
                      aria-pressed={isListView}
                      id="show-inline"
                      onClick={() => setIsListView(true)}
                    ></i>
                    <i
                      className={`grid--icon ${!isListView ? 'active' : ''}`}
                      role="button"
                      aria-label="Exibir em colunas"
                      aria-pressed={!isListView}
                      id="show-column"
                      onClick={() => setIsListView(false)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="wrapper-container" id="catalog-list">
            {adverts.map((advert) => (
              <Card
                key={advert.id}
                car={advert}
                onCompareClick={setComparisons}
                isSecondary={isListView}
              />
            ))}
          </section>

          <section className="footer-catalogo">
            <div className="sorting-compare">
              <div className="sorting">
                <div className="sorting__label">
                  <i className="align-left--icon"></i>
                  <span className="sorting__label--text">Ordenar por:</span>
                </div>

                <div className="sorting__wrapper--select">
                  <label className="visually-hidden" htmlFor="order">
                    Ordenar por:
                  </label>
                  <select
                    className="sorting__select"
                    name="order"
                    id="order"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <option className="sorting__option" value="newest">
                      Mais novo
                    </option>

                    <option className="sorting__option" value="oldest">
                      Mais velho
                    </option>
                  </select>
                  <i className="chevron--icon" tabIndex="-1"></i>
                </div>
              </div>

              <div className="compare">
                <div className="compare__label">
                  <i className="switch-horizontal--icon"></i>
                  <span className="compare__label--text">
                    Compare
                    <span className="compare__label--counter">
                      ({comparisons})
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {adverts.length && (
              <Pagination
                currentPage={page}
                onPageChange={setPage}
                totalCount={totalPages * 20}
                pageCount={totalPages}
                pageSize={20}
              />
            )}
          </section>
        </CatalogSection>
      </Main>

      <Footer />
    </>
  )
}

const Main = styled.main`
  display: flex;
  flex: 1 1 100% !important;
  margin: 32px auto 80px auto !important;
`

const CatalogSection = styled.section(
  ({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 966px;
    width: 100%;

    .wrapper-container {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 24px;
    }

    .wrapper-container .card {
      height: auto;
      flex: 1 1 320px;
      max-width: 439px;

      &.secondary {
        max-width: 100%;
      }
    }

    .wrapper-container .wrapper .slider {
      width: 100%;
    }

    .wrapper-container .container .icons .icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    section.footer-catalogo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: 44px;
      flex-wrap: wrap;
      margin-top: 32px;
      gap: 16px;
    }

    section.footer-catalogo .sorting-compare {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    section.footer-catalogo .sorting-compare .sorting {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    section.footer-catalogo .sorting-compare .sorting::after {
      content: '';
      width: 1px;
      height: 20px;
      background-color: ${theme.colors.white.n150};
      margin: 0 24px;
    }

    section.footer-catalogo .sorting-compare .sorting .sorting__label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    section.footer-catalogo .sorting-compare .sorting .align-left--icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      max-width: 18px;
      max-height: 18px;
      mask-image: url(${AlignLeftIcon});
      -webkit-mask-image: url(${AlignLeftIcon});
      background-color: ${theme.colors.white.n000};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin-right: 4px;
      flex: 1 1 100%;
    }

    section.footer-catalogo
      .sorting-compare
      .sorting
      .sorting__label
      .sorting__label--text {
      white-space: nowrap;
      margin-right: 12px;
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.white.n000};
    }

    section.footer-catalogo
      .sorting-compare
      .sorting
      .sorting__wrapper--select {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 100%;
    }

    section.footer-catalogo
      .sorting-compare
      .sorting
      .sorting__wrapper--select
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
      right: 16px;
      transform: translateY(-50%);
    }

    section.footer-catalogo
      .sorting-compare
      .sorting
      .sorting__wrapper--select
      select {
      appearance: none;
      padding: 6px 36px 7px 16px;
      margin: 0;
      min-width: 180px;
      max-width: 180px;
      width: 100%;
      color: ${theme.colors.white.n000};
      flex: 1 1 100%;
      background: ${theme.colors.white.n040};
      border: 1px solid ${theme.colors.white.n120};
      border-radius: ${theme.borderRadius.sm};
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      z-index: 1;
    }

    section.footer-catalogo
      .sorting-compare
      .sorting-compare
      .sorting
      .sorting__wrapper--select
      select[disabled]
      + .chevron--icon {
      background-color: ${theme.colors.white.n120};
    }

    section.footer-catalogo .sorting-compare .compare {
      display: flex;
      align-items: center;
    }

    section.footer-catalogo .sorting-compare .compare .compare__label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    section.footer-catalogo
      .sorting-compare
      .compare
      .compare__label
      .switch-horizontal--icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      max-width: 18px;
      max-height: 18px;
      mask-image: url(${SwitchHorizontalIcon});
      -webkit-mask-image: url(${SwitchHorizontalIcon});
      background-color: ${theme.colors.white.n700};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin-right: 4px;
    }

    section.footer-catalogo
      .sorting-compare
      .compare
      .compare__label
      .compare__label--text,
    section.footer-catalogo
      .sorting-compare
      .compare
      .compare__label
      .compare__label--counter {
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.bold};
      color: ${theme.colors.white.n700};
    }

    section.footer-catalogo
      .sorting-compare
      .compare
      .compare__label
      .compare__label--counter {
      margin-left: 4px;
    }

    section.footer-catalogo .pagination-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    section.footer-catalogo .pagination-container .pagination {
      list-style-type: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      > .pagination__item {
      margin: 0 4px;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:first-of-type {
      margin-left: 0;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:last-of-type {
      margin-right: 0;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.regular};
      max-width: 24px;
      max-height: 24px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      -webkit-transition: background-color 0.2s ease-in;
      -moz-transition: background-color 0.2s ease-in;
      -o-transition: background-color 0.2s ease-in;
      transition: background-color 0.2s ease-in;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:hover {
      background-color: ${theme.colors.white.n000};
      font-weight: ${theme.fontWeights.bold};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:hover
      > .pagination__link {
      color: ${theme.colors.primary};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:hover
      > .pagination__link
      .pagination-icon--chevron {
      background-color: ${theme.colors.primary};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item.active {
      display: inline-block;
      font-weight: 700;
      background-color: ${theme.colors.white.n000};
      width: 24px;
      height: 24px;
      text-align: center;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item.active
      > .pagination__link {
      color: ${theme.colors.primary};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item.active
      > .pagination__link
      .pagination-icon--chevron {
      background-color: ${theme.colors.primary};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item.disabled {
      pointer-events: none;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item.disabled
      > .pagination__link
      .pagination-icon--chevron {
      background-color: ${theme.colors.white.n400};
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item
      .pagination__link {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${theme.colors.white.n700};
      -webkit-transition: color 0.2s ease-in;
      -moz-transition: color 0.2s ease-in;
      -o-transition: color 0.2s ease-in;
      transition: color 0.2s ease-in;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item
      .pagination__link
      .pagination-icon--chevron {
      width: 100%;
      height: 16px;
      max-width: 16px;
      min-width: 16px;
      mask-image: url(../../assets/icons/chevron.svg);
      -webkit-mask-image: url(../../assets/icons/chevron.svg);
      background-color: ${theme.colors.white.n000};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      -webkit-transition: background-color 0.2s ease-in;
      -moz-transition: background-color 0.2s ease-in;
      -o-transition: background-color 0.2s ease-in;
      transition: background-color 0.2s ease-in;
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:first-of-type
      .pagination__link
      .pagination-icon--chevron {
      transform: rotate(90deg);
    }

    section.footer-catalogo
      .pagination-container
      .pagination
      .pagination__item:last-of-type
      .pagination__link
      .pagination-icon--chevron {
      transform: rotate(270deg);
    }

    @media only screen and (max-width: 768px) {
      section.footer-catalogo .sorting-compare {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      section.footer-catalogo {
        align-items: flex-start;
      }

      section.footer-catalogo .sorting-compare .sorting::after {
        display: none;
      }

      section.footer-catalogo .sorting-compare .compare,
      section.footer-catalogo .pagination-container {
        min-height: 44px;
      }
    }

    @media only screen and (max-width: 600px) {
      section.footer-catalogo {
        position: relative;
      }

      section.footer-catalogo .pagination-container {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }

    @media only screen and (max-width: 456px) {
      section.footer-catalogo .sorting-compare {
        flex: 1 1 auto;
      }
      section.footer-catalogo .sorting-compare .sorting {
        width: 100%;
      }
      section.footer-catalogo
        .sorting-compare
        .sorting
        .sorting__wrapper--select
        select {
        max-width: 100%;
        min-width: 0;
      }
    }

    @media only screen and (max-width: 420px) {
      section.footer-catalogo {
        flex-direction: column;
      }

      section.footer-catalogo .pagination-container {
        position: static;
        margin: 0 auto;
      }

      section.footer-catalogo .sorting-compare .sorting {
        flex-direction: column;
        gap: 16px;
      }

      section.footer-catalogo .sorting-compare {
        align-items: center;
        width: 100%;
      }

      section.footer-catalogo
        .sorting-compare
        .sorting
        .sorting__wrapper--select {
        width: 100%;
      }
    }

    .catalog-header {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 3.2rem;
    }

    .catalog-header .catalog-header-wrapper {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      max-width: 966px;
    }

    .catalog-header .catalog-header-wrapper .breadcrumbs {
      margin-bottom: 16px;
    }

    .catalog-header .catalog-header-wrapper .breadcrumbs .breadcrumb {
      display: flex;
      align-items: center;
      padding: 0px;
      gap: 8px;
      height: 21px;
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      .breadcrumb-item {
      display: flex;
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.bold};
      align-items: center;
      justify-content: flex-start;
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      .breadcrumb-item:hover
      a {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      .breadcrumb-item
      a {
      color: ${theme.colors.white.n500};
      margin-left: 8px;
      text-decoration-color: transparent;
      text-decoration-style: solid;
      text-decoration-line: underline;
      -webkit-transition: color 0.2s ease-in, text-decoration 0.2s ease-in;
      -moz-transition: color 0.2s ease-in, text-decoration 0.2s ease-in;
      -o-transition: color 0.2s ease-in, text-decoration 0.2s ease-in;
      transition: color 0.2s ease-in, text-decoration 0.2s ease-in;
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      > *:not(:first-of-type)::before {
      content: '';
      display: inline-block;
      mask-image: url(${ChevronIcon});
      -webkit-mask-image: url(${ChevronIcon});
      background-color: ${theme.colors.white.n000};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      display: inline-block;
      background-size: cover;
      width: 1.2rem;
      height: 1.2rem;
      max-width: 1.2rem;
      max-height: 1.2rem;
      transform: rotate(-90deg);
      background-color: ${theme.colors.white.n500};
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      .breadcrumb-item.active
      a {
      color: ${theme.colors.white.n000};
    }

    .catalog-header
      .catalog-header-wrapper
      .breadcrumbs
      .breadcrumb
      .breadcrumb-item.active:hover
      a {
      color: ${theme.colors.primary};
    }

    .catalog-header .catalog-header-wrapper .breadcrumb .chevron--icon {
      display: inline-block;
      background: url(${ChevronIcon}) 0 0 no-repeat;
      display: inline-block;
      background-size: cover;
      width: 1.8rem;
      height: 1.8rem;
      opacity: 0.5;
    }

    .catalog-header .catalog-header-wrapper .title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 3.2rem;
      flex-wrap: wrap;
      gap: 16px;
    }

    .catalog-header .catalog-header-wrapper .title-container .title {
      font-size: ${theme.fontSizes.h1};
      line-height: ${theme.lineHeights.h1};
      font-weight: ${theme.fontWeights.bold};
      color: ${theme.colors.white.n000};
    }

    .catalog-header .catalog-header-wrapper .title-container .offers {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .catalog-header
      .catalog-header-wrapper
      .title-container
      .offers
      .offers--text {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: ${theme.colors.white.n000};
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.bold};
    }

    .catalog-header
      .catalog-header-wrapper
      .title-container
      .offers
      .offers--counter {
      margin-right: 4px;
    }

    .catalog-header
      .catalog-header-wrapper
      .title-container
      .offers
      .car--icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      max-width: 20px;
      max-height: 20px;
      mask-image: url(${CarIcon});
      -webkit-mask-image: url(${CarIcon});
      background-color: ${theme.colors.white.n000};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin-right: 8px;
    }

    .catalog-header .catalog-header-wrapper .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: 44px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .catalog-header .catalog-header-wrapper .actions .sorting-compare {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .catalog-header .catalog-header-wrapper .actions .sorting-compare .sorting {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting::after {
      content: '';
      width: 1px;
      height: 20px;
      background-color: ${theme.colors.white.n150};
      margin: 0 24px;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .align-left--icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      max-width: 18px;
      max-height: 18px;
      mask-image: url(${AlignLeftIcon});
      -webkit-mask-image: url(${AlignLeftIcon});
      background-color: ${theme.colors.white.n000};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin-right: 4px;
      flex: 1 1 100%;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__label
      .sorting__label--text {
      white-space: nowrap;
      margin-right: 12px;
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.white.n000};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__wrapper--select {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex: 1 1 100%;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__wrapper--select
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
      right: 16px;
      transform: translateY(-50%);
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__wrapper--select
      select {
      appearance: none;
      padding: 6px 36px 7px 16px;
      margin: 0;
      min-width: 180px;
      max-width: 180px;
      width: 100%;
      color: ${theme.colors.white.n000};
      flex: 1 1 100%;
      background: ${theme.colors.white.n040};
      border: 1px solid ${theme.colors.white.n120};
      border-radius: ${theme.borderRadius.sm};
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      z-index: 1;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .sorting
      .sorting__wrapper--select
      select[disabled]
      + .chevron--icon {
      background-color: ${theme.colors.white.n120};
    }

    .catalog-header .catalog-header-wrapper .actions .sorting-compare .compare {
      display: flex;
      align-items: center;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .compare
      .compare__label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .compare
      .compare__label
      .switch-horizontal--icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      max-width: 18px;
      max-height: 18px;
      mask-image: url(${SwitchHorizontalIcon});
      -webkit-mask-image: url(${SwitchHorizontalIcon});
      background-color: ${theme.colors.white.n700};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin-right: 4px;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .compare
      .compare__label
      .compare__label--text,
    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .compare
      .compare__label
      .compare__label--counter {
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.bold};
      color: ${theme.colors.white.n700};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .sorting-compare
      .compare
      .compare__label
      .compare__label--counter {
      margin-left: 4px;
    }

    .catalog-header .catalog-header-wrapper .actions .actions--view {
      display: flex;
      min-height: 44px;
      align-items: center;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn {
      display: none;
      gap: 8px;
      align-items: center;
      border-color: transparent;
      background-color: transparent;
      min-height: 36px;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn.active
      .filter-btn--text {
      color: ${theme.colors.primary};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn.active
      .filter-btn--icon {
      background-color: ${theme.colors.primary};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn:hover
      .filter-btn--text {
      color: ${theme.colors.primary};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn:hover
      .filter-btn--icon {
      background-color: ${theme.colors.primary};
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn
      .filter-btn--icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      max-width: 18px;
      max-height: 18px;
      mask-image: url(${FilterIcon});
      -webkit-mask-image: url(${FilterIcon});
      background-color: ${theme.colors.white.n500};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      -webkit-transition: background-color 0.2s ease-in;
      -moz-transition: background-color 0.2s ease-in;
      -o-transition: background-color 0.2s ease-in;
      transition: background-color 0.2s ease-in;
    }

    .catalog-header
      .catalog-header-wrapper
      .actions
      .actions--view
      .filter-btn
      .filter-btn--text {
      color: ${theme.colors.white.n500};
      font-size: ${theme.fontSizes.base};
      line-height: ${theme.lineHeights.base};
      font-weight: ${theme.fontWeights.bold};
      -webkit-transition: color 0.2s ease-in;
      -moz-transition: color 0.2s ease-in;
      -o-transition: color 0.2s ease-in;
      transition: color 0.2s ease-in;
    }

    .catalog-header .catalog-header-wrapper .actions .actions--view .divider {
      display: none;
      content: '';
      width: 1px;
      height: 20px;
      background-color: ${theme.colors.white.n150};
      margin: 0 24px;
    }

    .catalog-header .catalog-header-wrapper .actions .view {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
    }

    .catalog-header .catalog-header-wrapper .actions .view i {
      cursor: pointer;
    }

    .catalog-header .catalog-header-wrapper .actions .view i.active {
      background-color: ${theme.colors.white.n000};
    }

    .catalog-header .catalog-header-wrapper .actions .view .list--icon,
    .catalog-header .catalog-header-wrapper .actions .view .grid--icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      max-width: 15px;
      max-height: 15px;
      background-color: ${theme.colors.white.n500};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: cover;
      mask-size: cover;
      margin: 2.5px;
      -webkit-transition: background-color 0.2s ease-in;
      -moz-transition: background-color 0.2s ease-in;
      -o-transition: background-color 0.2s ease-in;
      transition: background-color 0.2s ease-in;
    }

    .catalog-header .catalog-header-wrapper .actions .view .list--icon {
      mask-image: url(${ListIcon});
      -webkit-mask-image: url(${ListIcon});
    }

    .catalog-header .catalog-header-wrapper .actions .view .grid--icon {
      mask-image: url(${GridIcon});
      -webkit-mask-image: url(${GridIcon});
    }

    .catalog-header .catalog-header-wrapper .actions .view .list--icon:hover,
    .catalog-header .catalog-header-wrapper .actions .view .grid--icon:hover {
      background-color: ${theme.colors.primary};
    }

    @media only screen and (max-width: 1000px) {
      .catalog-header
        .catalog-header-wrapper
        .actions
        .actions--view
        .filter-btn,
      .catalog-header .catalog-header-wrapper .actions .actions--view .divider {
        display: flex;
      }
    }

    @media only screen and (max-width: 746px) {
      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .sorting::after {
        display: none;
      }

      .catalog-header .catalog-header-wrapper .actions {
        align-items: flex-end;
      }

      .catalog-header .catalog-header-wrapper .actions .sorting-compare {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .catalog-header .catalog-header-wrapper .actions .actions--view {
        flex-direction: column;
        gap: 16px;
        align-items: flex-end;
        justify-content: space-between;
        height: 100%;
      }

      .catalog-header .catalog-header-wrapper .actions .actions--view .divider {
        display: none;
      }

      .catalog-header .catalog-header-wrapper .actions .view {
        min-height: 24px;
      }
    }

    @media only screen and (max-width: 500px) {
      .catalog-header .catalog-header-wrapper .title-container {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    @media only screen and (max-width: 456px) {
      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .compare {
        min-height: 36px;
      }

      .catalog-header .catalog-header-wrapper .actions .actions--view {
        flex-direction: row;
        align-items: center;
        height: inherit;
        min-height: 0;
        position: absolute;
        right: 24px;
        gap: 0;
      }

      .catalog-header .catalog-header-wrapper .actions .sorting-compare {
        flex: 1 1 auto;
      }

      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .sorting {
        width: 100%;
      }

      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .sorting
        .sorting__wrapper--select
        select {
        max-width: 100%;
        min-width: 0;
      }

      .catalog-header .catalog-header-wrapper .actions .actions--view .divider {
        display: flex;
      }
    }

    @media only screen and (max-width: 385px) {
      .catalog-header .catalog-header-wrapper .title-container {
        align-items: center;
        text-align: center;
      }

      .catalog-header .catalog-header-wrapper .actions {
        flex-direction: column;
        align-items: center;
      }

      .catalog-header .catalog-header-wrapper .actions .sorting-compare {
        width: 100%;
      }

      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .sorting {
        flex-direction: column;
        gap: 16px;
      }

      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .sorting
        .sorting__wrapper--select {
        width: 100%;
      }

      .catalog-header
        .catalog-header-wrapper
        .actions
        .sorting-compare
        .compare {
        margin: 0 auto;
      }

      .catalog-header .catalog-header-wrapper .actions .actions--view {
        position: static;
      }

      .footer-catalogo .pagination-container .pagination {
        flex-wrap: wrap;
      }
    }
  `
)
