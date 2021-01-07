import React, { useCallback, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../../atoms/selectedOptionCard'
import { deleteOption, reorderOptions, setOptionInputs } from '../../../actions/build-strategy/'
import Draggable from 'react-draggable'

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    deleteOption: _id => _dispatch(deleteOption(_id)),
    reorderOptions: (_startIndex, _endIndex) => _dispatch(deleteOption(reorderOptions(_startIndex, _endIndex))),
    setOptionInputs: (_inputs, _option) => _dispatch(setOptionInputs(_inputs, _option))
  }
}

const SelectedOptions = ({ options, deleteOption, reorderOptions, setOptionInputs }) => {
  const nodeRef = useRef(null)
  const [disabledDraggable, setDisabledDraggable] = useState({})
  const [positions, setPositions] = useState({})
  const [isDrawing, setIsDrawing] = useState(false)
  /*const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (!source || !destination) return
      reorderOptions(source.index, destination.index)
    },
    [reorderOptions]
  )*/

  const onChangeInputs = useCallback((_inputs, _option) => {
    setOptionInputs(_inputs, _option)
  }, [])

  const onChangePositions = useCallback((_e, { x, y }, { id }) => {
    setPositions({
      ...positions,
      [id]: {
        x,
        y
      }
    })
  }, [])

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
          key={`draggable-${_option.id}`}
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={positions[_option.id]}
          disabledDraggable={disabledDraggable[_option.id]}
          scale={1}
          onDrag={(_e, _ui) => onChangePositions(_e, _ui, _option)}
        >
          <div className="handle" ref={nodeRef}>
            <SelectedOptionCard
              option={_option}
              onChange={_inputs => onChangeInputs(_inputs, _option)}
              onDelete={() => deleteOption(_option.id)}
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
  deleteOption: PropTypes.func,
  reorderOptions: PropTypes.func,
  setOptionInputs: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
