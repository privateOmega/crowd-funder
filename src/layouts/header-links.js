import React from "react"
import { List, ListItem,  } from "@material-ui/core"
import { Button } from "gatsby-theme-material-ui"

function HeaderLinks(props) {
  return (
    <List>
      <ListItem>
        <Button
          href="/login"
          color="inherit"
        >
          Login
        </Button>
      </ListItem>
    </List>
  )
}

export default HeaderLinks
