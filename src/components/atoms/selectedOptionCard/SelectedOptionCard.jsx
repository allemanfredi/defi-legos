import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card as BootstrapCard, Row, Col, InputGroup, Form } from 'react-bootstrap'
import { Card, CardHeader } from '../../atoms/card'
import { ResizableBox } from 'react-resizable'

import 'react-resizable/css/styles.css'

const Logo = styled.img`
  height: 50px;
  width: 50px;
`

const Method = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const StyledCard = styled(Card)`
  cursor: pointer;
`

const Circle = styled.div`
  height: 30px;
  width: 30px;
  background: red;
  border-radius: 50%;
`

const SelectedOptionCard = ({ option: { method, name, args }, onDelete, onChange, onDisableDraggable, onDrawLine }) => {
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    // Your code here
  }, [])

  const onChangeInput = useCallback((_value, _index) => {
    const newInputs = inputs.slice()
    newInputs[_index] = _value
    setInputs(newInputs)
    onChange(newInputs)
  })

  return (
    <ResizableBox
      width={450}
      height={151}
      /*onResizeStart={() => onDisableDraggable(true)}
      onResize={() => onDisableDraggable(true)}
      onResizeStop={() => onDisableDraggable(false)}*/ // TODO
    >
      <StyledCard>
        <CardHeader>
          <Row>
            <Col xs={2}>
              <Logo src={`../img/png/${name}.png`} alt="logo" />
            </Col>
            <Col xs={4} className="text-center my-auto">
              <Circle onClick={onDrawLine} />
            </Col>
            <Col xs={4} className="text-center my-auto">
              <Method>{method}</Method>
            </Col>
            <Col xs={2} className="text-left my-auto" onClick={onDelete}>
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </Col>
          </Row>
        </CardHeader>
        <BootstrapCard.Body>
          <Form>
            <Form.Row>
              <InputGroup>
                {args.map((_arg, _index) => {
                  return (
                    <Form.Control
                      key={`${method}${_arg}`}
                      placeholder={_arg}
                      value={inputs[_index]}
                      onChange={_e => onChangeInput(_e.target.value, _index)}
                    />
                  )
                })}
              </InputGroup>
            </Form.Row>
          </Form>
        </BootstrapCard.Body>
      </StyledCard>
    </ResizableBox>
  )
}

SelectedOptionCard.propTypes = {
  option: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDisableDraggable: PropTypes.func.isRequired,
  onDrawLine: PropTypes.func.isRequired
}

export default SelectedOptionCard
