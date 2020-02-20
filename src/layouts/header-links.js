import React from "react"
import { List, ListItem, makeStyles } from "@material-ui/core"

import Button from "../components/button"

import headerLinkStyles from "../styles/header-link"

const useStyles = makeStyles(headerLinkStyles)

function HeaderLinks(props) {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button href="/login" color="transparent" className={classes.navLink}>
          Login
        </Button>
      </ListItem>
    </List>
  )
}

export default HeaderLinks
