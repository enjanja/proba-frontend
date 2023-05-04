import styled from 'styled-components'
import { colors } from '../../global.styles'

export const BackDrop = styled.div`
  position: absolute;
  z-index: 99;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ModalContainer = styled.div`
  position: absolute;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-weight: bold;
  font-size: 1.3rem;
  border-bottom: 1px solid ${colors.black};
`
