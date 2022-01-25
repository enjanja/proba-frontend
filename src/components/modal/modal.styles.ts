import styled from 'styled-components'

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
`
