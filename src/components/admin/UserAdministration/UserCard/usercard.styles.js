import styled from 'styled-components'

export const Tag = styled.span`
  padding: 3px 6px 1px;
  border-radius: 4px;
  background-color: ${(props) => props.isActive ? 'rgba(242, 182, 29, 0.19)' : '#d0e7f8'};
  font-family: Poppins;
  font-size: 11px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.82;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.isActive ? '#d08a02' : '#1289da'};
`

export const Wrapper = styled.div`
  border: 1px solid #dfe0eb;
  background: #fff;
  border-radius: 8px;
  .tag {
    font-family: Montserrat;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: left;
    color: #6d6f94;
  }
  .bgTag {
    font-family: Montserrat;
    font-size: 13px;
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
  div {
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
    &.right-part {
      display: flex;
      gap: 15px;
      div {
        display: flex;
        align-items:center;
      }
    }
  }
`

export const BasicContent = styled.div`
  display: flex;
  align-items: center;
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
        font-size: 13px;
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
    }
  }
`

export const RoleDescription = styled.div`
  width: 700px;
`

export const Arrow = styled.div`
  transform: rotate(${(props) => props.isActive ? 90 : -90}deg);
`