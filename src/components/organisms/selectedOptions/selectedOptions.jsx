import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../../atoms/selectedOptionCard'
import { deleteOption, reorderOptions } from '../../../actions/build-strategy/'

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    deleteOption: _option => _dispatch(deleteOption(_option)),
    reorderOptions: (_startIndex, _endIndex) => _dispatch(deleteOption(reorderOptions(_startIndex, _endIndex)))
  }
}

const SelectedOptions = ({ options, deleteOption, reorderOptions }) => {
  const onBeforeCapture = useCallback(() => {}, [])
  const onBeforeDragStart = useCallback(() => {}, [])
  const onDragStart = useCallback(() => {}, [])
  const onDragUpdate = useCallback(() => {}, [])

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      reorderOptions(source.index, destination.index)
    },
    [reorderOptions]
  )

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map((_option, index) => (
              <Draggable
                key={`${_option.method}${_option.name}`}
                draggableId={`${_option.method}${_option.name}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={index > 0 ? 'mt-3' : null}
                    /*style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}*/
                  >
                    <SelectedOptionCard option={_option} onDelete={() => deleteOption(index)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

SelectedOptions.propTypes = {
  options: PropTypes.array,
  deleteOption: PropTypes.func,
  reorderOptions: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
