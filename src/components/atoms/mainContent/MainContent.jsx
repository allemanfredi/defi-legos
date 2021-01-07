import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin-top: 40px;
  @media (max-width: 767.98px) {
    height: 100%;
    margin-bottom: 100px;
  }
`

const MainContent = ({ children }) => <Content>{children}</Content>

export default MainContent
