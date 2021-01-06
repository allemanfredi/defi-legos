import React, { useCallback } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'react-bootstrap'

const mapStateToProps = _state => {
  return {
    smartAccounts: _state.wallet.smartAccounts,
    isConnected: _state.wallet.isConnected
  }
}

const mapDispatchToProps = _dispatch => {
  return {}
}

const SmartAccountsCard = ({ smartAccounts, isConnected }) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12} md={6}>
            Your Selected Smart Account
          </Col>
          <Col xs={12} md={6} className="font-weight-bold text-right">
            {smartAccounts.length > 0 ? smartAccounts[0].address : '-'}
          </Col>
        </Row>
        {smartAccounts.length === 0 && isConnected ? (
          <Row className="mt-3">
            <Col xs={12} className="font-weight-bold text-center">
              It seems that you did not create a Smart account. Click{' '}
              <a href="https://defi.instadapp.io/" target="_blank" rel="noopener noreferrer">
                {' '}
                here
              </a>{' '}
              to create one
            </Col>
          </Row>
        ) : null}
      </Card.Body>
    </Card>
  )
}

SmartAccountsCard.propTypes = {
  smartAccounts: PropTypes.array,
  isConnected: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAccountsCard)
