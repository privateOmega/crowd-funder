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

import SEO from "../components/seo"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"
import loginValidationScheme from "../components/login-validation-scheme"

import loginPageStyles from "../styles/login-page"

const useStyles = makeStyles(loginPageStyles)

function LoginPage() {
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)

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
                initialValues={{ username: "", password: "" }}
                validationSchema={loginValidationScheme}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    setSubmitting(false)
                  }, 400)
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
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                          id="username"
                          onChange={handleChange}
                          value={values.username}
                          startAdornment={
                            <InputAdornment position="start">
                              <Person />
                            </InputAdornment>
                          }
                        />
                        <FormHelperText
                          id="username-helper-text"
                          error={touched.username && Boolean(errors.username)}
                        >
                          {touched.username ? errors.username : ""}
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
                        href="/dashboard"
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

export default LoginPage
