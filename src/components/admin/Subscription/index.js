import React, { useState } from 'react'
import {connect} from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import {
  Elements
} from '@stripe/react-stripe-js'
import { faDownload, faStar, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from 'Components/Button'
import Input from 'Components/Input'
import Select from 'Components/Select'
import MasterCard from 'Assets/img/admin/Mastercard.svg'
import Chair from 'Assets/img/admin/Chair.svg'
import BestValue from 'Assets/img/admin/best_value_tag.png'
import MoreSeats from './MoreSeats'
import RemoveSeats from './RemoveSeats'
import InvoiceAvatar from 'Assets/img/admin/File-invoice.svg'
import TrialAvatar from 'Assets/img/admin/trial-icon.jpg'
import { Wrapper, Card, InvoiceTable, Invoice, ValueTable, Item, PlanCard } from './subscription.styles';
import CheckoutForm from './CheckoutForm'

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
    id: 0,
    bestValue: true,
    period: 12,
    price: 7.49,
    total: 89.99,
    tax: true,
  },
  {
    id: 1,
    period: 1,
    price: 9.99,
    total: 9.99,
    tax: true,
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

const stripePromise = loadStripe('pk_test_51K90BlAr7uUHD9JyhYkCJooOVpsWRpAKbMmDlas41DaBtZ2cEsgZp8MnItJ4AHWthz1V2sMwgcOejEEi4xX5kRRU00JcAtgN5O');

const Subscription = ({usedSeats, totalSeats, purchasePrice}) => {
  const [page, setPage] = useState(0)
  const [plan, setPlan] = useState(1)
  const [payment, setPayment] = useState(null)
  const [seats, setSeats] = useState(100)
  const [moreSeats, setMoreSeats] = useState(false)
  const [removeSeats, setRemoveSeats] = useState(false)
  const [method, setMethod] = useState(false)

  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_secret_51K90BlAr7uUHD9JyFIqIqTz7srDqdYE2bTkT81RR9xh6Pt9bivqEt6vLHQuOM2ZZ329TDbSTZ8Lc6yRF5UZG6wUf00CqLwO0Ts',
  };

  return (
    <Wrapper>
      {page === 0 && <div className="cards">
        <Card>
          <span className="title">Current Plan</span>
          <div className="basic">
            {plan < 0 ?<img src={TrialAvatar} alt="trial" width={25} height={25} />:<span className="star"><FontAwesomeIcon icon={faStar} color="white" /></span>}
            <span className="bgDescription">{plan < 0 ? "Free" : "Enterprise"}</span>
            {/* {plan >= 0 && <span className="smDescription">${plans.filter(p => p.id === plan)[0].price}/month billed {plan===0 ? "yearly" : "monthly"}</span>} */}
          </div>
          <span className="description">{plan < 0 ? "Please subscribe enterprise plan for professional use" : "Your subscription willl auto-renew on August 21,2022"}</span>
          <div className="btn_group">
            {plan >= 0 && <span onClick={() => setPlan(-1)} style={{cursor: 'pointer'}}>Cancel subscription</span>}
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
            <Button onClick={() => setMethod(true)}>Edit</Button>
          </div>
        </Card>
        <Card>
          <span className="title">Plan summary</span>
          <div className="basic">
            <span className="chair"><img src={Chair} alt="chair" /></span>
            <span className="bgDescription">${purchasePrice || "14.99"}</span>
            <span className="smDescription">per seat/month</span>
          </div>
          <span className="description">{usedSeats || '0'} / {totalSeats || '0'} seats used</span>
          <div className="btn_group">
            <Button onClick={() => setMoreSeats(true)}>Add</Button>
            <Button disabled={totalSeats===usedSeats} onClick={() => setRemoveSeats(true)}>Remove</Button>
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
          {plans.map((p, idx) =>
            <PlanCard key={`${idx}-plan`}>
              {p.bestValue && <div className="bestTag">
                <span className="text">Best Value</span>
                <img src={BestValue} alt="plan" />
              </div>}
              <span className="period">{`${p.period} MONTH${p.period === 1 ? '' : 'S'}`}</span>
              <div className="basicdata">
                <div className="data">
                  <span className="price description"><b>${p.price}*</b>/month</span>
                  <span className="description"><b>${p.total}</b>{` every 12 months`}</span>
                  {p.tax && <span className="description">{`* VAT & local taxes may apply`}</span>}
                </div>
                <div className="btns">
                  <Button disabled={p.id === plan} onClick={() => {
                    setPlan(p.id)
                    setPage(0)
                  }}>{`${p.id === plan ? 'Subscribed' : 'Subscribe now'}`}</Button>
                  {p.id === plan && <span className="cancel" onClick={() => {
                    setPlan(-1)
                    setPage(0)
                  }}>Cancel subscription</span>}
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
      {moreSeats && <MoreSeats setMoreSeats={setMoreSeats} seats={seats} setSeats={setSeats} />}
      {removeSeats && <RemoveSeats setRemoveSeats={setRemoveSeats} seats={seats} setSeats={setSeats} />}
      {method && <CheckoutForm setMethod={setMethod} />}
    </Wrapper>
  )
}

const mapStateToProps = ({admin}) => {
  return {
    totalSeats: (admin.currentProject || {}).seatsPurchased,
    purchasePrice: (admin.currentProject || {}).purchasePrice,
    usedSeats: (admin.currentProject || {}).totalIdentified,
  }
}

export default connect(mapStateToProps, null)(Subscription)