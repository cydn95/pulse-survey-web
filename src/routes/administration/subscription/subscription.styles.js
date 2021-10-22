import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  padding: 26px 44px;
  h2 {
    font-family: Poppins;
    font-size: 25px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.64px;
    text-align: left;
    color: #273645;
  }
  .breadCrumb {
    font-family: Poppins;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #62b5a6;
  }
  .title {
    font-family: Poppins;
    font-size: 15px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #273645;
  }
  .invoices {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  .cards {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 25px;
  }
  .changePlan {
    display: flex;
    gap: 27px;
    flex-wrap: wrap;
    .plans {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 27px;
    }
  }

  @media (max-width: 1260px) {
    .changePlan {
      .plans {
        flex-basis: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 44px 13px;
    h2 {
      font-size: 17px;
    }
    .breadCrumb {
      font-size: 13px;
    }
  }
`

export const Card = styled.div`
  min-width: 320px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 17px;
  flex: 1;
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  .basic {
    display: flex;
    align-items: center;
    gap: 6px;
    .bgDescription {
      font-family: Poppins;
      font-size: 21px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #273645;
    }
    .smDescription {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #8b90a1;
    }
    .star {
      width: 19px;
      height: 19px;
      border-radius: 50px;
      background-color: #6d6f94;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 9.6px;
        height: 9px;
      }
    }
    .mastercard {
      img {
        width: 24px;
      }
    }
    .chair {
      width: 24px;
      height: 24px;
      border-radius: 50px;
      background-color: #6d6f94;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .description {
    font-family: Poppins;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #6d6f94;
  }
  .btn_group {
    display: flex;
    gap: 18px;
    justify-content: flex-end;
    align-items: center;
    span {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #000;
    }
  }
  @media (max-width: 768px) {
    min-width: unset;
    .basic {
      paddign: 20px 18px;
      .bgDescripiton {
        font-size: 20px;
      }
      .smDescription {
        font-size: 12px;
      }
    }
    .description {
      font-size: 12px;
    }
  }
`

export const InvoiceTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
  .tags {
    display: flex;
    align-items: center;
    .tag {
      font-family: Poppins;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.84px;
      text-align: left;
      color: #949596;
      &.col_1 {
        margin-right: 27px;
      }
      &.col_5 {
        margin-right: 27px;
      }
    }
  }
  .col_1 {
    flex: 3;
  }
  .col_2 {
    flex: 1;
  }
  .col_3 {
    flex: 1;
  }
  .col_4 {
    flex: 1;
  }
  .col_5 {
    width: 16px;
  }
  @media (max-width: 768px) {
    .col_1 {
    flex: 3;
    }
    .col_2 {
      flex: 3;
    }
    .col_3 {
      flex: 2;
    }
    .col_4 {
      flex: 2;
    }
    .col_5 {
      width: 13.5px;
    }
    .tags {
      .tag {
        font-size: 10px;
        &.col_1 {
          margin-right: 18px;
        }
        &.col_5 {
          margin-right: 18px;
          width: 13.5px;
        }
      }
    }
  }
`

export const Invoice = styled.div`
  display: flex;
  align-items: center;
  padding: 21px 27px;
  background: white;
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  span {
    &:first-child {
      font-size: 15px;
    }
    opacity: 0.7;
    font-family: Poppins;
    font-size: 13px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
  .icon {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding: 27px 18px;
    span {
      font-size: 12px !important;
    }
    .icon {
      width: 13.5px;
    }
  }
`

export const ValueTable = styled.div`
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  background-color: #fff;
  flex: 1;
  .tags {
    display: flex;
    align-items: center;
    padding: 21px 32px;
    border-bottom: solid 1px #dfe0eb;
    span {
      font-family: Poppins;
      font-size: 13px;
      font-weight: 600;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.62;
      letter-spacing: normal;
      text-align: left;
      color: #6d6f94;
    }
  }
  .items {
    padding: 13px 32px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .col_1 {
    flex: 6;
  }
  .col_2 {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .col_3 {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 768px) {
    .tags {
      padding: 12px 15px;
    }
    .items {
      padding: 17px;
    }
    .col_1 {
      flex: 3;
    }
  }
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  span {
    font-family: Poppins;
    font-size: 13px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.62;
    letter-spacing: normal;
    color: #575879;
    &.free {
      color: #6d6f94;
    }
  }
  .icon {
    width: 20.4px;
    height: 20.4px;
  }
  @media (max-width: 768px) {
    span {
      font-size: 12px;
    }
  }
`

export const PlanCard = styled.div`
  position: relative;
  padding: 17px 23px;
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .bestTag {
    position: relative;
    margin-left: -25px;
    .text {
      position: absolute;
      z-index: 20;
      left: 19px;
      top: 4px;
      font-family: Poppins;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #f0f4f6;
    }
  }
  .period {
    margin: 14px 0 4px 0px;
    font-family: Poppins;
    font-size: 15px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }
  .basicdata {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 23px;
    width: 100%;
    .data {
      display: flex;
      flex-direction: column;
      .description {
        font-family: Poppins;
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #8b90a1;
        &.price {
          b {
            font-family: Poppins;
            font-size: 25px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.6;
            letter-spacing: -0.64px;
            text-align: left;
            color: #000;
          }
        }
      }
    }
    .btns {
      display: flex;
      flex-direction: column;
      align-items: center;
      .cancel {
        margin: 11px;
        font-family: Poppins;
        font-size: 13px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: right;
        color: #000;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 18px;
    .bestTag {
      margin-left: -18px;
    }
    .period {
      font-size: 13px;
    }
    .basicdata {
      .description {
        font-size: 12px;
        &.price {
          b {
            font-size: 17px;
          }
        }
      }
      .btns {
        flex-basis: 100%;
        align-items: flex-start;
      }
    }
  }
`
