import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { useFirebase } from "gatsby-plugin-firebase"

import Header from "./header"
import HeaderLinks from "./header-links"
import Footer from "./footer"
import { FirebaseContext } from "../services/firebase"

function Layout({ children }) {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const [firebase, setFirebase] = useState()

  useFirebase(firebase => {
    setFirebase(firebase)
  }, [])

  return (
    <FirebaseContext.Provider value={firebase}>
      <Header
        siteTitle={site.siteMetadata.title}
        rightLinks={<HeaderLinks />}
      />
      {children}
      <Footer />
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
