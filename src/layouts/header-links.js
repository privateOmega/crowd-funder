import React from "react"
import { List, ListItem, makeStyles } from "@material-ui/core"
import { navigate } from "gatsby"

import Button from "../components/button"
import { withFirebase } from "../services/firebase"
import { getUser, isLoggedIn, logout } from "../services/auth"

import headerLinkStyles from "../styles/header-link"

const useStyles = makeStyles(headerLinkStyles)

function HeaderLinks({ firebase }) {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      {!isLoggedIn() ? (
        <ListItem className={classes.listItem}>
          <Button href="/login" color="transparent" className={classes.navLink}>
            Login
          </Button>
        </ListItem>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Button
              href="/app/dashboard"
              color="transparent"
              className={classes.navLink}
            >
              Hi {getUser().email}
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              color="transparent"
              className={classes.navLink}
              onClick={event => {
                event.preventDefault()
                logout(firebase).then(() => navigate(`/app/login`))
              }}
            >
              Logout
            </Button>
          </ListItem>
        </>
      )}
    </List>
  )
}

export default withFirebase(HeaderLinks)
