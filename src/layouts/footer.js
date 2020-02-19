import React from "react"
import { Typography } from "@material-ui/core"
import { Favorite } from "@material-ui/icons"

function Footer(props) {
  return (
    <footer>
      <div>
        <Typography variant="body2" color="textPrimary" align="center">
          &copy; {new Date().getFullYear()}, made with <Favorite /> by{" "}
          <a color="inherit" href="https://www.github.com/privateOmega">
            privateOmega
          </a>
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
