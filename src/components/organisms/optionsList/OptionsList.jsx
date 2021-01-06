import React, { useCallback, useState, Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'
import settings from '../../../settings'
import { connect } from 'react-redux'
import { selectOption } from '../../../actions/build-strategy/'
import PropTypes from 'prop-types'
import Icon from '../../atoms/icon'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

const Logo = styled.img`
  height: 30px;
  width: 30px;
`

const Method = styled.div`
  cursor: pointer;
  text-align: center;
`

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`

const mapStateToProps = _state => {
  return {}
}

const mapDispatchToProps = _dispatch => {
  return {
    selectOption: _option => _dispatch(selectOption(_option))
  }
}

const OptionsList = ({ selectOption }) => {
  const [showedInnerOption, setShowedInnerOption] = useState({})

  const showInnerOptions = useCallback(
    _protocol => {
      setShowedInnerOption({
        ...showedInnerOption,
        [_protocol]: true
      })
    },
    [showedInnerOption]
  )

  const closeInnerOptions = useCallback(
    _protocol => {
      setShowedInnerOption({
        ...showedInnerOption,
        [_protocol]: false
      })
    },
    [showedInnerOption]
  )

  return (
    <ListGroup>
      {Object.keys(settings.options).map((_protocol, _index) => {
        return (
          <Fragment key={`${_protocol}${_index}`}>
            <ListGroup.Item
              onClick={() =>
                showedInnerOption[_protocol] ? closeInnerOptions(_protocol) : showInnerOptions(_protocol)
              }
            >
              <Row>
                <Col xs={3} className="text-center">
                  <Logo src={`../img/png/${_protocol}.png`} alt="logo" />
                </Col>
                <Col xs={6} className="text-center my-auto font-weight-bold">
                  {settings.optionNameToLabel[_protocol]}
                </Col>
                <Col xs={3} className="text-right">
                  <ClickableIcon icon={showedInnerOption[_protocol] ? 'up' : 'down'} color="#696969" />
                </Col>
              </Row>
            </ListGroup.Item>
            {showedInnerOption[_protocol]
              ? Object.values(
                  settings.options[_protocol].map((_option, _index) => {
                    return (
                      <ListGroup.Item key={`inner-${_protocol}${_index}`} onClick={() => selectOption(_option)}>
                        <Method>{_option.method}</Method>
                      </ListGroup.Item>
                    )
                  })
                )
              : null}
          </Fragment>
        )
      })}
    </ListGroup>
  )
}

OptionsList.propTypes = {
  selectOption: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)
