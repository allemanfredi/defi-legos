import React, { useCallback, Fragment } from 'react'
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
  border-bottom: 1px solid #ced4da;
  margin-bottom: 20px;
  cursor: pointer;
`

const StrategiesHeader = styled.div`
  width: 410px;
`

const StrategiesContainerBody = styled.div``

const StrategiesBody = styled.div`
  width: 410px;
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
    reorderOptions: (_startIndex, _endIndex, _strategyId, _index) =>
      _dispatch(reorderOptions(_startIndex, _endIndex, _strategyId, _index))
  }
}

const Strategies = ({ strategies, options, deleteOption, reorderOptions, selectStrategy }) => {
  const onDeleteOption = useCallback(
    _option => {
      deleteOption(_option)
    },
    [deleteOption]
  )

  const onDragEnd = useCallback(
    ({ source, destination }, _strategyId, _index) => {
      if (!source || !destination) return
      reorderOptions(source.index, destination.index, _strategyId, _index)
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
              <StrategiesHeader>{name}</StrategiesHeader>
            </StrategiesContainerHeader>
          )
        })}
      </StrategiesContainer>
      <StrategiesContainer>
        {new Array(strategies.length).fill('0').map((_, _index) => (
          <StrategiesContainerBody>
            <StrategiesBody>
              <DragDropContext onDragEnd={_e => onDragEnd(_e, strategies[_index].id, _index)}>
                <Droppable droppableId={`droppable-${strategies[_index].id}`}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {options
                        .filter(_option => _option.strategy.id === strategies[_index].id)
                        .map((_option, index) => (
                          <Draggable key={_option.id} draggableId={`draggable-${_option.id}`} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={index > 0 ? 'mt-1' : null}
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
            </StrategiesBody>
          </StrategiesContainerBody>
        ))}
      </StrategiesContainer>
    </Fragment>
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
