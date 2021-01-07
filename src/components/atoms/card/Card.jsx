import React from 'react'
import styled from 'styled-components'
import { Card as BootstrapCard } from 'react-bootstrap'

const StyledCard = styled(BootstrapCard)`
  color: inherit;
  text-decoration: none;
  box-shadow: 0 0 16px rgba(228, 231, 232, 0.45);
  border-radius: 3px;
  margin-bottom: 8px;
  background: white;
  overflow: hidden;
  transition: background 100ms ease-out 0s;
  border: 0 !important;
`

const Card = _props => {
  return <StyledCard {..._props}>{_props.children}</StyledCard>
}

export default Card
