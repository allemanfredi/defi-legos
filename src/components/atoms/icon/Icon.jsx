import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const commonCss = css`
  color: ${({ color }) => color};
  display: inline-block;
  width: 20px;
  heigth: 20px;
  & > svg {
    width: 100%;
    height: 100%;
    fill: currentcolor;
  }
  ${({ isGreyScale }) => (isGreyScale ? 'filter: grayscale(100%); opacity: 0.25;' : '')}
`
const StyledSpan = styled.span`
  ${commonCss};
`

const StyledImg = styled.img`
  ${commonCss};
`

const Icon = ({ icon, ...props }) => {
  if (icon.startsWith('data:') || icon.startsWith('http') || icon.startsWith('asset:')) {
    const asset = icon.startsWith('asset:') && `src/app/assets/icons/${icon.split(':')[1]}`
    return <StyledImg alt="" src={asset || icon} {...props} />
  }

  const svg = require(`!!raw-loader!./icons/${icon}.svg`).default
  return <StyledSpan {...props} dangerouslySetInnerHTML={{ __html: svg }} />
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  isGreyScale: PropTypes.bool,
  fontSize: PropTypes.string,
  color: PropTypes.string
}

Icon.defaultProps = {
  isGreyScale: false,
  fontSize: 'sizeIconBase',
  color: 'white'
}

export default Icon
