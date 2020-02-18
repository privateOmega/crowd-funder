import React from "react"
import { Favorite } from "@material-ui/icons"

function Footer(props) {
  return (
    <footer>
      <div>
        &copy; {new Date().getFullYear()}, made with <Favorite /> by{" "}
        <a href="https://www.github.com/privateOmega">
          privateOmega
        </a>
      </div>
    </footer>
  )
}

export default Footer
