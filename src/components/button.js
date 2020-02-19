import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Button, makeStyles } from "@material-ui/core"

import buttonStyle from "../styles/button.js"

const makeComponentStyles = makeStyles(() => ({
  ...buttonStyle,
}))

const RegularButton = React.forwardRef(
  (
    {
      color,
      round,
      children,
      fullWidth,
      disabled,
      simple,
      size,
      block,
      link,
      justIcon,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = makeComponentStyles()

    const btnClasses = classNames({
      [classes.button]: true,
      [classes[size]]: size,
      [classes[color]]: color,
      [classes.round]: round,
      [classes.fullWidth]: fullWidth,
      [classes.disabled]: disabled,
      [classes.simple]: simple,
      [classes.block]: block,
      [classes.link]: link,
      [classes.justIcon]: justIcon,
      [className]: className,
    })
    return (
      <Button {...rest} ref={ref} className={btnClasses}>
        {children}
      </Button>
    )
  }
)

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "white",
    "transparent",
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default RegularButton
