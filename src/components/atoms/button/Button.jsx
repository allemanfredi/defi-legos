import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button``

const Button = _props => {
  const { onClick, disabled, text, className } = _props

  return (
    <StyledButton onClick={onClick} disabled={disabled} className={className}>
      {text}
    </StyledButton>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
