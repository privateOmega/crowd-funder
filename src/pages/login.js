import React from "react"
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
} from "@material-ui/core"
import { Person, Lock, Visibility, VisibilityOff } from "@material-ui/icons"

import SEO from "../components/seo"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"

import loginPageStyles from "../styles/login-page"

const useStyles = makeStyles(loginPageStyles)

function LoginPage() {
  const classes = useStyles()

  return (
    <>
      <SEO title="Login page" />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader>
                  <h4>Login</h4>
                </CardHeader>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                      id="username"
                      startAdornment={
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type={"password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          {/* <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton> */}
                          <VisibilityOff />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Button href="/login" color="danger" fullWidth>
                    Donate
                  </Button>
                </CardActions>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </>
  )
}

export default LoginPage
