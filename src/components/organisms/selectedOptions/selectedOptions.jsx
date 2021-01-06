import React, { useCallback } from 'react'
import styled from 'styled-components'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }))

const selectedOptions = _props => {
  const onBeforeCapture = useCallback(() => {
    console.log('onBeforeCapture')
  }, [])
  const onBeforeDragStart = useCallback(() => {
    console.log('onBeforeDragStart')
  }, [])
  const onDragStart = useCallback(() => {
    console.log('onDragStart')
  }, [])
  const onDragUpdate = useCallback(() => {
    console.log('onDragUpdate')
  }, [])
  const onDragEnd = useCallback(() => {
    console.log('onDragEnd')
  }, [])

  const items = getItems(10)

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
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    /*style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}*/
                  >
                    {item.content}
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

export default selectedOptions
