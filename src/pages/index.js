import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core"
import classNames from "classnames"
import { Favorite, Hotel, Announcement } from "@material-ui/icons"
import Modal from "react-modal"

import SEO from "../components/seo"
import Parallax from "../components/parallax"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"
import ProgressBar from "../components/progress-bar"
import InfoArea from "../components/info-area"
import { withFirebase } from "../services/firebase"
import * as config from "../config"
import CheckoutForm from "../components/checkout-form"

import indexPagestyles from "../styles/index-page"
import modalStyles from "../styles/modal"

const useStyles = makeStyles(indexPagestyles)

function IndexPage({ firebase }) {
  const classes = useStyles()

  const [donationAmount, setDonationAmount] = useState(0)
  const [numberOfDonors, setNumberOfDonors] = useState(0)
  const [modalVisibility, setModalVisibility] = useState(false)

  const updateDonationAmount = snapshot => {
    let snapshotValue = snapshot.val()
    if (!snapshotValue) {
      snapshotValue = []
    }
    const donationAmount = snapshotValue.reduce(
      (result, value) => result + value.amount,
      0
    )

    setDonationAmount(donationAmount)
    setNumberOfDonors(snapshotValue.length)
  }

  const addEventHandler = async donationsRefPromise => {
    const donationsRef = await donationsRefPromise

    donationsRef.on("value", updateDonationAmount)
  }

  const removeEventHandler = async donationsRefPromise => {
    const donationsRef = await donationsRefPromise
    donationsRef.off("value", updateDonationAmount)
  }

  useEffect(() => {
    if (firebase) {
      const donationsRefPromise = firebase.database().ref("donations")

      addEventHandler(donationsRefPromise)
      return () => {
        removeEventHandler(donationsRefPromise)
      }
    }
  })

  return (
    <>
      <SEO title="Home" />
      <Parallax filter image={require("../images/parallax-background.jpg")}>
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
              <Button color="danger" onClick={() => setModalVisibility(true)}>
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
                    icon={Favorite}
                    iconColor="danger"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Sleep monitor"
                    description="Monitors your sleep accurately, so that you can download your data onto a smartphone to analyze sleeping patterns."
                    icon={Hotel}
                    iconColor="success"
                    vertical
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Integration"
                    description="Keeps you always notified with latest updates on Social media, totally avoiding to take phones out from pockets or purses."
                    icon={Announcement}
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
                <ProgressBar
                  variant="determinate"
                  value={Math.min(
                    (donationAmount / config.goalAmount) * 100,
                    100
                  )}
                  totalDonation={donationAmount}
                  numberOfDonors={numberOfDonors}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalVisibility}
        onRequestClose={() => setModalVisibility(false)}
        style={modalStyles}
        ariaHideApp={false}
      >
        <CheckoutForm />
      </Modal>
    </>
  )
}

export default withFirebase(IndexPage)
