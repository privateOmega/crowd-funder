export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("crowd-funder-user")
    ? JSON.parse(window.localStorage.getItem("crowd-funder-user"))
    : {}

export const setUser = user =>
  window.localStorage.setItem("crowd-funder-user", JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const logout = firebase => {
  return new Promise(resolve => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({})
        resolve()
      })
  })
}
