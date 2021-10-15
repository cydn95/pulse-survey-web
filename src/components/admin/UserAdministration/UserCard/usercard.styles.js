import styled from 'styled-components'

export const Tag = styled.span`
  padding: 3px 6px 1px;
  border-radius: 4px;
  background-color: ${(props) => props.isActive ? 'rgba(242, 182, 29, 0.19)' : '#d0e7f8'};
  font-family: Poppins;
  font-size: 11px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: normal;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.isActive ? '#d08a02' : '#1289da'};
  @media (max-width: 768px) {
    background-color: rgba(242, 182, 29, 0.19);
    color: #d08a02;
  }
`

export const Wrapper = styled.div`
  border: 1px solid #dfe0eb;
  background: #fff;
  border-radius: 8px;
  .tag {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #6d6f94;
  }
  .bgTag {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
`

export const Basic = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
  border-bottom: 1px solid #dfe0eb;
  flex-wrap: wrap;
  gap: 10px;
  .left-part {
    .header {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      ${Tag} {
        display: none;
      }
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
    }
  }
  .right-part {
    display: flex;
    gap: 15px;
    flex-shrink: 0;
    div {
      display: flex;
      align-items:center;
    }
  }
  @media (max-width: 768px) {
    padding: 18px;
    .left-part {
      .header {
        ${Tag} {
          display: block;
        }
      }
    }
    .right-part {
      display: none;
    }
  }
`

export const BasicContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 15px;
  & > div {
    display: flex;
    align-items: center;
    .input {
      padding: 4px 10px 2px;
      border-radius: 5px;
      background-color: #eff0f6;
      input {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.38;
        letter-spacing: normal;
        text-align: left;
        color: #6d6f94;
      }
    }
  }
  @media (max-width: 768px) {
    & > div {
      &:nth-child(n+4) {
        flex-wrap: wrap;
        width: 100%;
        .input {
          margin-top: 8px;
          width: 100%;
        }
      }
    }
  }
`

export const Detailed = styled.div`
  display: flex;
  border-bottom: 1px solid #dfe0eb;
  padding: 15px 35px 6px 35px;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    display: none;
  }
`

export const EditPart = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 18px 35px 23px 35px;
  align-items: flex-end;
  gap: 20px;
  div {
    input {
      background: #eff0f6;
      padding: 10px 16px;
      border-radius: 8px;
      font-family: Poppins;
      font-size: 12px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #6d6f94;
    }
    &.selectGroup {
      display: flex;
      gap: 10px;
      .e-tooltip {
        display: flex;
        align-items:center
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`

export const RoleDescription = styled.div`
  width: 700px;
`

export const Arrow = styled.div`
  transform: rotate(${(props) => props.isActive ? 90 : -90}deg);
  cursor: pointer;
`

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0,0,0, 0.3);
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const DetailModal = styled.div`
  width: 80%;
  background: white;
  padding: 12.5px 20px;
  border-radius: 20px;
  .detailed {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    border-bottom: 1px solid rgb(233, 233, 233);
    padding-bottom: 12px;
    div {
      display: flex;
      flex-direction: column;
    }
  }
  .editPart {
    display: flex;
    flex-direction: column;
    gap: 8px;
    div {
      width: 100%;
      input {
        background: #eff0f6;
        padding: 10px 16px;
        border-radius: 8px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #6d6f94;
      }
    }
    ${RoleDescription} {
      width: 100%;
    }
    .selectGroup {
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        width: unset;
      }
    }
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
    justify-content: center;
  }
  .btn {
    width: 108px;
  }
`