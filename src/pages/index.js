import React from "react"
import { makeStyles } from "@material-ui/core"
import classNames from "classnames"
import { Favorite, Hotel, Announcement } from "@material-ui/icons"

import SEO from "../components/seo"
import Parallax from "../components/parallax"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"
import ProgressBar from "../components/progress-bar"
import InfoArea from "../components/info-area"

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
                <h2 className={classes.sectionTitle}>Why get a smart-watch?</h2>
                <h5 className={classes.description}>
                  Smart-watches have become an extension of the human body
                  itself. Once you strap a smart-watch to your wrist, you become
                  a more capable, connected human being.
                </h5>
              </GridItem>
            </GridContainer>
            <div>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Heartrate Sensor"
                    description="Accurate heart rate sensor would alert you in case of rising heart rate and helps you monitor exercise impact."
                    Icon={Favorite}
                    iconColor="danger"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Sleep monitor"
                    description="Monitors your sleep accurately, so that you can download your data onto a smartphone to analyze sleeping patterns."
                    Icon={Hotel}
                    iconColor="success"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Integration"
                    description="Keeps you always notified with latest updates on Social media, totally avoiding to take phones out from pockets or purses."
                    Icon={Announcement}
                    iconColor="info"
                    vertical
                  />
                </GridItem>
              </GridContainer>
            </div>
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
