import React, { useCallback, useState } from 'react'
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
    deleteOption: _id => _dispatch(deleteOption(_id)),
    reorderOptions: (_startIndex, _endIndex) => _dispatch(deleteOption(reorderOptions(_startIndex, _endIndex)))
  }
}

const SelectedOptions = ({ options, deleteOption, reorderOptions }) => {
  const [optionInputs, setOptionInputs] = useState({})

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (!source || !destination) return
      reorderOptions(source.index, destination.index)
    },
    [reorderOptions]
  )

  const onChangeInputs = useCallback(
    (_inputs, _option) => {
      console.log(_inputs, _option)
    },
    [reorderOptions]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                      )}*/
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
    </DragDropContext>
  )
}

SelectedOptions.propTypes = {
  options: PropTypes.array,
  deleteOption: PropTypes.func,
  reorderOptions: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedOptions)
