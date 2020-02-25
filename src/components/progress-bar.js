import React from "react"
import PropTypes from "prop-types"
import { makeStyles, LinearProgress } from "@material-ui/core"

import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import * as config from "../config"

import progressBarStyles from "../styles/progress-bar"

const useStyles = makeStyles(progressBarStyles)

function ProgressBar({ color, totalDonation, numberOfDonors, ...rest }) {
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
          {`${config.currencySymbol}${totalDonation} Raised`}
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          {`${numberOfDonors} Donors`}
        </GridItem>
        <GridItem xs={4} sm={4} md={4}>
          {`${config.currencySymbol}${config.goalAmount} Goal`}
        </GridItem>
      </GridContainer>
    </div>
  )
}

ProgressBar.defaultProps = {
  color: "danger",
  totalDonation: 0,
  numberOfDonors: 0,
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
  totalDonation: PropTypes.number,
  numberOfDonors: PropTypes.number,
}

export default ProgressBar
