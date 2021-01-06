import React, { useCallback, useState, Fragment } from 'react'
import { ListGroup } from 'react-bootstrap'
import settings from '../../../settings'
import { connect } from 'react-redux'
import { selectOption } from '../../../actions/build-strategy/'
import PropTypes from 'prop-types'

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

  return (
    <ListGroup>
      {Object.keys(settings.options).map((_protocol, _index) => {
        return (
          <Fragment key={`${_protocol}${_index}`}>
            <ListGroup.Item onClick={() => showInnerOptions(_protocol)}>{_protocol}</ListGroup.Item>
            {showedInnerOption[_protocol]
              ? Object.values(
                  settings.options[_protocol].map((_option, _index) => {
                    return (
                      <ListGroup.Item key={`inner-${_protocol}${_index}`} onClick={() => selectOption(_option)}>
                        {_option.name + _option.method}
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
