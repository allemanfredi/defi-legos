import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'

const StyledCard = styled(Card)`
  font-size: 16px;
`

const InfoCard = () => {
  return (
    <StyledCard>
      <Card.Body>
        Defi legos allows you to create transactions composed of multiple interactions with the main Ethereum DEFI
        protocols. All in a single TRANSACTION!
      </Card.Body>
    </StyledCard>
  )
}

InfoCard.propTypes = {}

export default InfoCard
