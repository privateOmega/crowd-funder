import React from "react"
import { Router } from "@reach/router"

import PrivateRoute from "../components/private-route"
import LoginPage from "../pages/login"
import DashboardPage from "../pages/dashboard"

function App() {
  return (
    <Router>
      <LoginPage path="/app/login" />
      <PrivateRoute path="/app/dashboard" component={DashboardPage} />
    </Router>
  )
}

export default App
