import React from "react"
import PropTypes from "prop-types"
import { makeStyles, Grid } from "@material-ui/core"

const gridContainerStyles = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
}

const useStyles = makeStyles(gridContainerStyles)

export default function GridContainer({ children, className, ...rest }) {
  const classes = useStyles()

  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  )
}

GridContainer.defaultProps = {
  className: "",
}

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
