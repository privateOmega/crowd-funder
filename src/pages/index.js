import React from "react"
import { makeStyles } from "@material-ui/core"
import classNames from "classnames"

import SEO from "../components/seo"
import Parallax from "../components/parallax"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"
import ProgressBar from "../components/progress-bar"

import indexPagestyles from "../styles/index-page"

const useStyles = makeStyles(indexPagestyles)

function IndexPage() {
  const classes = useStyles()

  return (
    <>
      <SEO title="Home" />
      <Parallax filter image={require("../images/image.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>SmartWatch.</h1>
              <h4>
                A smartwatch is a wearable computer in the form of a wristwatch,
                modern smartwatches provide a local touchscreen interface for
                daily use, while an associated smartphone app provides for
                management and telemetry.
              </h4>
              <br />
              <Button href="/login" color="danger">
                Donate
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.sectionTitle}>Let's talk product</h2>
                <h5 className={classes.description}>
                  This is the paragraph where you can write more details about
                  your product. Keep you user engaged by providing meaningful
                  information. Remember that by this time, the user is curious,
                  otherwise he wouldn't scroll to get here. Add a button if you
                  want the user to see more.
                </h5>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={8} sm={8} md={8}>
                <ProgressBar variant="determinate" value={74.61} />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
