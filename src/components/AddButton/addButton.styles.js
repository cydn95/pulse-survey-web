import styled from 'styled-components'

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background: rgba(0,0,0, 0.3);
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: white;
  width: 450px;
  border-radius: 10px;
  margin: 10px;
`

export const ModalBody = styled.div`
  padding: 20px;
  border-top: 1px solid #cacaca;
  .error {
    color: red;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  h2 {
    font-family: Poppins;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
  span {
    color: #6d6f94;
    font-family: cursive;
    cursor: pointer;
  }
`

export const ModalFooter = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  span {
    display: flex;
    align-items: center;
    width: 108px;
    cursor: pointer;
    justify-content: center;
  }
  .btn {
    width: 108px;
  }
`