import React, { useState } from "react"
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
  IconButton,
} from "@material-ui/core"
import { Person, Lock, Visibility, VisibilityOff } from "@material-ui/icons"
import { Formik } from "formik"
import { navigate } from "gatsby"

import SEO from "../components/seo"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"
import loginValidationScheme from "../components/login-validation-scheme"
import { withFirebase } from "../services/firebase"
import { setUser, isLoggedIn } from "../services/auth"

import loginPageStyles from "../styles/login-page"

const useStyles = makeStyles(loginPageStyles)

function LoginPage({ firebase }) {
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)

  if (isLoggedIn()) {
    navigate(`/app/dashboard`)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${require("../images/background.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <SEO title="Login page" />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={10} sm={10} md={4}>
            <Card variant="outlined">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginValidationScheme}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    const {
                      user,
                    } = await firebase
                      .auth()
                      .signInWithEmailAndPassword(values.email, values.password)
                    setUser(user)
                    navigate(`/app/dashboard`)
                  } catch (error) {
                    console.log(error)
                  } finally {
                    setSubmitting(false)
                  }
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
                    <CardHeader title={<h4>Login</h4>}></CardHeader>
                    <CardContent>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          startAdornment={
                            <InputAdornment position="start">
                              <Person />
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
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          onChange={handleChange}
                          value={values.password}
                          startAdornment={
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          id="password-helper-text"
                          error={touched.password && Boolean(errors.password)}
                        >
                          {touched.password ? errors.password : ""}
                        </FormHelperText>
                      </FormControl>
                    </CardContent>
                    <CardActions>
                      <Button
                        color="danger"
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                      >
                        Login
                      </Button>
                    </CardActions>
                  </form>
                )}
              </Formik>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}

export default withFirebase(LoginPage)
