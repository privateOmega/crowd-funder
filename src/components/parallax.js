import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core"

import parallaxStyles from "../styles/parallax"

const useStyles = makeStyles(parallaxStyles)

function Parallax({ filter, className, children, style, image, small }) {
  const classes = useStyles()

  let windowScrollTop
  if (typeof window !== "undefined" && window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3
  } else {
    windowScrollTop = 0
  }

  const [transform, setTransform] = useState(
    `translate3d(0, ${windowScrollTop}px, 0)`
  )

  useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform)
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform)
      }
    }
  })

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3
    setTransform(`translate3d(0, ${windowScrollTop}px, 0)`)
  }

  return (
    <div
      className={classNames({
        [classes.parallax]: true,
        [classes.filter]: filter,
        [classes.small]: small,
        [className]: className !== undefined,
      })}
      style={{
        ...style,
        backgroundImage: `url(${image})`,
        transform: transform,
      }}
    >
      {children}
    </div>
  )
}

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
}

export default Parallax
