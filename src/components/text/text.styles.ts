import styled from 'styled-components'
import { colors } from '../../global.styles'
import { Link as ReactRouterLink } from 'react-router-dom'

export const Error = styled.p`
  margin: 10px 0 0 10px;
  font-size: 15px;
  color: ${colors.danger};
`

export const H2 = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  color: ${colors.primary};
`

export const PlainText = styled.p`
  font-size: 15px;
  margin: 0;
`

export const AcentText = styled.p`
  font-size: 13px;
  margin: 0;
  color: ${colors.shadow};
`

export const Link = styled(ReactRouterLink)`
  text-decoration: none;

  &:visited {
    color: ${colors.secondary};
  }
`
