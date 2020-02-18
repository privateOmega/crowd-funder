import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Toolbar,
  Drawer,
  Hidden,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import classNames from "classnames"

import headerStyles from "../styles/header"

const useStyles = makeStyles(headerStyles)

function Header({ siteTitle, rightLinks }) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar
      className={classNames({
        [classes.appBar]: true,
        [classes["dark"]]: true,
        [classes.fixed]: true,
      })}
    >
      <Toolbar className={classes.container}>
        <Button className={classes.title}>{siteTitle}</Button>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {rightLinks}
        </Drawer>
      </Hidden>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  rightLinks: PropTypes.node,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
