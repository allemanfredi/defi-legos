import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card as BootstrapCard, Row, Col } from 'react-bootstrap'
import { Card } from '../../atoms/card'
import { useAddress } from '../../../hooks/use-address'

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
  const { address } = useAddress(smartAccounts[0] ? smartAccounts[0].address : null)
  return (
    <Card>
      <BootstrapCard.Body>
        <Row>
          <Col xs={12} className="text-center">
            Your Selected Smart Account
          </Col>
          <Col xs={12} className="font-weight-bold text-center">
            {address}
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
      </BootstrapCard.Body>
    </Card>
  )
}

SmartAccountsCard.propTypes = {
  smartAccounts: PropTypes.array,
  isConnected: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAccountsCard)
