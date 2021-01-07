import React from 'react'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'

const StyledHeader = styled(Card.Header)`
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  background: white !important;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 0 !important;
`

const CardHeader = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>
}

export default CardHeader
