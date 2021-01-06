import React from 'react'
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
`

const Logo = styled.img`
  height: 30px;
  width: 180px;

  @media (min-width: 767.98px) {
    height: 40px;
    width: 240px;
  }
`

const AccountInfo = styled.div`
  margin-top: 20px;
  display: flex;
  @media (min-width: 992px) {
    margin-top: 0;
  }
`

const Header = ({ isConnected, address, onConnectWallet, onDisconnectWallet }) => {
  return (
    <Navbar
      className="sticky-top"
      bg="white"
      expand="lg"
      style={{ height: '70px', zIndex: '2', background: 'white' }}
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
            <Logo src="" alt="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="header" />
        <Navbar.Collapse id="header">
          <Nav className="mr-auto" />
          {isConnected ? (
            <AccountInfo>
              {address}
              <DisconnectButton onClick={onDisconnectWallet} text="Disconnect" />
            </AccountInfo>
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
