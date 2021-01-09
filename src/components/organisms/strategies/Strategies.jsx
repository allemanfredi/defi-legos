import React, { useCallback, useState, useRef, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOptionCard from '../selectedOptionCard'
import { deleteOption, reorderOptions, selectStrategy } from '../../../actions/build-strategy'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const StrategiesContainer = styled.div`
  display: flex;
`
const StrategiesContainerHeader = styled.div`
  width: 400px;
  border-bottom: 1px solid #ced4da;
  margin-bottom: 20px;
  padding: 10px;
`

const StrategiesContainerBody = styled.div`
  padding: 5px;
`

const mapStateToProps = _state => {
  return {
    strategies: _state.buildStrategy.strategies,
    options: _state.buildStrategy.options
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    selectStrategy: _strategy => _dispatch(selectStrategy(_strategy)),
    deleteOption: _id => _dispatch(deleteOption(_id)),
    reorderOptions: (_startIndex, _endIndex) => _dispatch(deleteOption(reorderOptions(_startIndex, _endIndex)))
  }
}

const Strategies = ({ strategies, options, deleteOption, reorderOptions, selectStrategy }) => {
  const [positions, setPositions] = useState({})

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

  const onDeleteOption = useCallback(
    _option => {
      /*const newOptions = options
      delete newOptions[_option.id]
      setPositions({
        ...newOptions
      })*/
      deleteOption(_option)
    },
    [deleteOption]
  )

  const onDragEnd = useCallback(
    ({ source, destination }) => {
      if (!source || !destination) return
      reorderOptions(source.index, destination.index)
    },
    [reorderOptions]
  )
  return (
    <Fragment>
      <StrategiesContainer>
        {strategies.map((_strategy, _index) => {
          const { id, name } = _strategy
          return (
            <StrategiesContainerHeader onClick={() => selectStrategy(_strategy)} key={id}>
              {name}
            </StrategiesContainerHeader>
          )
        })}
      </StrategiesContainer>
      <StrategiesContainer>
        {new Array(strategies.length).fill('0').map((_, _index) => (
          <StrategiesContainerBody>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={`droppable-${strategies[_index].id}`}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {options
                      .filter(_option => _option.strategy.id === strategies[_index].id)
                      .map((_option, index) => (
                        <Draggable key={_option.id} draggableId={`draggable-${strategies[_index].id}`} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={index > 0 ? 'mt-3' : null}
                            >
                              <SelectedOptionCard option={_option} onDelete={() => onDeleteOption(_option)} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </StrategiesContainerBody>
        ))}
      </StrategiesContainer>
    </Fragment>

    /*options.map((_strategy, _index) => {
        return (
          <div key={id}>
            <StrategiesContainerBody>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={`droppable-${id}`}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {options
                        .filter(_option => _option.strategyId === id)
                        .map((_option, index) => (
                          <Draggable key={_option.id} draggableId={`draggable-${id}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={index > 0 ? 'mt-3' : null}
                              >
                                <SelectedOptionCard option={_option} onDelete={() => onDeleteOption(_option)} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </StrategiesContainerBody>
          </div>
        )
      })*/
  )
}

Strategies.propTypes = {
  strategies: PropTypes.array,
  options: PropTypes.array,
  deleteOption: PropTypes.func.isRequired,
  reorderOptions: PropTypes.func,
  selectStrategy: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Strategies)
