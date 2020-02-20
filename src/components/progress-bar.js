import React from "react"
import PropTypes from "prop-types"

import { makeStyles, LinearProgress, Grid } from "@material-ui/core"

import progressBarStyles from "../styles/progress-bar"

const useStyles = makeStyles(progressBarStyles)

function ProgressBar({ color, ...rest }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <LinearProgress
        {...rest}
        classes={{
          root: classes.root + " " + classes[color + "Background"],
          bar: classes.bar + " " + classes[color],
        }}
      />
      <Grid container>
        <Grid item xs>
          $7461 Raised
        </Grid>
        <Grid item xs>
          12 Donors
        </Grid>
        <Grid item xs>
          $10000 Goal
        </Grid>
      </Grid>
    </div>
  )
}

ProgressBar.defaultProps = {
  color: "danger",
}

ProgressBar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "gray",
  ]),
}

export default ProgressBar
