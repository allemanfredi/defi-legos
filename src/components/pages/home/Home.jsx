import React, { Fragment, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import Strategies from '../../organisms/strategies'
import OptionsList from '../../organisms/optionsList'
import { Row, Col } from 'react-bootstrap'
import SmartAccountsCard from '../../organisms/smartAccountsCard'
import Button from '../../atoms/button'
import BetaBanner from '../../organisms/betaBanner'
import Switch from 'react-switch'
import { useAddress } from '../../../hooks/use-address'

const MainContainer = styled(Container)`
  max-width: 2500px !important;
  padding-top: 20px;
`

const ConnectButton = styled(Button)`
  width: 100%;
  color: white;
  background: #3cd458c2;
  border: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 70px;
  font-size: 20px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #38f78d85;
    &:hover {
      background: #38f78d85;
    }
  }
  &:hover {
    background: #2cb368;
  }
`

const DisconnectButton = styled(Button)`
  width: 100%;
  color: white;
  background: #3cd458c2;
  border: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 70px;
  font-size: 20px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #38f78d85;
    &:hover {
      background: #38f78d85;
    }
  }
  &:hover {
    background: #2cb368;
  }
`

const ExecuteButton = styled(Button)`
  width: 100%;
  color: white;
  background: rgb(255, 102, 102);
  border: 0;
  height: 70px;
  font-size: 20px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #ff666657;
    &:hover {
      background: #ff666657;
    }
  }
  &:hover {
    background: #d64848;
  }
`

const NewStrategyButton = styled(Button)`
  width: 100%;
  color: white;
  background: rgb(255, 205, 86);
  border: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 70px;
  font-size: 20px;
  outline: none !important;
  box-shadow: none;
  &:disabled {
    background: #ffd06673;
    &:hover {
      background: #ffd06673;
    }
  }
  &:hover {
    background: #fdb513;
  }
`

const StrategiesContainer = styled.div`
  width: 100%;
  overflow: auto;
`

const SimulationModeLabel = styled.label``

const Home = ({
  wallet: { account, isConnected, smartAccounts },
  simulatorIsEnabled,
  buildAndExecute,
  connectWallet,
  disconnectWallet,
  createStrategy,
  activateSimulator,
  disableSimulator
}) => {
  const { address } = useAddress(account)
  const handleSimulatorChange = useCallback(() => {
    !simulatorIsEnabled ? activateSimulator() : disableSimulator()
  }, [simulatorIsEnabled, activateSimulator, disableSimulator])

  const smartAccount = useMemo(() => smartAccounts[0], [smartAccounts])

  return (
    <Fragment>
      <MainContainer>
        <Row>
          <Col xs={12} lg={8} xl={10}>
            <StrategiesContainer>
              <Strategies />
            </StrategiesContainer>
          </Col>
          <Col xs={12} lg={4} xl={2}>
            <Row className="font-weight-bold">
              <Col xs={6} className="my-auto">
                <SimulationModeLabel>SIMULATION MODE:</SimulationModeLabel>
              </Col>
              <Col xs={6} className="text-right">
                <Switch
                  disabled={!isConnected}
                  onChange={handleSimulatorChange}
                  checked={simulatorIsEnabled}
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  onColor="#2cb368"
                  height={20}
                  width={48}
                />
              </Col>
            </Row>

            <Row className="mt-2 font-weight-bold">
              <Col xs={12}>
                {isConnected ? (
                  <Fragment>
                    <DisconnectButton onClick={disconnectWallet} text={`Disconnect (${address})`} />
                  </Fragment>
                ) : (
                  <React.Fragment>
                    <ConnectButton onClick={connectWallet} text={'Connect'} />
                  </React.Fragment>
                )}
              </Col>
            </Row>
            <Row className="font-weight-bold">
              <Col xs={12}>
                <ExecuteButton onClick={buildAndExecute} text={'Execute'} disabled={!isConnected || !smartAccount} />
              </Col>
            </Row>
            <Row className="font-weight-bold">
              <Col xs={12}>
                <NewStrategyButton onClick={createStrategy} text={'New strategy'} />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12}>
                <SmartAccountsCard />
              </Col>
            </Row>
            <Row className="font-weight-bold">
              <Col xs={12}>
                <OptionsList />
              </Col>
            </Row>
          </Col>
        </Row>
      </MainContainer>
      <BetaBanner />
    </Fragment>
  )
}

Home.propTypes = {
  wallet: PropTypes.string,
  buildAndExecute: PropTypes.func,
  selectedPage: PropTypes.string,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  isConnected: PropTypes.bool,
  createStrategy: PropTypes.func.isRequired,
  activateSimulator: PropTypes.func.isRequired,
  disableSimulator: PropTypes.func.isRequired
}

export default Home
