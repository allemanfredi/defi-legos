import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card as BootstrapCard, Row, Col, InputGroup, Form, Badge, Button } from 'react-bootstrap'
import { Card } from '../../atoms/card'
//import { ResizableBox } from 'react-resizable'
import { setOptionInputs, setOptionOrder, setOptionDisabled } from '../../../actions/build-strategy/'
import { connect } from 'react-redux'

import 'react-resizable/css/styles.css'

const Logo = styled.img`
  height: 30px;
  width: 30px;
  box-shadow: rgb(1 53 62) 1px 1px 9px -3px;
  border-radius: 50px;
`

const Method = styled.span`
  font-size: 14px;
  font-weight: bold;
`

const StyledCard = styled(Card)`
  width: 400px;
  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  background-color: ${({ disabled }) => (disabled ? 'rgba(245, 245, 245, 1); !important' : 'transparent')};
  opacity: ${({ disabled }) => (disabled ? '.6' : '1')};
`

const StyledFormControl = styled(Form.Control)`
  font-size: 14px !important;
  appearance: none;
  background-color: #fff;
  border-color: #e9ecf2;
  border-width: 1px;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 12px;
  line-height: 1.25rem;
`

const StrategyBadge = styled(Badge)`
  background: #ebf9ed;
  width: 100%;
  color: #42c655;
  font-size: 13px !important;
  border-radius: 4px;
`

const DisableButton = styled(Button)`
  font-size: 13px !important;
  border-radius: 4px;
  margin-left: 10px;
  background-color: #f0f1f5 !important;
  width: 100%;
  color: #a4aec6 !important;
  padding: 0 !important;
  font-weight: bold !important;
  border: 0 !important;
  &:focus {
    border: 0 !important;
    box-shadow: none !important;
  }
`

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    setOptionInputs: (_inputs, _option) => _dispatch(setOptionInputs(_inputs, _option)),
    setOptionOrder: (_order, _option) => _dispatch(setOptionOrder(_order, _option)),
    setOptionDisabled: (_disabled, _option) => _dispatch(setOptionDisabled(_disabled, _option))
  }
}

const SelectedOptionCard = ({
  option,
  onDelete,
  /*onDisableDraggable,*/ setOptionInputs,
  setOptionOrder,
  setOptionDisabled
}) => {
  const [inputs, setInputs] = useState([])
  const [order, setOrder] = useState('')
  const [disabled, setDisabled] = useState(false)
  const { method, name, args } = option

  const onChangeInput = useCallback(
    (_value, _index) => {
      const newInputs = inputs.slice()
      newInputs[_index] = _value
      setInputs(newInputs)
      setOptionInputs(newInputs, option)
    },
    [setOptionInputs, option]
  )

  const onChangeOrder = useCallback(
    _order => {
      setOrder(_order)
      setOptionOrder(_order, option)
    },
    [setOptionOrder, option]
  )

  const onChangeDisable = useCallback(() => {
    setDisabled(!disabled)
    setOptionDisabled(!disabled, option)
  }, [disabled])

  useEffect(() => {
    console.log('mounted')
  }, [])

  return (
    /*<ResizableBox
      width={400}
      height={151}
      onResizeStart={() => onDisableDraggable(true)}
      onResize={() => onDisableDraggable(true)}
      onResizeStop={() => onDisableDraggable(false)} // TODO
    >*/
    <StyledCard disabled={disabled}>
      {/*<OrderNumberInput
          type="number"
          value={order}
          autocomplete="false"
          onChange={_e => onChangeOrder(_e.target.value)}
        />*/}
      <BootstrapCard.Body>
        <Row>
          <Col xs={6} className="text-left">
            <Logo src={`../img/png/${name}.png`} alt="logo" />
          </Col>
          <Col xs={6} className="text-left">
            <button type="button" className="close" aria-label="Close" onClick={onDelete}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={6} className="text-left my-auto">
            <Method>{method}</Method>
          </Col>
          <Col xs={6} className="text-right my-auto d-flex">
            <StrategyBadge>#1</StrategyBadge>
            <DisableButton onClick={onChangeDisable}>{disabled ? 'ENABLE' : 'DISABLE'}</DisableButton>
          </Col>
        </Row>
        <Form className="mt-3">
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
  setOptionOrder: PropTypes.func.isRequired,
  setOptionDisabled: PropTypes.func.isRequired
  //onDisableDraggable: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptionCard)
