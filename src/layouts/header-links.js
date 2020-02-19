import React from "react"
import { List, ListItem, makeStyles } from "@material-ui/core"

import Button from "../components/button"

import headerLinkStyle from "../styles/header-link"

const useStyles = makeStyles(headerLinkStyle)

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
