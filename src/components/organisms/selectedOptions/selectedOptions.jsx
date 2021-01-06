import React, { useCallback } from 'react'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../../atoms/selectedOptionCard'

const mapStateToProps = _state => {
  return {
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const SelectedOptions = ({ options }) => {
  const onBeforeCapture = useCallback(() => {}, [])
  const onBeforeDragStart = useCallback(() => {}, [])
  const onDragStart = useCallback(() => {}, [])
  const onDragUpdate = useCallback(() => {}, [])
  const onDragEnd = useCallback(() => {}, [])

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
                    <SelectedOptionCard option={_option} />
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
  options: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
