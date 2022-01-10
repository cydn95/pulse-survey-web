// import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import React, {useState} from 'react'
import styles from './index.scss'
import Input from 'Components/Input'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import CreditCardInput from 'react-credit-card-input';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CheckoutForm = ({setMethod}) => {
  const [cardNumber, setCardNumber] = useState('')
  const [cvc, setCVC] = useState('')
  const [expiry, setExpiery] = useState('')
  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event) => {
  //   // We don't want to let default form submission happen here,
  //   // which would refresh the page.
  //   event.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js has not yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   const result = await stripe.confirmPayment({
  //     //`Elements` instance that was used to create the Payment Element
  //     elements,
  //     confirmParams: {
  //       return_url: "https://my-site.com/order/123/complete",
  //     },
  //   });

  //   if (result.error) {
  //     // Show error to your customer (for example, payment details incomplete)
  //     console.log(result.error.message);
  //   } else {
  //     // Your customer will be redirected to your `return_url`. For some payment
  //     // methods like iDEAL, your customer will be redirected to an intermediate
  //     // site first to authorize the payment, then redirected to the `return_url`.
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    //   <PaymentElement />
    //   <button disabled={!stripe}>Submit</button>
    // </form>
    <div className={styles.wrapper} onClick={() => setMethod(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.header} ${styles.primary}`}>
          <h2>Payment Information</h2>
          <FontAwesomeIcon icon={faTimes} size="lg" color="#838E94" onClick={() => setMethod(false)} />
        </div>
        <div className={styles.content}>
          <div className={styles.inputWrapper}>
            <CreditCardInput
              cardNumberInputProps={{ value: cardNumber, onChange: (e) => setCardNumber(e.target.value) }}
              cardExpiryInputProps={{ value: expiry, onChange: (e) => setExpiery(e.target.value) }}
              cardCVCInputProps={{ value: cvc, onChange: (e) => setCVC(e.target.value) }}
              fieldClassName={styles.infoWrapper}
              customTextLabels={{
                cardNumberPlaceholder: '1234 1234 1234 1234',
                expiryPlaceholder: 'MM/YY',
                cvcPlaceholder: 'CVC',
              }}
            />
          </div>
          {/* <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>Card number (required)</span>
            <Input value={(cardNumber.match(/.{1,4}/g) || []).join(' ')} onChange={(value) => setCardNumber(value.split(' ').join(''))} />
          </div> */}
          {/* <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>Expiration date (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>CVC (required)</span>
            <Input />
          </div> */}
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>Cardholder name (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>Street (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>City (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>ZIP/Postal code (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>State / Province (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.primary} ${styles.description}`}>Country (required)</span>
            <Input />
          </div>
          <div className={styles.inputWrapper}>
            <span className={`${styles.info} ${styles.description}`}>Once you add payment information, you'll be charged for all your open invoices</span>
          </div>
          <div className={styles.inputWrapper}>
            <input type="checkbox" id="agree" />
            <p className={`${styles.primary} ${styles.description}`}>
              <label htmlFor="agree">I have read and agree to the <a href="https://projectai.com/privacy-policy/" target="_blank" style={{color: 'rgb(43,123,156)'}}>Terms of Use</a></label><br />
              <span className={`${styles.secondary} ${styles.smDescription}`}>There are no refunds. Your subscription will renew automatically, and you will be charged in advance. You may cancel at any time. he cancellation goes into effect at the start of your following billing cycle.</span>
            </p>
          </div>
        </div>
        <div className={styles.actions}>
          <span onClick={() => setMethod(false)} className={styles.cancelBtn}>Cancel</span>
          <span className={styles.okBtn}>Save</span>
        </div>
      </div>
    </div>
  )
};

export default CheckoutForm