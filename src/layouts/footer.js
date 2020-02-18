import React from "react"
import { Link } from "gatsby-theme-material-ui"
import { Typography } from "@material-ui/core"
import { Favorite } from "@material-ui/icons"

function Footer(props) {
  return (
    <footer>
      <div>
        <Typography variant="body2" color="textPrimary" align="center">
          &copy; {new Date().getFullYear()}, made with <Favorite /> by{" "}
          <Link color="inherit" href="https://www.github.com/privateOmega">privateOmega</Link>
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
