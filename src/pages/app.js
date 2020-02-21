import React from "react"
import { Router } from "@reach/router"

import PrivateRoute from "../components/private-route"
import ProfilePage from "../pages/profile"
import LoginPage from "../pages/login"

function App() {
  return (
    <Router>
      <PrivateRoute path="/app/profile" component={ProfilePage} />
      <LoginPage path="/app/login" />
    </Router>
  )
}

export default App
