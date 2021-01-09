import React, { useCallback, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../selectedOptionCard'
import { deleteOption, reorderOptions } from '../../../actions/build-strategy/'
import Draggable from 'react-draggable'

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    deleteOption: _id => _dispatch(deleteOption(_id)),
    reorderOptions: (_startIndex, _endIndex) => _dispatch(deleteOption(reorderOptions(_startIndex, _endIndex)))
  }
}

const SelectedOptions = ({ options, deleteOption, reorderOptions }) => {
  const nodeRef = useRef(null)
  const [positions, setPositions] = useState({})
  //const [disabledDraggable, setDisabledDraggable] = useState({})

  const onChangePositions = useCallback(
    (_e, { x, y }, { id }) => {
      setPositions({
        ...positions,
        [id]: {
          x,
          y
        }
      })
    },
    [positions]
  )

  const onDeletePositions = useCallback(
    _option => {
      const newOptions = options
      delete newOptions[_option.id]
      setPositions({
        ...newOptions
      })
      deleteOption(_option)
    },
    [deleteOption]
  )

  /*const onDisableDraggable = useCallback((_disabledDraggable, { id }) => {
    console.log({
      ...disabledDraggable,
      [id]: _disabledDraggable
    })
    setDisabledDraggable({
      ...disabledDraggable,
      [id]: _disabledDraggable
    })
  }, [])*/

  return (
    <Fragment>
      {options.map((_option, index) => (
        <Draggable
          ref={nodeRef}
          key={`draggable-${_option.id}`}
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[25, 25]}
          position={positions[_option.id]}
          //disabledDraggable={disabledDraggable[_option.id]}
          scale={1}
          onDrag={(_e, _ui) => onChangePositions(_e, _ui, _option)}
        >
          <div className="handle" ref={nodeRef}>
            <SelectedOptionCard
              option={_option}
              onDelete={() => onDeletePositions(_option)}
              //onDisableDraggable={_disabledDraggable => onDisableDraggable(_disabledDraggable, _option)} TODO
            />
          </div>
        </Draggable>
      ))}
    </Fragment>
  )
}

SelectedOptions.propTypes = {
  options: PropTypes.array,
  deleteOption: PropTypes.func.isRequired,
  reorderOptions: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
