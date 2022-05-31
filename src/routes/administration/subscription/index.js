import React, { useState } from 'react'
import { faDownload, faStar, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'Components/Button'
import Input from 'Components/Input'
import Select from 'Components/Select'
import MasterCard from 'Assets/img/admin/Mastercard.svg'
import Chair from 'Assets/img/admin/Chair.svg'
import BestValue from 'Assets/img/admin/best_value_tag.png'
import InvoiceAvatar from 'Assets/img/admin/File-invoice.svg'
import { Wrapper, Card, InvoiceTable, Invoice, ValueTable, Item, PlanCard } from './subscription.styles';

const items = [
  {
    text: 'Consecteur cursus',
    free: true,
    enterprise: true,
  },
  {
    text: 'Nibh curabitur sed eu auctor dolor diam ',
    free: false,
    enterprise: true,
  },
  {
    text: 'Pretium sociis lacus ',
    free: false,
    enterprise: true,
  },
  {
    text: 'Vulputate ultricies etiam tempor id nunc ',
    free: false,
    enterprise: true,
  },
  {
    text: 'Sed facilisis tellus a senectus ',
    free: false,
    enterprise: true,
  },
  {
    text: 'Feugiat porttitor sapien eget proin sed lorem ',
    free: false,
    enterprise: true,
  },
  {
    text: 'Pretium sociis lacus',
    free: false,
    enterprise: true,
  },
  {
    text: 'Thousands of free resources',
    free: false,
    enterprise: true,
  },
  {
    text: 'Pretium sociis lacus ',
    free: false,
    enterprise: true,
  },
]

const plans = [
  {
    bestValue: true,
    period: 12,
    price: 7.49,
    total: 89.99,
    tax: true,
  },
  {
    period: 1,
    price: 9.99,
    total: 9.99,
    tax: true,
    subscribed: true,
  }
]

const pages = [
  {
    header: 'Subscription',
    breadCrumb: '',
  },
  {
    header: 'Change plan',
    breadCrumb: 'Subscription > Change plan',
  },
  {
    header: 'Invoicing details',
    breadCrumb: 'Subscription > Invoicing details',
  }
]

const Subscription = ({currentProject}) => {
  const [page, setPage] = useState(0)
  return (
    <Wrapper>
      <div className="headerPart">
        <h2>{pages[page].header}</h2>
        <span className="breadCrumb">{pages[page].breadCrumb}</span>
      </div>
      {page === 0 && <div className="cards">
        <Card>
          <span className="title">Current Plan</span>
          <div className="basic">
            <span className="star"><FontAwesomeIcon icon={faStar} color="white" /></span>
            <span className="bgDescription">Enterprise</span>
            {/* <span className="smDescription">$9.99/month billed monthly</span> */}
          </div>
          <span className="description">Your subscription willl auto-renew on August 21,2022</span>
          <div className="btn_group">
            <span>Cancel subscription</span>
            <Button onClick={() => setPage(1)}>Change plan</Button>
          </div>
        </Card>
        <Card>
          <span className="title">Payment method</span>
          <div className="basic">
            <span className="mastercard"><img src={MasterCard} alt="mastercard" /></span>
            <span className="bgDescription">Mastercard</span>
            <span className="smDescription">***4578</span>
          </div>
          <span className="description">This is the card currently registered with us</span>
          <div className="btn_group">
            <Button>Edit</Button>
          </div>
        </Card>
        <Card>
          <span className="title">Plan summary</span>
          <div className="basic">
            <span className="chair"><img src={Chair} alt="chair" /></span>
            <span className="bgDescription">$14.99</span>
            <span className="smDescription">per seat/month</span>
          </div>
          <span className="description">10/10 seats used</span>
          <div className="btn_group">
            <Button>Remove/Add</Button>
          </div>
        </Card>
      </div>}
      {page === 0 && <div className="invoices">
        <span className="title">Invoices</span>
        <InvoiceTable>
          <div className="tags">
            <span className="tag col_1">PLAN NAME</span>
            <span className="tag col_2">DATE</span>
            <span className="tag col_3">AMOUNT</span>
            <span className="tag col_4">STATUS</span>
            <div className="tag col_5"></div>
          </div>
          <Invoice>
            <span className="col_1">Enterprise</span>
            <span className="col_2">01-Jan-2021</span>
            <span className="col_3">$568.00</span>
            <span className="col_4">Paid</span>
            <FontAwesomeIcon icon={faDownload} className="icon" />
          </Invoice>
        </InvoiceTable>
        <Button onClick={() => setPage(2)}>Invoice Details</Button>
      </div>}
      {page === 1 && <div className="changePlan">
        <ValueTable>
          <div className="tags">
            <div className="col_1"></div>
            <span className="col_2">Free</span>
            <span className="col_3">Enterprise</span>
          </div>
          <div className="items">
            {items.map((item, idx) =>
              <Item key={`${idx}-${item.text}`}>
                <span className={`col_1 ${item.free ? 'free' : ''}`}>{item.text}</span>
                <span className="col_2">
                  {item.free ? <FontAwesomeIcon icon={faCheck} color="#59daa8" className="icon" /> : <FontAwesomeIcon icon={faTimes} color="#f06260" className="icon" />}
                </span>
                <span className="col_3">
                  <FontAwesomeIcon icon={faCheck} color="#59daa8" className="icon" />
                </span>
              </Item>
            )}
          </div>
        </ValueTable>
        <div className="plans">
          {plans.map((plan, idx) =>
            <PlanCard key={`${idx}-plan`}>
              {plan.bestValue && <div className="bestTag">
                <span className="text">Best Value</span>
                <img src={BestValue} alt="plan" />
              </div>}
              <span className="period">{`${plan.period} MONTH${plan.period === 1 ? '' : 'S'}`}</span>
              <div className="basicdata">
                <div className="data">
                  <span className="price description"><b>${plan.price}*</b>/month</span>
                  <span className="description"><b>${plan.total}</b>{` every 12 months`}</span>
                  {plan.tax && <span className="description">{`* VAT & local taxes may apply`}</span>}
                </div>
                <div className="btns">
                  <Button disabled={plan.subscribed}>{`${plan.subscribed ? 'Subscribed' : 'Subscribe now'}`}</Button>
                  {plan.subscribed && <span className="cancel">Cancel subscription</span>}
                </div>
              </div>
            </PlanCard>
          )}
        </div>
      </div>}
      {page === 2 && <div className="invoiceDetails">
        <div className="header">
          <span className="image"><img src={InvoiceAvatar} alt="file" /></span>
          <span className="tag">Invoice informations</span>
        </div>
        <div className="inputs">
          <div className="value">
            <label>Company Name</label>
            <Input className="input" />
          </div>
          <div className="value">
            <label>Send emails to</label>
            <Input className="input" />
          </div>
          <div className="value">
            <label>Country</label>
            <Select className="select" />
          </div>
          <div className="value">
            <label>City</label>
            <Select className="select" />
          </div>
          <div className="value">
            <label>State</label>
            <Select className="select" />
          </div>
          <div className="value">
            <label>Address</label>
            <Input className="input" />
          </div>
          <div className="value">
            <label>Zip</label>
            <Input className="input" />
          </div>
          <div className="value"></div>
        </div>
        <Button>Save</Button>
      </div>}
    </Wrapper>
  )
}

const mapStateToProps = ({ admin }) => {
  const { currentProject } = admin
  return {
    currentProject,
  }
}

export default connect(mapStateToProps, null)(Subscription)