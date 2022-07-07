import styled, { css } from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Checkbox } from '../components/Checkbox'

import { formatForCurrency, translateFuelLabel } from '../helpers/utils'

import NoImagem from '../assets/images/no-image.png'

import WishlistIcon from '../assets/icons/wishlist.svg'
import ArrowLeftIcon from '../assets/icons/arrow-left.svg'
import ArrowRightIcon from '../assets/icons/arrow-right.svg'
import PinIcon from '../assets/icons/pin-market.svg'
import DashboardIcon from '../assets/icons/dashboard.svg'
import GearboxIcon from '../assets/icons/gearbox.svg'
import PetrolIcon from '../assets/icons/petrol.svg'
import { MOCKED_ADVERTS } from '../helpers/mocks'

export const Card = ({ car, onCompareClick, isSecondary }) => {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)

  const renderBadge = (condition) => {
    switch (condition) {
      case 1:
        return <div className="info info-label">Usado</div>
      case 0:
        return <div className="info warning-label">Novo</div>
    }
  }

  const handleOnChange = (event) => {
    event.stopPropagation()

    setIsChecked(event.target.checked)

    if (event.target.checked) {
      return onCompareClick((state) => state + 1)
    }

    onCompareClick((state) => state - 1)
  }

  const handleOnClick = () => {
    navigate(`/cars/${car.id}`)
  }

  return (
    <StyledCard
      className={`card ${isSecondary ? 'secondary' : ''}`}
      onClick={handleOnClick}
    >
      <div className="wrapper">
        <div className="slider">
          {/* {car.photos.map((photo) => ( */}
          <img
            key={car.photos?.id}
            className="show"
            src={car.photos?.value ?? NoImagem}
          />
          {/* ))} */}
        </div>

        <div className="icons">
          <img
            className="wishlist"
            src={WishlistIcon}
            alt="Adicionar aos favoritos"
          />
          <img
            className="arrow-left"
            src={ArrowLeftIcon}
            alt="Imagem anterior"
          />
          <img
            className="arrow-right"
            src={ArrowRightIcon}
            alt="Próxima imagem"
          />
        </div>
      </div>

      <div className="label">
        {renderBadge(car.condition?.value)}
        {car.certifield && (
          <div className="info success-label">Certificado</div>
        )}
      </div>

      <div className="container">
        <div className="content">
          <div className="info-header">
            <span>{car?.year}</span>

            <Checkbox
              checked={isChecked}
              onChange={handleOnChange}
              onClick={(e) => e.stopPropagation()}
              label="Compare"
              name={`compare-${car.id}`}
              id={`compare-${car.id}`}
            />
          </div>

          <div className="info">
            <h1>{car?.model}</h1>
            <span>{formatForCurrency(car?.price)}</span>

            {car.location?.value && (
              <div>
                <img
                  className="pin-market"
                  src={PinIcon}
                  alt="Estado de venda/locação"
                />
                <small>{car.location?.value}</small>
              </div>
            )}
          </div>
        </div>

        <div className="icons">
          <div className="icon">
            <img src={DashboardIcon} alt="Quilometragem do veículo" />
            <span>{`${car.kilometers} km` ?? '0 km'}</span>
          </div>

          <div className="icon">
            <img src={GearboxIcon} alt="Transmissão do veículo" />
            <span>Manual</span>
          </div>

          <div className="icon">
            <img src={PetrolIcon} alt="Combustível de alimentação" />
            <span>{translateFuelLabel(car.fuel?.id) ?? 'Gasolina'}</span>
          </div>
        </div>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.article(
  ({ theme }) => css`
    cursor: pointer;
    position: relative;
    background-color: ${theme.colors.white.n040};
    border-radius: ${theme.borderRadius.lg};
    overflow: hidden;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    -webkit-transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
    -moz-transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
    -o-transition: opacity 0.2s ease-in, border-color 0.2s ease-in;
    transition: opacity 0.2s ease-in, border-color 0.2s ease-in;

    &:hover {
      border-color: ${theme.colors.white.n150};
    }

    &:hover > .container .content .info h1 {
      color: ${theme.colors.white.n000};
    }

    &:hover .wrapper img {
      opacity: 0.7;
    }

    &:hover .wrapper .icons img {
      opacity: 1;
    }

    &.secondary {
      max-height: 239px;
      flex-direction: row;
      flex: 1 1 auto !important;
    }

    &.secondary .wrapper {
      min-height: 239px;
      width: 40.85%; /* (259px / 634 - 2 (border)) * 100%  */
    }

    &.secondary .wrapper .slider-desktop {
      min-height: 239px;
    }

    &.secondary .container {
      flex: 1 1 auto;
      width: 59.15%; /* (375px / 634 - 2 (border)) * 100% */
    }

    &.secondary .wrapper .slider-desktop img {
      min-height: 239px;
    }

    .label {
      position: absolute;
      top: 2rem;
      left: 2rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
    }

    .label .info {
      display: inline-block;
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      border-radius: ${theme.borderRadius.sm};
      padding: 1px 10px 2px 10px;
      color: ${theme.colors.white.n000};
      margin-bottom: 4px;
    }

    .label .info-label {
      background-color: ${theme.colors.info};
    }

    .label .warning-label {
      background-color: ${theme.colors.warning};
    }

    .label .success-label {
      background-color: ${theme.colors.success};
    }

    .wrapper {
      position: relative;
      overflow: hidden;
      transition: left linear 0.3s;
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      min-height: 150px;
      max-height: 263px;
    }

    .wrapper img {
      -webkit-transition: opacity 0.2s ease-in;
      -moz-transition: opacity 0.2s ease-in;
      -o-transition: opacity 0.2s ease-in;
      transition: opacity 0.2s ease-in;
    }

    .wrapper .slider {
      height: 100%;
      overflow: hidden;
    }

    .wrapper .slider img {
      display: none;
    }

    .wrapper .slider img.show {
      display: block;
      max-height: 263px;
    }

    .wrapper .icons .wishlist {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 3.2rem;
      height: 3.2rem;
      box-shadow: ${theme.shadows.default};
      color: ${theme.colors.primary};
      border-radius: 50%;
      cursor: pointer;
    }

    .wrapper .icons .arrow-left,
    .wrapper .icons .arrow-right {
      width: 0.8rem;
      height: 1.4rem;
      color: ${theme.colors.white.n000};
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .wrapper .icons .arrow-left {
      left: 1rem;
    }
    .wrapper .icons .arrow-right {
      right: 1rem;
    }

    .wrapper .icons .wishlist,
    .wrapper .icons .arrow-left,
    .wrapper .icons .arrow-right {
      opacity: 0;
      -webkit-transition: all 0.2s ease-in;
      -moz-transition: all 0.2s ease-in;
      -o-transition: all 0.2s ease-in;
      transition: all 0.2s ease-in;
    }

    .wrapper:hover .icons .wishlist,
    .wrapper:hover .icons .arrow-left,
    .wrapper:hover .icons .arrow-right {
      opacity: 1;
    }

    .container {
      padding: 2rem;

      display: flex;
      flex-direction: column;
    }

    .container .content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      border-bottom: 0.1rem solid ${theme.colors.white.n150};
      margin-bottom: 1.6rem;
    }

    .container .content .info-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .container .content .info-header > span {
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.white.n000};
    }

    .container .content .info {
      display: flex;
      flex-direction: column;
    }

    .container .content .info span {
      display: block;
      font-size: ${theme.fontSizes.sm};
      font-weight: ${theme.fontWeights.regular};
      line-height: ${theme.lineHeights.sm};
      color: ${theme.colors.white.n000};
      margin-bottom: 0.4rem;
    }

    .container .content .info div {
      display: flex;
      align-items: center;
      margin-bottom: 1.6rem;
      justify-content: flex-start;
    }

    .container .content .info div .pin-market {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.4rem;
      object-fit: contain;
      opacity: 0.7;
    }

    .container .content .info div small {
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      color: ${theme.colors.white.n700};
      font-weight: ${theme.fontWeights.regular};
    }

    .container .content .info h1 {
      font-size: ${theme.fontSizes.lg};
      line-height: ${theme.lineHeights.lg};
      color: ${theme.colors.white.n700};
      font-weight: ${theme.fontWeights.bold};
      margin-bottom: 0.4rem;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      -webkit-transition: color 0.2s ease-in;
      -moz-transition: color 0.2s ease-in;
      -o-transition: color 0.2s ease-in;
      transition: color 0.2s ease-in;
    }

    .container .content .info > span {
      font-size: ${theme.fontSizes.base};
      font-weight: ${theme.fontWeights.bold};
      line-height: ${theme.lineHeights.base};
      color: ${theme.colors.primary};
      margin-bottom: 0.4rem;
    }

    .container .icons {
      display: flex;
      gap: 1.2rem;
    }

    .container .icons .icon {
      flex: 1 1 100%;
      background-color: ${theme.colors.gray.n900};
      border-radius: ${theme.borderRadius.base};
      text-align: center;
      padding: 0.8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-width: 0;
    }

    .container .icons .icon img {
      width: 2.4rem;
      height: 2.4rem;
      display: inline-block;
      margin-bottom: 0.4rem;
    }

    .container .icons .icon span {
      display: block;
      color: ${theme.colors.white.n000};
      font-size: ${theme.fontSizes.xs};
      font-weight: ${theme.fontWeights.regular};
      line-height: ${theme.lineHeights.xs};
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 88px;
      max-width: 100%;
    }

    /* BULLETS */
    .bullets {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }

    .bullets span {
      display: inline-block;
      width: 1.6rem;
      height: 0.6rem;
      border-radius: 4rem;
      background-color: ${theme.colors.white.n000};
      opacity: 0.7;
      margin-left: 0.5rem;
      cursor: pointer;
    }

    .bullets span:first-child {
      margin: 0;
    }

    .bullets span:hover {
      opacity: 1;
    }

    .bullets span.active {
      width: 3.2rem;
      opacity: 1;
    }

    /* 800px / 16px = 50em */
    @media only screen and (max-width: 860px) {
      &.secondary {
        max-height: none;
      }

      &.secondary .wrapper {
        max-width: none;
        min-height: 150px;
        width: 100%;
      }

      &.secondary .container {
        width: 100%;
      }
    }
  `
)
