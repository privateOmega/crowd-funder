import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core"
import classNames from "classnames"

import Image from "../components/image"
import SEO from "../components/seo"

import indexPagestyles from "../styles/index-page"

const useStyles = makeStyles(indexPagestyles)

function IndexPage() {
  const classes = useStyles()
  return (
    <>
      <SEO title="Home" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
          <Link to="/page-2/">Go to page 2</Link>
        </div>
      </div>
    </>
  )
}

export default IndexPage
