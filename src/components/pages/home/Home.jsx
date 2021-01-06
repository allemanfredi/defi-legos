import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import SelectedOptions from '../../organisms/selectedOptions'

const Home = _props => {
  return (
    <Container>
      <SelectedOptions />
    </Container>
  )
}

Home.propTypes = {}

export default Home
