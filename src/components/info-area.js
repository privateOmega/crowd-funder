import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core"

import infoAreaStyles from "../styles/info-area"

const useStyles = makeStyles(infoAreaStyles)

function InfoArea({ title, description, Icon, iconColor, vertical }) {
  const classes = useStyles()

  return (
    <div className={classes.infoArea}>
      <div
        className={classNames({
          [classes.iconWrapper]: true,
          [classes[iconColor]]: true,
          [classes.iconWrapperVertical]: vertical,
        })}
      >
        <Icon
          className={classNames({
            [classes.icon]: true,
            [classes.iconVertical]: vertical,
          })}
        />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  )
}

InfoArea.defaultProps = {
  iconColor: "gray",
}

InfoArea.propTypes = {
  Icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "gray",
  ]),
  vertical: PropTypes.bool,
}

export default InfoArea
