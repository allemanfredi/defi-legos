import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card } from 'react-bootstrap'

const InfoCard = () => {
  return (
    <Card>
      <Card.Body>
        Defi legos allows you to create transactions composed of multiple interactions with the main Ethereum DEFI protocols.
        All in a single TRANSACTION!!!
      </Card.Body>
    </Card>
  )
}

InfoCard.propTypes = {}

export default InfoCard
