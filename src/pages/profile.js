import React from "react"

import SEO from "../components/seo"

function ProfilePage() {
  return (
    <>
      <SEO title="Home" />
      <h1>Your profile</h1>
      <ul>
        <li>Name: Your name will appear here</li>
        <li>E-mail: And here goes the mail</li>
      </ul>
    </>
  )
}

export default ProfilePage
