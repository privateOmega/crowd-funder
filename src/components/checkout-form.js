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

import loginPageStyles from "../styles/login-page"

const useStyles = makeStyles(loginPageStyles)

const checkoutValidationScheme = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Enter a valid email"),
  amount: Yup.number().required("Enter your password"),
})

function CheckoutForm({ firebase }) {
  const classes = useStyles()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  return (
    <Card variant="outlined">
      {paymentMethod ? (
        <>
          <CardHeader title={<h4>Payment successful</h4>}></CardHeader>
          <CardContent>
            Thanks for trying Stripe Elements. No money was charged, but we
            generated a PaymentMethod: {paymentMethod.id}
          </CardContent>
        </>
      ) : (
        <Formik
          initialValues={{ name: "", email: "", amount: 0 }}
          validationSchema={checkoutValidationScheme}
          onSubmit={async (values, { setSubmitting }) => {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: "card",
              card: elements.getElement(CardElement),
              billing_details: {
                name: values.name,
                email: values.email,
              },
            })

            if (error) {
              setError(error)
            } else {
              firebase
                .database()
                .ref("donations")
                .push({
                  amount: +values.amount,
                  name: values.name,
                  email: values.email,
                })
              setPaymentMethod(paymentMethod)
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
                <CardElement
                  onChange={e => {
                    setError(e.error)
                  }}
                />
                {error && error.message}
              </CardContent>
              <CardActions>
                <Button
                  color="danger"
                  type="submit"
                  disabled={!stripe || isSubmitting}
                  fullWidth
                >
                  Pay
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      )}
    </Card>
  )
}

export default withFirebase(CheckoutForm)
