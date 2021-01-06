import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, Row, Col, InputGroup, FormControl } from 'react-bootstrap'

const Logo = styled.img`
  height: 50px;
  width: 50px;
`

const Method = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const SelectedOptionCard = ({ option: { method, name, args } }) => {
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs={2}>
            <Logo src={`../img/png/${name}.png`} alt="logo" />
          </Col>
          <Col xs={8} className="text-center my-auto">
            <Method>{method}</Method>
          </Col>
          <Col xs={2} className="text-left my-auto">
            Delete
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <InputGroup>
          {args.map(_arg => {
            return <FormControl key={`${method}${_arg}`} placeholder={_arg} aria-label={_arg} />
          })}
        </InputGroup>
      </Card.Body>
    </Card>
  )
}

SelectedOptionCard.propTypes = {
  option: PropTypes.object.isRequired
}

export default SelectedOptionCard
