import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card as BootstrapCard, Row, Col, InputGroup, Form } from 'react-bootstrap'
import { Card, CardHeader } from '../../atoms/card'
import { ResizableBox } from 'react-resizable'
import { setOptionInputs, setOptionOrder } from '../../../actions/build-strategy/'
import { connect } from 'react-redux'

import 'react-resizable/css/styles.css'

const Logo = styled.img`
  height: 40px;
  width: 40px;
`

const Method = styled.span`
  font-size: 14px;
  font-weight: bold;
`

const StyledCard = styled(Card)`
  height: 150px;
  width: 400px;
  cursor: pointer;
`

const OrderNumberInput = styled.input`
  height: 25px;
  width: 25px;
  background: #f7d785;
  position: fixed;
  margin-top: -25px;
  left: -14px;
  border-radius: 50%;
  border: 0;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  outline: none;
`

const StyledFormControl = styled(Form.Control)`
  font-size: 14px !important;
`

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    setOptionInputs: (_inputs, _option) => _dispatch(setOptionInputs(_inputs, _option)),
    setOptionOrder: (_order, _option) => _dispatch(setOptionOrder(_order, _option))
  }
}

const SelectedOptionCard = ({ option, onDelete, /*onDisableDraggable,*/ setOptionInputs, setOptionOrder }) => {
  const [inputs, setInputs] = useState([])
  const [order, setOrder] = useState('')
  const { method, name, args } = option

  const onChangeInput = useCallback((_value, _index) => {
    const newInputs = inputs.slice()
    newInputs[_index] = _value
    setInputs(newInputs)
    setOptionInputs(newInputs, option)
  })

  const onChangeOrder = useCallback(_order => {
    setOrder(_order)
    setOptionOrder(_order, option)
  })

  useEffect(() => {
    console.log("mounted")
  }, [])

  return (
    /*<ResizableBox
      width={400}
      height={151}
      onResizeStart={() => onDisableDraggable(true)}
      onResize={() => onDisableDraggable(true)}
      onResizeStop={() => onDisableDraggable(false)} // TODO
    >*/
      <StyledCard>
        <CardHeader>
          <OrderNumberInput
            type="number"
            value={order}
            autocomplete="false"
            onChange={_e => onChangeOrder(_e.target.value)}
          />
          <Row>
            <Col xs={2}>
              <Logo src={`../img/png/${name}.png`} alt="logo" />
            </Col>
            <Col xs={8} className="text-center my-auto">
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
                    <StyledFormControl
                      key={`${method}${_arg}`}
                      placeholder={_arg}
                      value={inputs[_index] ? inputs[_index] : ''}
                      onChange={_e => onChangeInput(_e.target.value, _index)}
                    />
                  )
                })}
              </InputGroup>
            </Form.Row>
          </Form>
        </BootstrapCard.Body>
      </StyledCard>
    //</ResizableBox>
  )
}

SelectedOptionCard.propTypes = {
  option: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  setOptionInputs: PropTypes.func.isRequired,
  setOptionOrder: PropTypes.func.isRequired
  //onDisableDraggable: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptionCard)
