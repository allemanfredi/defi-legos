import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import SelectedOptions from '../../organisms/selectedOptions'
import OptionsList from '../../organisms/optionsList'
import { Row, Col } from 'react-bootstrap'
import InfoCard from '../../atoms/InfoCard'
import SmartAccountsCard from '../../organisms/smartAccountsCard'
import Button from '../../atoms/button'

const MainContainer = styled(Container)`
  max-width: 1700px !important;
`

const Label = styled.div`
  font-weight: bold;
  font-size: 16px;
`

const ExecuteButton = styled(Button)`
  width: 100%;
`

const Home = ({ buildAndExecute }) => {
  return (
    <MainContainer>
      <Row className="mt-3">
        <Col xs={12} lg={2}>
          <Row className="mt-5 font-weight-bold">
            <Col xs={12}>
              <Label>Options:</Label>
            </Col>
          </Row>
          <Row className="mt-2 font-weight-bold">
            <Col xs={12}>
              <ExecuteButton onClick={buildAndExecute} text={'Execute'} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={12}>
              <SmartAccountsCard />
            </Col>
          </Row>
          <Row className="mt-2 font-weight-bold">
            <Col xs={12}>
              <OptionsList />
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={10}>
          <Row className="mt-5 font-weight-bold">
            <Col xs={12}>
              <Label>Your current strategy:</Label>
            </Col>
          </Row>
          <Row className="mt-2 font-weight-bold">
            <Col xs={12}>
              <SelectedOptions />
            </Col>
          </Row>
        </Col>
      </Row>
    </MainContainer>
  )
}

Home.propTypes = {
  buildAndExecute: PropTypes.func
}

export default Home
