import React, { useState } from "react"
import { Formik } from "formik"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import {
  makeStyles,
  Card,
  CardContent,
  CardActions,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  CardHeader,
  FormHelperText,
} from "@material-ui/core"
import { Person, Email, Money } from "@material-ui/icons"
import * as Yup from "yup"

import Button from "../components/button"
import { withFirebase } from "../services/firebase"
import { formatAmountForDisplay, formatAmountForStripe } from "../utils/payment"
import * as config from "../config"

import checkoutFormStyles from "../styles/checkout-form"
import checkoutFormCardStyles from "../styles/checkout-form-card"

const useStyles = makeStyles(checkoutFormStyles)

const stripeFirebaseFunctionURL = process.env.GATSBY_STRIPE_FIREBASE_FUNCTION

const checkoutValidationScheme = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Enter a valid email"),
  amount: Yup.number().required("Enter your password"),
})

function CheckoutForm({ firebase }) {
  const classes = useStyles()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState("")
  const [payment, setPayment] = useState({ status: "initial" })

  function PaymentStatus({ status }) {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h5>Processing</h5>

      case "requires_action":
        return <h5>Authenticating</h5>

      case "succeeded":
        return <h5>Payment Succeeded</h5>

      case "error":
        return (
          <>
            <h5>Error</h5>
            <p>{error}</p>
          </>
        )

      default:
        return null
    }
  }

  return (
    <Card variant="outlined">
      <Formik
        initialValues={{ name: "", email: "", amount: 0 }}
        validationSchema={checkoutValidationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          let response = await fetch(stripeFirebaseFunctionURL, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                amount: formatAmountForStripe(values.amount, config.currency),
              } || {}
            ),
          })
          response = await response.json()

          console.log(response)

          setPayment(response)

          if (response.statusCode === 500) {
            setPayment({ status: "error" })
            setError(response.message)
            setSubmitting(false)
            return
          }

          const { error, paymentIntent } = await stripe.confirmCardPayment(
            response.client_secret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: values.name,
                  email: values.email,
                },
              },
            }
          )

          if (error) {
            setPayment({ status: "error" })
            setError(error.message ?? "An unknown error occured")
          } else if (paymentIntent) {
            setPayment(paymentIntent)
            firebase
              .database()
              .ref("donations")
              .push({
                amount: +values.amount,
                name: values.name,
                email: values.email,
              })
          }
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <CardHeader title={<h4>Payment Form</h4>}></CardHeader>
            <CardContent>
              <h5>Billing Information</h5>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  id="name"
                  onChange={handleChange}
                  value={values.password}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  id="name-helper-text"
                  error={touched.name && Boolean(errors.name)}
                >
                  {touched.name ? errors.name : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  startAdornment={
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  id="email-helper-text"
                  error={touched.email && Boolean(errors.email)}
                >
                  {touched.email ? errors.email : ""}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <Input
                  id="amount"
                  onChange={handleChange}
                  value={values.amount}
                  startAdornment={
                    <InputAdornment position="start">
                      <Money />
                    </InputAdornment>
                  }
                />
                <FormHelperText
                  id="amount-helper-text"
                  error={touched.amount && Boolean(errors.amount)}
                >
                  {touched.amount ? errors.amount : ""}
                </FormHelperText>
              </FormControl>
              <h5>Payment Information</h5>
              <CardElement
                options={{
                  style: checkoutFormCardStyles,
                }}
                onChange={e => {
                  if (e.error) {
                    setPayment({ status: "error" })
                    setError(e.error.message ?? "An unknown error occured")
                  }
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                color="danger"
                type="submit"
                disabled={!stripe || isSubmitting}
                fullWidth
              >
                Donate {formatAmountForDisplay(values.amount, config.currency)}
              </Button>
              <br />
              <PaymentStatus status={payment.status} />
            </CardActions>
          </form>
        )}
      </Formik>
    </Card>
  )
}

export default withFirebase(CheckoutForm)
