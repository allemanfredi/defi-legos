import React, { useCallback, useState } from 'react'
import Banner from '../../atoms/banner'
import Icon from '../../atoms/icon'
import styled from 'styled-components'

const BannerText = styled.span``

const BannerTextContainer = styled.div`
  margin-left: 5px;
`

const BannerContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledIcon = styled(Icon)`
  width: 34px;
`

const BetaBanner = _props => {
  const [showBanner, setShowBanner] = useState(true)
  const onCloseBanner = useCallback(() => {
    setShowBanner(!showBanner)
  }, [showBanner])

  return (
    <Banner visible={showBanner} onClose={onCloseBanner}>
      <BannerContentContainer>
        <StyledIcon icon="caution" />
        <BannerTextContainer>
          <BannerText>The project is still in the beta phase. Use it with caution!</BannerText>
        </BannerTextContainer>
      </BannerContentContainer>
    </Banner>
  )
}

export default BetaBanner
