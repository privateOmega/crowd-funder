import React from "react"
import { makeStyles } from "@material-ui/core"
import classNames from "classnames"

import SEO from "../components/seo"
import Parallax from "../components/parallax"
import GridContainer from "../components/grid-container"
import GridItem from "../components/grid-item"
import Button from "../components/button"

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
              <h1 className={classes.title}>E-bike.</h1>
              <h4>
                An electric bicycle also known as an e-bike is a bicycle with an
                integrated electric motor which can be used for propulsion.
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
        <div className={classes.container}>Main content</div>
      </div>
    </>
  )
}

export default IndexPage
