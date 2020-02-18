import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AppBar, Toolbar, Drawer, Hidden, IconButton } from "@material-ui/core"
import { Menu } from "@material-ui/icons"

function Header({ siteTitle, rightLinks }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AppBar>
      <Toolbar>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
        <Hidden smDown implementation="css">
          {rightLinks}
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerToggle}>
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
