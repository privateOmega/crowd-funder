import React from "react"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core"
import { Favorite } from "@material-ui/icons"

import footerStyles from "../styles/footer"

const useStyles = makeStyles(footerStyles)

function Footer(props) {
  const classes = useStyles()

  return (
    <footer className={classNames({ [classes.footer]: true })}>
      <div className={classes.container}>
        &copy; {new Date().getFullYear()}, made with{" "}
        <Favorite className={classes.icon} /> by{" "}
        <a
          href="https://www.github.com/privateOmega"
          className={classNames({
            [classes.a]: true,
          })}
        >
          privateOmega
        </a>
      </div>
    </footer>
  )
}

export default Footer
