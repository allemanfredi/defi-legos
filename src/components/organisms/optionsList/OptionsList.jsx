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
  border-radius: 50%;
`

const Method = styled.div`
  cursor: pointer;
  text-align: center;
  font-weight: 400;
`

const ClickableIcon = styled(Icon)`
  cursor: pointer;
  width: 16px;
  heigth: 16px;
`

const StyledListGroupItem = styled(ListGroup.Item)`
  border: 1px solid rgb(0 0 0 / 10%); !important;
  cursor: pointer;
`

const ContainerOptionList = styled.div`
  max-height: 400px;
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
    <ContainerOptionList>
      <ListGroup>
        {Object.keys(settings.options).map((_protocol, _index) => {
          return (
            <Fragment key={`${_protocol}${_index}`}>
              <StyledListGroupItem
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
                  <Col xs={3} className="text-right my-auto">
                    <ClickableIcon icon={showedInnerOption[_protocol] ? 'up' : 'down'} color="#7E8592" />
                  </Col>
                </Row>
              </StyledListGroupItem>
              {showedInnerOption[_protocol]
                ? Object.values(
                    settings.options[_protocol].map((_option, _index) => {
                      return (
                        <StyledListGroupItem key={`inner-${_protocol}${_index}`} onClick={() => selectOption(_option)}>
                          <Method>{_option.method}</Method>
                        </StyledListGroupItem>
                      )
                    })
                  )
                : null}
            </Fragment>
          )
        })}
      </ListGroup>
    </ContainerOptionList>
  )
}

OptionsList.propTypes = {
  selectOption: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList)
