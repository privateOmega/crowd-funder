import React from "react"
import PropTypes from "prop-types"
import { makeStyles, Grid } from "@material-ui/core"

const styles = {
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
}

const useStyles = makeStyles(styles)

export default function GridItem({ children, className, ...rest }) {
  const classes = useStyles()

  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  )
}

GridItem.defaultProps = {
  className: "",
}

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
