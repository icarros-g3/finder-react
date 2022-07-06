import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import propTypes from '@styled-system/prop-types'
import { border, flexbox, layout, space } from 'styled-system'

export const Toggle = ({
  checked,
  onChange,
  label,
  name,
  id,
  disabled = false,
  tabIndex = 0,
  ...props
}) => {
  return (
    <StyledLabel
      htmlFor={id}
      role="switch"
      aria-checked={checked}
      tabindex={tabIndex}
      disabled={disabled}
      {...props}
    >
      <input
        checked={checked}
        type="checkbox"
        name={name}
        id={id}
        aria-label={label}
        disabled={disabled}
        onChange={onChange}
      />
      <div className="toggle-switch"></div>
      <span>{label}</span>
    </StyledLabel>
  )
}

const StyledLabel = styled.label(
  ({ theme, disabled }) => css`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.fonts.primary};
    opacity: ${disabled ? '0.5' : '1.0'};

    & input[type='checkbox'] {
      display: none;
    }

    & .toggle-switch {
      display: inline-block;
      background-color: ${theme.colors.magenta.n800};
      width: 32px;
      height: 18px;
      position: relative;
      border-radius: 60px;
      overflow: hidden;
      vertical-align: middle;
      transition: background-color 0.25s;
    }

    & .toggle-switch::before,
    .toggle-switch::after {
      content: '';
    }

    & .toggle-switch::before {
      display: block;
      background-color: ${theme.colors.white.n000};
      border-radius: 50%;
      width: 14px;
      height: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-100%, -50%);
      transition: transform 0.2s;
    }

    & input[type='checkbox']:checked + .toggle-switch {
      background-color: ${theme.colors.success};
    }

    & input[type='checkbox']:checked + .toggle-switch::before {
      transform: translate(0, -50%);
    }

    & span {
      font-size: ${theme.fontSizes.sm};
      line-height: ${theme.lineHeights.sm};
      font-weight: ${theme.fontWeights.regular};
      color: ${theme.colors.text.white};
      margin-left: 8px;
      position: relative;
    }

    ${space}
    ${layout}
    ${border}
    ${flexbox}
  `
)

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.border,
  ...propTypes.flexbox,
}
