import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

const BannerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: ${({ visible }) => (visible ? 'normal' : 'none')};
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#f5f5f5')};
  color: ${({ color }) => (color ? color : '#6C757D')};
  padding: 35px 35px 35px 35px;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
`

const CloseButton = styled.button`
  font-size: 28px !important;
`

const Banner = _props => {
  const { children, onClose } = _props
  return (
    <BannerContainer {..._props}>
      <Row>
        <Col xs={2} />
        <Col xs={8} className="text-center">
          {children}
        </Col>
        <Col xs={2}>
          <CloseButton type="button" className="close" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </CloseButton>
        </Col>
      </Row>
    </BannerContainer>
  )
}

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Banner
