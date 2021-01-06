import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import SelectedOptionsController from '../../organisms/selectedOptions'
import OptionsList from '../../organisms/optionsList'
import { Row, Col } from 'react-bootstrap'

const Home = _props => {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} lg={8}>
          <SelectedOptionsController />
        </Col>
        <Col xs={12} lg={4}>
          <OptionsList />
        </Col>
      </Row>
    </Container>
  )
}

Home.propTypes = {}

export default Home
