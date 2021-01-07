import React, { useCallback, useState, useRef } from 'react'
//import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../../atoms/selectedOptionCard'
import { deleteOption, reorderOptions, setOptionInputs } from '../../../actions/build-strategy/'
import styled from 'styled-components'
import Draggable from 'react-draggable'

const OptionsBox = styled.div`
  height: 650px;
  width: 100%;
  padding: 30px;
  background: #fafafa;
  border-radius: 5px;
  overflow: auto;
  @media (max-width: 767.98px) {
    padding: 10px;
  }
`

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

  const onDisableDraggable = useCallback((_disabledDraggable, { id }) => {
    console.log(_disabledDraggable)
    setDisabledDraggable({
      ...disabledDraggable,
      [id]: _disabledDraggable
    })
  }, [])

  return (
    <OptionsBox>
      {/*<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {options.map((_option, index) => (
                <Draggable key={_option.id} draggableId={_option.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={index > 0 ? 'mt-3' : null}
                      /*style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <SelectedOptionCard
                        option={_option}
                        onChange={_inputs => onChangeInputs(_inputs, _option)}
                        onDelete={() => deleteOption(_option.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>*/}

      {options.map((_option, index) => (
        <Draggable
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={positions[_option.id]}
          disabledDraggable={disabledDraggable[_option.id]}
          scale={1}
          onDrag={(_e, _ui) => onChangePositions(_e, _ui, _option)}
        >
          <div className="handle" key={`draggable-${_option.id}`} ref={nodeRef}>
            <SelectedOptionCard
              option={_option}
              onChange={_inputs => onChangeInputs(_inputs, _option)}
              onDelete={() => deleteOption(_option.id)}
              onDisableDraggable={_disabledDraggable => onDisableDraggable(_disabledDraggable, _option)}
            />
          </div>
        </Draggable>
      ))}
    </OptionsBox>
  )
}

SelectedOptions.propTypes = {
  options: PropTypes.array,
  deleteOption: PropTypes.func,
  reorderOptions: PropTypes.func,
  setOptionInputs: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
