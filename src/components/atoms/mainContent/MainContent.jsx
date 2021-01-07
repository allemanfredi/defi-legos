import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  background: #fafafa;
  height: 100vh;
  width: 100vw;
`

const MainContent = ({ children }) => <Content>{children}</Content>

export default MainContent
