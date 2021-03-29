import React from 'react'
import LoadingOverlay from 'react-loading-overlay'
import styled from 'styled-components'

const StyledLoadingOverlay = styled(LoadingOverlay)`
  position: initial !important;
`

const Loader = ({ loading: { isLoading, text } }) => {
  return <StyledLoadingOverlay active={isLoading} spinner text={text} />
}

export default Loader
