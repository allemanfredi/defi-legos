import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Container, Nav, NavLink } from 'react-bootstrap'
import Button from '../../atoms/button/'
import styled from 'styled-components'

const ConnectButton = styled(Button)`
  margin-top: 20px;
  height: 50px;
  @media (min-width: 992px) {
    width: 200px;
    margin-top: 0;
  }
`

const DisconnectButton = styled(Button)`
  height: 50px;
  margin-left: 10px;
  @media (min-width: 992px) {
    width: 200px;
    margin-top: 0;
  }
`

const Logo = styled.img`
  height: 30px;
  width: 30px;

  @media (min-width: 767.98px) {
    height: 60px;
    width: 100px;
  }
`

const Header = ({ isConnected, address, onConnectWallet, onDisconnectWallet }) => {
  return (
    <Navbar
      className="sticky-top"
      bg="white"
      expand="lg"
      style={{ height: '70px', zIndex: '2', background: 'white', paddingTop: '30px' }}
      collapseOnSelect
    >
      <Container style={{ maxWidth: '1240px' }}>
        <Navbar.Brand
          style={{
            fontSize: '30px',
            color: '#000',
            cursor: 'pointer'
          }}
        >
          <div className="d-flex">
            <Logo src="../img/png/lego.png" alt="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header" />
        <Navbar.Collapse id="header">
          <Nav className="mr-auto" />
          {isConnected ? (
            <Fragment>
              <DisconnectButton onClick={onDisconnectWallet} text={`Disconnect (${address})`} />
            </Fragment>
          ) : (
            <React.Fragment>
              <div className="d-none d-lg-block">
                <ConnectButton onClick={onConnectWallet} text={'connect'} />
              </div>
              {/* mobile */}
              <div className="d-lg-none">
                <NavLink eventKey="connect">
                  <ConnectButton onClick={onConnectWallet} text={'connect'} />
                </NavLink>
              </div>
            </React.Fragment>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Header.propTypes = {
  selectedPage: PropTypes.string,
  onConnectWallet: PropTypes.func,
  onDisconnectWallet: PropTypes.func,
  isConnected: PropTypes.bool,
  address: PropTypes.string
}

export default Header
