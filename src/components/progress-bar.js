import React from "react"
import PropTypes from "prop-types"
import { makeStyles, LinearProgress } from "@material-ui/core"

import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"

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
      <GridContainer justify="center">
        <GridItem xs={4} sm={4} md={4}>
          $7461 Raised
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          12 Donors
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          $10000 Goal
        </GridItem>
      </GridContainer>
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
